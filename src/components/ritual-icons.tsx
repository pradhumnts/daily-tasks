import type { JSX, SVGProps } from "react"

import { type IconName } from "@/lib/rituals"

type IconProps = SVGProps<SVGSVGElement>

function iconProps(props: IconProps): IconProps {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    "aria-hidden": true,
    ...props,
  }
}

export function MedicationIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="7" width="16" height="10" rx="5" transform="rotate(-45 12 12)" />
      <path d="m8.5 8.5 7 7" />
    </svg>
  )
}

export function WalkingIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="4" r="2" />
      <path d="m7 12 4-4 4 2 3 4M12 9l-2 6-4 6M10 15l5 2 1 4" />
    </svg>
  )
}

export function MalaIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="5" r="2" />
      <circle cx="12" cy="3" r="2" />
      <circle cx="17" cy="5" r="2" />
      <circle cx="19" cy="10" r="2" />
      <circle cx="17" cy="15" r="2" />
      <circle cx="12" cy="17" r="2" />
      <circle cx="7" cy="15" r="2" />
      <circle cx="5" cy="10" r="2" />
      <path d="M12 19v3m0-2-2 2m2-2 2 2" />
    </svg>
  )
}

export function PodcastIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14v-3a8 8 0 0 1 16 0v3" />
      <rect x="3" y="12" width="4" height="8" rx="2" />
      <rect x="17" y="12" width="4" height="8" rx="2" />
      <rect x="10" y="7" width="4" height="8" rx="2" />
      <path d="M12 15v4m-2 0h4" />
    </svg>
  )
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path
        d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="m18.5 16 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" fill="currentColor" />
    </svg>
  )
}

export function WaterIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M12 3S6.5 9.2 6.5 14a5.5 5.5 0 0 0 11 0C17.5 9.2 12 3 12 3Z" stroke="currentColor" strokeWidth="1.9" />
      <path d="M9.5 15.3c.5 1.3 1.5 2 2.8 2.2" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  )
}

export function MoveIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path d="M7 8v8M17 8v8M4 10v4M20 10v4M7 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function ReadIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path
        d="M4 5.5c3.3-.8 5.9-.2 8 1.8v12c-2.1-2-4.7-2.6-8-1.8v-12ZM20 5.5c-3.3-.8-5.9-.2-8 1.8v12c2.1-2 4.7-2.6 8-1.8v-12Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path
        d="M20 9.5c0 5-8 9.5-8 9.5S4 14.5 4 9.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8 3.5Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function CalmIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 2M5.5 5.5l1.2 1.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

export function FoodIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <path
        d="M5 4v6a3 3 0 0 0 3 3m0-9v16m3-16v5a3 3 0 0 0 6 0V4m-3 0v16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...iconProps(props)}>
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

export const RITUAL_ICON_MAP = {
  medication: MedicationIcon,
  walking: WalkingIcon,
  mala: MalaIcon,
  podcast: PodcastIcon,
  spark: SparkIcon,
  water: WaterIcon,
  move: MoveIcon,
  read: ReadIcon,
  heart: HeartIcon,
  calm: CalmIcon,
  food: FoodIcon,
  sun: SunIcon,
} satisfies Record<IconName, (props: IconProps) => JSX.Element>

export function RitualIcon({
  name,
  className,
}: {
  name: IconName
  className?: string
}) {
  const Icon = RITUAL_ICON_MAP[name] ?? SparkIcon
  return <Icon className={className} />
}
