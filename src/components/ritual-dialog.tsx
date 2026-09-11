"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, X } from "lucide-react"

import { RitualIcon } from "@/components/ritual-icons"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  ICON_LABELS,
  ICON_NAMES,
  RITUAL_COLORS,
  type IconName,
  type Ritual,
} from "@/lib/rituals"

type RitualDialogProps = {
  open: boolean
  ritual: Ritual | null
  nextColor: string
  onOpenChange: (open: boolean) => void
  onSave: (values: { name: string; icon: IconName; color: string }) => void
  onDelete?: () => void
}

export function RitualDialog({
  open,
  ritual,
  nextColor,
  onOpenChange,
  onSave,
  onDelete,
}: RitualDialogProps) {
  const isEditing = Boolean(ritual)
  const [name, setName] = useState(ritual?.name ?? "")
  const [icon, setIcon] = useState<IconName>(ritual?.icon ?? "spark")
  const [color, setColor] = useState(ritual?.color ?? nextColor)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSave({ name, icon, color })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "top-1/2 left-1/2 w-[min(calc(100%-24px),520px)] max-h-[min(90vh,720px)] -translate-x-1/2 -translate-y-1/2 gap-0 overflow-y-auto rounded-[34px] border-[3px] border-ink bg-cream p-0 text-ink shadow-[12px_12px_0_#171719] ring-0 sm:max-w-[520px]",
          "duration-300 data-open:zoom-in-95 data-closed:zoom-out-95"
        )}
      >
        <form onSubmit={handleSubmit} className="px-6 pt-5 pb-6">
          <DialogHeader className="mb-[25px] flex-row items-start justify-between gap-5">
            <div className="space-y-0 text-left">
              <p className="m-0 font-mono text-[0.76rem] font-bold tracking-[0.09em] text-ink uppercase">
                {isEditing ? "Make it yours" : "A new daily thing"}
              </p>
              <DialogTitle className="mt-[5px] font-sans text-[2rem] leading-none font-bold tracking-[-0.065em]">
                {isEditing ? "Edit ritual" : "Add a ritual"}
              </DialogTitle>
              <DialogDescription className="sr-only">
                {isEditing
                  ? "Update this daily ritual’s name, icon, and colour."
                  : "Create a daily ritual with a name, icon, and colour."}
              </DialogDescription>
            </div>
            <DialogClose
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Close"
                  className="size-[43px] rounded-full border-2 border-ink bg-paper text-ink hover:bg-paper hover:text-ink"
                />
              }
            >
              <X className="size-5 stroke-[2]" />
            </DialogClose>
          </DialogHeader>

          <label htmlFor="taskInput" className="mb-2.5 block text-[0.9rem] font-bold">
            What do you want to do every day?
          </label>
          <Input
            id="taskInput"
            value={name}
            autoFocus
            autoComplete="off"
            maxLength={90}
            required
            placeholder="Drink more water"
            onChange={(event) => setName(event.target.value)}
            className="h-16 rounded-[18px] border-2 border-ink bg-paper px-[18px] text-[1.05rem] text-ink shadow-[4px_4px_0_#be9bff] placeholder:text-ink/35 focus-visible:border-ink focus-visible:bg-cream focus-visible:shadow-[6px_6px_0_#be9bff] focus-visible:ring-0 dark:bg-paper"
          />

          <fieldset className="mt-6 border-0 p-0">
            <legend className="mb-[11px] text-[0.82rem] font-bold">Pick a vibe</legend>
            <div className="grid grid-cols-7 gap-[9px]">
              {ICON_NAMES.map((key) => {
                const selected = key === icon
                return (
                  <button
                    key={key}
                    type="button"
                    title={ICON_LABELS[key]}
                    aria-label={`Choose ${ICON_LABELS[key]} icon`}
                    aria-pressed={selected}
                    onClick={() => setIcon(key)}
                    className={cn(
                      "grid aspect-square w-full cursor-pointer place-items-center rounded-[14px] border-2 bg-paper transition-transform duration-200",
                      selected
                        ? "-rotate-4 border-ink bg-yellow"
                        : "border-transparent hover:-rotate-2"
                    )}
                  >
                    <RitualIcon name={key} className="size-[23px]" />
                  </button>
                )
              })}
            </div>
          </fieldset>

          <fieldset className="mt-6 border-0 p-0">
            <legend className="mb-[11px] text-[0.82rem] font-bold">Pick a colour</legend>
            <div className="flex flex-wrap gap-[9px]">
              {RITUAL_COLORS.map((value, index) => {
                const selected = value === color
                return (
                  <button
                    key={value}
                    type="button"
                    aria-label={`Choose colour ${index + 1}`}
                    aria-pressed={selected}
                    onClick={() => setColor(value)}
                    className={cn(
                      "size-[38px] cursor-pointer rounded-full border-2 transition-transform duration-200",
                      selected
                        ? "scale-90 border-ink shadow-[0_0_0_3px_#fffefe,0_0_0_5px_#171719]"
                        : "border-transparent shadow-[inset_0_0_0_2px_rgba(23,23,25,0.12)]"
                    )}
                    style={{ background: value }}
                  />
                )
              })}
            </div>
          </fieldset>

          <Button
            type="submit"
            className="mt-[27px] flex h-[58px] w-full items-center justify-between rounded-[18px] border-2 border-ink bg-ink px-[19px] pl-[22px] text-[1rem] font-bold text-white shadow-[5px_5px_0_#be9bff] hover:bg-ink hover:text-white"
          >
            <span>{isEditing ? "Save changes" : "Add to every day"}</span>
            <ArrowRight className="size-6 stroke-[2.2] transition-transform duration-200 group-hover/button:translate-x-1" />
          </Button>

          {isEditing ? (
            <Button
              type="button"
              variant="ghost"
              onClick={onDelete}
              className="mt-[18px] h-12 w-full rounded-2xl border-2 border-[#aa2639] bg-[#fff0f2] font-bold text-[#aa2639] hover:bg-[#ffe4e8] hover:text-[#aa2639]"
            >
              Delete task
            </Button>
          ) : null}
        </form>
      </DialogContent>
    </Dialog>
  )
}
