"use client"

import { Plus } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import { TaskCard } from "@/components/task-card"
import { Button } from "@/components/ui/button"
import { type Ritual } from "@/lib/rituals"

type TasksPanelProps = {
  rituals: Ritual[]
  completedIds: Set<string>
  onAdd: () => void
  onEdit: (ritual: Ritual) => void
  onToggle: (id: string, origin: HTMLElement) => void
}

export function TasksPanel({
  rituals,
  completedIds,
  onAdd,
  onEdit,
  onToggle,
}: TasksPanelProps) {
  const countLabel = `${rituals.length} ${rituals.length === 1 ? "ritual" : "rituals"}`

  return (
    <motion.section
      initial={{ y: 10, scale: 0.99 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
      aria-labelledby="taskHeading"
      className="rounded-[34px] border-[3px] border-ink bg-ink p-[30px] shadow-[0_16px_0_rgba(23,23,25,0.10)] max-sm:rounded-[27px] max-sm:border-[2.5px] max-sm:px-3.5 max-sm:pt-[23px] max-sm:pb-[17px]"
    >
      <div className="flex items-center justify-between gap-[18px] text-white">
        <div>
          <p className="m-0 font-mono text-[0.76rem] font-bold tracking-[0.09em] text-white/50 uppercase">
            Your rhythm
          </p>
          <h1 id="taskHeading" className="mt-[5px] mb-0 text-[2.35rem] leading-[1.15] font-medium tracking-[-0.065em] max-sm:text-[2rem]">
            Every day
          </h1>
        </div>
        <Button
          type="button"
          size="icon"
          aria-label="Add a daily task"
          onClick={onAdd}
          className="size-[60px] shrink-0 rounded-full border-0 bg-yellow text-ink shadow-[0_0_0_3px_#171719,0_0_0_5px_#ffd85c] transition-transform duration-200 hover:rotate-8 hover:scale-105 hover:bg-yellow hover:text-ink active:scale-[0.94] max-sm:size-[52px]"
        >
          <Plus className="size-[27px] stroke-[2.3]" />
        </Button>
      </div>
      <p className="mt-[18px] mb-0 ml-0.5 text-[0.875rem] text-[#b5b4b9]">Hold a task to edit it.</p>
      <div className="mt-4 mb-[17px] ml-0.5 flex items-center justify-between text-[0.8rem] font-semibold tracking-[0.02em] text-white/52">
        <span className="text-white">{countLabel}</span>
        <span>resets tomorrow</span>
      </div>
      <ul className="m-0 grid list-none gap-[11px] p-0" aria-label="Daily tasks">
        <AnimatePresence initial={false}>
          {rituals.map((ritual, index) => (
            <TaskCard
              key={ritual.id}
              ritual={ritual}
              index={index}
              completed={completedIds.has(ritual.id)}
              onEdit={() => onEdit(ritual)}
              onToggle={(origin) => onToggle(ritual.id, origin)}
            />
          ))}
        </AnimatePresence>
      </ul>
      {rituals.length === 0 ? <EmptyState onAdd={onAdd} /> : null}
    </motion.section>
  )
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="grid min-h-[380px] w-full cursor-pointer place-items-center content-center gap-3.5 rounded-[28px] border-2 border-dashed border-white/24 bg-transparent text-center text-white max-sm:min-h-[310px]"
    >
      <span className="relative grid size-[110px] place-items-center rounded-full border border-white/28" aria-hidden="true">
        <i className="absolute top-[-5px] left-6 size-4 rounded-full bg-yellow" />
        <i className="absolute right-[-5px] bottom-[27px] size-4 rounded-full bg-purple" />
        <i className="absolute bottom-[-3px] left-[17px] size-4 rounded-full bg-blue" />
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-[38px]"
          initial={{ scale: 0.9 }}
          animate={{ scale: [0.9, 1.05, 0.9] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="m7 12 3 3 7-7"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </span>
      <strong className="mt-1 text-[1.2rem] font-bold">Start your rhythm</strong>
      <span className="max-w-[280px] text-[0.9rem] leading-[1.5] text-white/53">
        Add the little things you want to show up for every day.
      </span>
    </button>
  )
}
