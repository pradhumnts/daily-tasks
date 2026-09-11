"use client"

import { useRef, type PointerEvent } from "react"
import { motion } from "motion/react"

import { RitualIcon } from "@/components/ritual-icons"
import { cn } from "@/lib/utils"
import { type Ritual } from "@/lib/rituals"

type TaskCardProps = {
  ritual: Ritual
  completed: boolean
  onToggle: (origin: HTMLElement) => void
  onEdit: () => void
}

export function TaskCard({ ritual, completed, onToggle, onEdit }: TaskCardProps) {
  const rowRef = useRef<HTMLLIElement>(null)
  const holdTimer = useRef<number | null>(null)
  const start = useRef({ x: 0, y: 0 })
  const held = useRef(false)

  function cancelHold() {
    if (holdTimer.current) window.clearTimeout(holdTimer.current)
    holdTimer.current = null
    rowRef.current?.classList.remove("holding")
  }

  function startHold(event: PointerEvent<HTMLLIElement>) {
    if (event.button !== 0) return
    held.current = false
    start.current = { x: event.clientX, y: event.clientY }
    rowRef.current?.classList.add("holding")
    holdTimer.current = window.setTimeout(() => {
      held.current = true
      cancelHold()
      onEdit()
    }, 1200)
  }

  return (
    <motion.li
      ref={rowRef}
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: completed ? 0.58 : 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{
        layout: { type: "spring", stiffness: 420, damping: 34, mass: 0.85 },
        opacity: { duration: 0.28 },
        y: { duration: 0.32, ease: [0.2, 0.8, 0.2, 1] },
      }}
      className={cn(
        "task-item relative min-h-[86px] rounded-[24px] border-2 border-ink outline-none max-sm:min-h-[78px] max-sm:rounded-[21px]",
        "shadow-[0_4px_0_rgba(255,255,255,0.13)] transition-[filter] duration-200 hover:brightness-[1.025]",
        completed && "completed"
      )}
      style={{ background: ritual.color }}
      tabIndex={0}
      onPointerDown={startHold}
      onPointerMove={(event) => {
        if (Math.hypot(event.clientX - start.current.x, event.clientY - start.current.y) > 10) {
          cancelHold()
        }
      }}
      onPointerUp={cancelHold}
      onPointerCancel={cancelHold}
      onPointerLeave={cancelHold}
      onClickCapture={(event) => {
        if (!held.current) return
        event.preventDefault()
        event.stopPropagation()
        held.current = false
      }}
      onContextMenu={(event) => {
        event.preventDefault()
        cancelHold()
        held.current = true
        onEdit()
      }}
      onKeyDown={(event) => {
        if (event.key === "F2" || (event.shiftKey && event.key === "Enter")) {
          event.preventDefault()
          cancelHold()
          onEdit()
        }
      }}
    >
      <label className="grid min-h-[82px] cursor-pointer touch-pan-y grid-cols-[52px_minmax(0,1fr)_42px] items-center gap-[13px] px-4 py-[13px] select-none max-sm:grid-cols-[47px_minmax(0,1fr)_38px] max-sm:gap-[11px] max-sm:px-3 max-sm:py-[11px]">
        <input
          type="checkbox"
          className="sr-only"
          checked={completed}
          aria-label={`Mark ${ritual.name} as ${completed ? "not done" : "done"}. Hold to edit, or press F2.`}
          onChange={(event) => {
            if (held.current) {
              event.preventDefault()
              held.current = false
              return
            }
            onToggle(rowRef.current ?? event.currentTarget)
          }}
          onClick={(event) => {
            if (held.current) {
              event.preventDefault()
              event.stopPropagation()
            }
          }}
        />
        <span className="grid size-[50px] -rotate-3 place-items-center rounded-[17px] border-2 border-ink bg-white/72 max-sm:size-[46px] max-sm:rounded-[15px]">
          <RitualIcon name={ritual.icon} className="size-[25px]" />
        </span>
        <span className="grid min-w-0 gap-1">
          <span
            className={cn(
              "text-[1.03rem] leading-[1.25] font-extrabold tracking-[-0.018em] wrap-anywhere",
              completed && "line-through decoration-2"
            )}
          >
            {ritual.name}
          </span>
          <span className="font-mono text-[0.69rem] font-bold tracking-[0.04em] text-ink/55 uppercase">
            {completed ? "Nice one" : "Still to do"}
          </span>
        </span>
        <motion.span
          aria-hidden="true"
          animate={
            completed
              ? { backgroundColor: "#171719", color: "#fffefe", rotate: -8, scale: 1.08 }
              : { backgroundColor: "rgba(255,255,255,0.45)", color: "transparent", rotate: 0, scale: 1 }
          }
          transition={{ type: "spring", stiffness: 420, damping: 22 }}
          className="grid size-[38px] place-items-center rounded-full border-2 border-ink"
        >
          <svg viewBox="0 0 20 20" fill="none" className="size-[21px]">
            <path
              d="m5 10 3.1 3L15 6.7"
              stroke="currentColor"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </label>
    </motion.li>
  )
}
