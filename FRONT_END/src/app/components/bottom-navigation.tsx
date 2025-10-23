"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Star, ShoppingCart, User } from "lucide-react"
import { cn } from "../../utils/utils"

const navItems = [
  { href: "/discover", label: "Discover", icon: Home },
  { href: "/user-rooms", label: "My rooms", icon: Search },
  { href: "/find-counselors", label: "Counselors", icon: Star },
  { href: "/user-bookings", label: "My sessions", icon: ShoppingCart },
  { href: "/counselor-profile", label: "Profile", icon: User },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-border bg-white">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-3 px-4 text-xs font-medium transition-colors",
                isActive ? "border-b-4 border-[#071133] text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
