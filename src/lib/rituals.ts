export const TASKS_KEY = "daily-tasks.items.v1"
export const COMPLETIONS_KEY = "daily-tasks.completions.v1"

export const ICON_NAMES = [
  "medication",
  "walking",
  "mala",
  "podcast",
  "spark",
  "water",
  "move",
  "read",
  "heart",
  "calm",
  "food",
  "sun",
] as const

export type IconName = (typeof ICON_NAMES)[number]

export const ICON_LABELS: Record<IconName, string> = {
  medication: "Medication",
  walking: "Exercise / Walking",
  mala: "Mala Jaap",
  podcast: "Podcast listen",
  spark: "Spark",
  water: "Water",
  move: "Move",
  read: "Read",
  heart: "Heart",
  calm: "Calm",
  food: "Food",
  sun: "Sun",
}

export const RITUAL_COLORS = [
  "#c9f58b",
  "#ffd85c",
  "#be9bff",
  "#91dff3",
  "#ff9bc9",
  "#ff9a62",
] as const

export type Ritual = {
  id: string
  name: string
  icon: IconName
  color: string
}

export function todayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

export function formatShortDate(date = new Date()) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "short",
    day: "numeric",
  }).format(date)
}

export function isIconName(value: string): value is IconName {
  return ICON_NAMES.includes(value as IconName)
}

export function iconForName(name: string): IconName {
  const value = name.toLowerCase()
  if (/medicine|medication|tablet|pill|vitamin/.test(value)) return "medication"
  if (/walk|exercise/.test(value)) return "walking"
  if (/mala|jaap|japa|mantra/.test(value)) return "mala"
  if (/podcast|listen/.test(value)) return "podcast"
  if (/water|drink|hydrate/.test(value)) return "water"
  if (/gym|yoga|workout|run/.test(value)) return "move"
  if (/read|book|study|learn/.test(value)) return "read"
  if (/health|care/.test(value)) return "heart"
  if (/meditate|pray|reflect|journal|breathe/.test(value)) return "calm"
  if (/eat|food|meal|breakfast|fruit/.test(value)) return "food"
  if (/sun|morning|wake/.test(value)) return "sun"
  return "spark"
}

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? ((JSON.parse(raw) as T) ?? fallback) : fallback
  } catch {
    return fallback
  }
}

export function createRitualId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
}

export function cleanRitualName(name: string) {
  return String(name || "").trim().replace(/\s+/g, " ")
}
