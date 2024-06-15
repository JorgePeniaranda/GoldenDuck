import type { LucideIcon } from "lucide-react";
import {
  Home,
  Timer,
  Building,
  Users,
  ListTodo,
  CircleDollarSign
} from "lucide-react";

interface NavbarEntryItem {
  path: string;
  name: string;
  icon: LucideIcon;
}

export const NAVBAR_ENTRIES_DATA: NavbarEntryItem[] = [
  {
    path: "/protected",
    name: "Home",
    icon: Home,
  },
  {
    path: "/protected/work/projects",
    name: "Work",
    icon: ListTodo,
  },
  {
    path: "/protected/people/cost-rates",
    name: "People",
    icon: Users,
  },
  {
    path: "/protected/crm/clients",
    name: "CRM",
    icon: Building,
  },
  {
    path: "/protected/time/allocation",
    name: "Time",
    icon: Timer,
  },
  {
    path: "/protected/financials/bills",
    name: "Financials",
    icon: CircleDollarSign,
  },  
] as const;
