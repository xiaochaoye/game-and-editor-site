import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function Navbar() {
  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="text-2xl font-bold text-foreground hover:text-muted-foreground">
          Game & Editor
        </Link>
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost">
            <Link href="/game">游戏</Link>
          </Button>
          <Button asChild variant="ghost">
            <Link href="/editor">编辑</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}

