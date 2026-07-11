import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  LayoutDashboard,
  MessagesSquare,
  ShieldCheck,
  Ticket,
  UsersRound
} from "lucide-react";

export const metrics = [
  { label: "Active events", value: "12", delta: "+3 this month", tone: "blue", icon: CalendarDays },
  { label: "Applications", value: "284", delta: "68 accepted", tone: "orange", icon: ClipboardList },
  { label: "Checked in", value: "1,248", delta: "74% arrival rate", tone: "green", icon: CheckCircle2 },
  { label: "Teams formed", value: "96", delta: "18 unassigned", tone: "navy", icon: UsersRound }
] as const;

export const events = [
  {
    title: "Clyyo Hack Lagos",
    type: "Hackathon",
    location: "Lagos, Nigeria",
    date: "Sep 18-20",
    applications: 148,
    registrations: 96,
    checkIns: "0%",
    status: "Published",
    accent: "orange"
  },
  {
    title: "Builder Systems Conf",
    type: "Conference",
    location: "Austin, TX",
    date: "Oct 04",
    applications: 62,
    registrations: 420,
    checkIns: "81%",
    status: "Live",
    accent: "blue"
  },
  {
    title: "AI Events Workshop",
    type: "Workshop",
    location: "Remote",
    date: "Nov 12",
    applications: 74,
    registrations: 132,
    checkIns: "0%",
    status: "Draft",
    accent: "green"
  }
] as const;

export const schedule = [
  { time: "09:00", title: "Organizer standup", tag: "Ops" },
  { time: "11:30", title: "Sponsor lead review", tag: "Sponsors" },
  { time: "14:00", title: "Team matching audit", tag: "Teams" }
] as const;

export const notifications = [
  "24 new applications need review",
  "Team Atlas reached max size",
  "Gold Partner sponsorship activated"
] as const;

export const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Events", icon: CalendarDays, active: false },
  { label: "Applications", icon: ClipboardList, active: false },
  { label: "Teams", icon: UsersRound, active: false },
  { label: "Check-in", icon: Ticket, active: false },
  { label: "Sponsors", icon: ShieldCheck, active: false },
  { label: "Messages", icon: MessagesSquare, active: false }
] as const;
