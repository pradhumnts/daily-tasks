"use client"

import { AnimatePresence, motion } from "motion/react"

export type BurstPiece = {
  x: number
  y: number
  rotate: number
  color: string
}

export type BurstOrigin = {
  id: number
  x: number
  y: number
  pieces: BurstPiece[]
}

export function Celebration({ burst }: { burst: BurstOrigin | null }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {burst?.pieces.map((piece, index) => (
          <motion.i
            key={`${burst.id}-${index}`}
            className="absolute block h-5 w-2.5 rounded-[4px] border-2 border-ink"
            style={{
              left: burst.x,
              top: burst.y,
              background: piece.color,
            }}
            initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            animate={{ opacity: 0, x: piece.x, y: piece.y, rotate: piece.rotate }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
