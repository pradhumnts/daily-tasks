"use client"

import { useCallback, useMemo, useSyncExternalStore } from "react"

import {
  COMPLETIONS_KEY,
  RITUAL_COLORS,
  TASKS_KEY,
  type IconName,
  type Ritual,
  cleanRitualName,
  createRitualId,
  iconForName,
  isIconName,
  todayKey,
} from "@/lib/rituals"

type CompletionStore = Record<string, string[]>

function emitChange() {
  window.dispatchEvent(new Event("daily-tasks-changed"))
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("daily-tasks-changed", onStoreChange)
  window.addEventListener("storage", onStoreChange)
  return () => {
    window.removeEventListener("daily-tasks-changed", onStoreChange)
    window.removeEventListener("storage", onStoreChange)
  }
}

function subscribeDay(onStoreChange: () => void) {
  const timer = window.setInterval(onStoreChange, 60_000)
  return () => window.clearInterval(timer)
}

function getTasksSnapshot() {
  return window.localStorage.getItem(TASKS_KEY) ?? "[]"
}

function getCompletionsSnapshot() {
  return window.localStorage.getItem(COMPLETIONS_KEY) ?? "{}"
}

function normalizeRituals(items: Ritual[]): Ritual[] {
  return items.map((item, index) => ({
    ...item,
    icon: isIconName(item.icon) ? item.icon : iconForName(item.name),
    color: item.color || RITUAL_COLORS[index % RITUAL_COLORS.length],
  }))
}

export function useDailyTasks() {
  const tasksJson = useSyncExternalStore(subscribe, getTasksSnapshot, () => "[]")
  const completionsJson = useSyncExternalStore(
    subscribe,
    getCompletionsSnapshot,
    () => "{}"
  )
  const activeDay = useSyncExternalStore(subscribeDay, todayKey, todayKey)

  const rituals = useMemo(() => {
    try {
      return normalizeRituals(JSON.parse(tasksJson) as Ritual[])
    } catch {
      return []
    }
  }, [tasksJson])

  const completionStore = useMemo(() => {
    try {
      return JSON.parse(completionsJson) as CompletionStore
    } catch {
      return {}
    }
  }, [completionsJson])

  const persistRituals = useCallback((next: Ritual[]) => {
    window.localStorage.setItem(TASKS_KEY, JSON.stringify(next))
    emitChange()
  }, [])

  const persistCompletions = useCallback((next: CompletionStore) => {
    const trimmed = Object.fromEntries(
      Object.entries(next)
        .sort(([a], [b]) => b.localeCompare(a))
        .slice(0, 14)
    )
    window.localStorage.setItem(COMPLETIONS_KEY, JSON.stringify(trimmed))
    emitChange()
  }, [])

  const completedIds = useMemo(
    () => new Set(completionStore[activeDay] ?? []),
    [activeDay, completionStore]
  )

  const addRitual = useCallback(
    (name: string, options: { icon?: IconName; color?: string } = {}) => {
      const clean = cleanRitualName(name)
      if (!clean) throw new Error("Give your ritual a name.")
      if (clean.length > 90) throw new Error("Keep it under 90 characters.")

      const ritual: Ritual = {
        id: createRitualId(),
        name: clean,
        icon: options.icon || iconForName(clean),
        color: options.color || RITUAL_COLORS[rituals.length % RITUAL_COLORS.length],
      }
      persistRituals([...rituals, ritual])
      return ritual
    },
    [persistRituals, rituals]
  )

  const updateRitual = useCallback(
    (id: string, patch: Pick<Ritual, "name" | "icon" | "color">) => {
      const clean = cleanRitualName(patch.name)
      if (!clean || clean.length > 90) {
        throw new Error("Enter a task name of 1–90 characters.")
      }
      persistRituals(
        rituals.map((ritual) =>
          ritual.id === id ? { ...ritual, ...patch, name: clean } : ritual
        )
      )
    },
    [persistRituals, rituals]
  )

  const deleteRitual = useCallback(
    (id: string) => {
      persistRituals(rituals.filter((ritual) => ritual.id !== id))
      persistCompletions(
        Object.fromEntries(
          Object.entries(completionStore).map(([day, ids]) => [
            day,
            ids.filter((taskId) => taskId !== id),
          ])
        )
      )
    },
    [completionStore, persistCompletions, persistRituals, rituals]
  )

  const toggleRitual = useCallback(
    (id: string, force?: boolean) => {
      if (!rituals.some((ritual) => ritual.id === id)) {
        throw new Error("Task not found.")
      }
      const done = new Set(completionStore[activeDay] ?? [])
      const complete = typeof force === "boolean" ? force : !done.has(id)
      if (complete) done.add(id)
      else done.delete(id)
      persistCompletions({ ...completionStore, [activeDay]: [...done] })
      return complete
    },
    [activeDay, completionStore, persistCompletions, rituals]
  )

  return {
    rituals,
    completedIds,
    addRitual,
    updateRitual,
    deleteRitual,
    toggleRitual,
  }
}
