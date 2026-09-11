"use client"

import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { formatShortDate } from "@/lib/rituals"

export function TopBar() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as BeforeInstallPromptEvent)
    }
    const onInstalled = () => setInstallPrompt(null)
    window.addEventListener("beforeinstallprompt", onPrompt)
    window.addEventListener("appinstalled", onInstalled)
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt)
      window.removeEventListener("appinstalled", onInstalled)
    }
  }, [])

  async function installApp() {
    if (!installPrompt) return
    await installPrompt.prompt()
    await installPrompt.userChoice
    setInstallPrompt(null)
  }

  return (
    <header className="mb-6 flex min-h-[50px] items-center justify-between max-sm:mb-4 max-sm:px-1">
      <Link href="/" className="inline-flex items-center gap-[11px] text-ink no-underline" aria-label="Daily home">
        <span className="relative block size-[31px] rotate-45" aria-hidden="true">
          <i className="absolute top-0 left-0 size-[13px] rounded-[4px] bg-ink" />
          <i className="absolute top-0 right-0 size-[13px] rounded-[4px] border-2 border-ink bg-purple" />
          <i className="absolute bottom-0 left-0 size-[13px] rounded-[4px] border-2 border-ink bg-lime" />
          <i className="absolute right-0 bottom-0 size-[13px] rounded-[4px] bg-ink" />
        </span>
        <span className="text-[1.28rem] font-extrabold tracking-[-0.06em]">daily</span>
      </Link>
      <div className="flex items-center gap-2.5">
        {installPrompt ? (
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Install app"
            onClick={installApp}
            className="size-[42px] rounded-full border-2 border-ink bg-cream text-ink shadow-[3px_3px_0_#171719] hover:bg-cream hover:text-ink"
          >
            <Download className="size-[19px]" />
          </Button>
        ) : null}
        <div className="flex min-h-[42px] items-center gap-[9px] rounded-full border-2 border-ink bg-cream px-4 text-[0.86rem] font-bold shadow-[3px_3px_0_#171719] max-sm:px-3">
          <span className="size-[9px] rounded-full border-2 border-ink bg-orange" />
          <span suppressHydrationWarning>{formatShortDate()}</span>
        </div>
      </div>
    </header>
  )
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}
