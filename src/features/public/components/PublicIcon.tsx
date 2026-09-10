import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  HeartPulse,
  MapPin,
  Menu,
  Pause,
  Play,
  Search,
  ShieldCheck,
  Tag,
  Users,
  X,
} from "lucide-react"
import type { ComponentProps } from "react"

const icons = {
  "arrow-right": ArrowRight,
  "book-open": BookOpen,
  briefcase: BriefcaseBusiness,
  calendar: CalendarDays,
  chart: ChartNoAxesColumnIncreasing,
  "heart-pulse": HeartPulse,
  "map-pin": MapPin,
  menu: Menu,
  pause: Pause,
  play: Play,
  search: Search,
  "shield-check": ShieldCheck,
  tag: Tag,
  users: Users,
  x: X,
} as const

export type PublicIconName = keyof typeof icons

export function PublicIcon({ name, ...props }: { name: PublicIconName } & ComponentProps<"svg">) {
  const Icon = icons[name]
  return <Icon aria-hidden="true" className="icon" {...props} />
}
