import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FAQ } from "@/components/FAQ"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center">
      <h1 className="text-5xl font-bold mb-8 animate-pulse">Welcome to Game & Editor</h1>
      <p className="text-xl mb-8">在一个地方体验游戏和编辑！</p>
      <div className="space-x-4 mb-12">
        <Button asChild size="lg" variant="secondary" className="bg-white text-black hover:bg-gray-100">
          <Link href="/game">玩游戏</Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className="bg-black/50 text-white hover:bg-gray-500">
          <Link href="/editor">编辑</Link>
        </Button>
      </div>
      <FAQ />
    </div>
  )
}

