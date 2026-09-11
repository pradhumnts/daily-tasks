"use client"

import { useState } from "react"
import { toast } from "sonner"

import { Celebration, type BurstOrigin } from "@/components/celebration"
import { PwaRegister } from "@/components/pwa-register"
import { RitualDialog } from "@/components/ritual-dialog"
import { TasksPanel } from "@/components/tasks-panel"
import { TopBar } from "@/components/top-bar"
import { useDailyTasks } from "@/hooks/use-daily-tasks"
import { RITUAL_COLORS, type Ritual } from "@/lib/rituals"

export function DailyApp() {
  const {
    rituals,
    completedIds,
    addRitual,
    updateRitual,
    deleteRitual,
    toggleRitual,
  } = useDailyTasks()
  const [editor, setEditor] = useState<Ritual | null | "add">(null)
  const [burst, setBurst] = useState<BurstOrigin | null>(null)

  const isOpen = editor !== null
  const editingRitual = editor && editor !== "add" ? editor : null
  const nextColor = RITUAL_COLORS[rituals.length % RITUAL_COLORS.length]

  function celebrate(origin: HTMLElement) {
    const rect = origin.getBoundingClientRect()
    setBurst({
      id: Date.now(),
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      pieces: RITUAL_COLORS.concat(RITUAL_COLORS, RITUAL_COLORS).slice(0, 15).map((color) => ({
        color,
        x: (Math.random() - 0.5) * 230,
        y: -60 - Math.random() * 170,
        rotate: (Math.random() - 0.5) * 540,
      })),
    })
    window.setTimeout(() => setBurst(null), 950)
  }

  return (
    <div className="relative min-h-dvh">
      <div className="grain pointer-events-none fixed inset-0 -z-10 opacity-[0.17]" aria-hidden="true" />
      <main className="mx-auto w-full max-w-[700px] px-6 pt-[max(20px,env(safe-area-inset-top))] pb-[max(34px,env(safe-area-inset-bottom))] max-sm:px-4 max-[480px]:px-3">
        <TopBar />
        <TasksPanel
          rituals={rituals}
          completedIds={completedIds}
          onAdd={() => {
            toast.dismiss()
            setEditor("add")
          }}
          onEdit={(ritual) => {
            toast.dismiss()
            setEditor(ritual)
          }}
          onToggle={(id, origin) => {
            const completed = toggleRitual(id)
            if (completed) celebrate(origin)
          }}
        />
      </main>
      <RitualDialog
        key={editor === null ? "closed" : editor === "add" ? "add" : editor.id}
        open={isOpen}
        ritual={editingRitual}
        nextColor={nextColor}
        onOpenChange={(open) => {
          if (!open) setEditor(null)
        }}
        onSave={(values) => {
          try {
            if (editingRitual) {
              updateRitual(editingRitual.id, values)
              toast("Changes saved")
            } else {
              addRitual(values.name, values)
              toast("Added to your rhythm ✦")
            }
            setEditor(null)
          } catch (error) {
            toast(error instanceof Error ? error.message : "Something went wrong")
          }
        }}
        onDelete={() => {
          if (!editingRitual) return
          deleteRitual(editingRitual.id)
          toast("Ritual removed")
          setEditor(null)
        }}
      />
      <Celebration burst={burst} />
      <PwaRegister />
    </div>
  )
}
