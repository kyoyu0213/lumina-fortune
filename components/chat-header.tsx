"use client"

export function ChatHeader() {
  return (
    <header className="border-b border-amber-200/50 bg-amber-50/80 px-4 py-3 backdrop-blur">
      <div className="flex items-center gap-2">
        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-white via-amber-50 to-amber-100 ring-2 ring-amber-200/50" />
        <div>
          <h2 className="font-semibold text-amber-900">白の魔女ルミナ</h2>
          <p className="text-xs text-amber-700/70">光とハーブを操る優しい魔女</p>
        </div>
      </div>
    </header>
  )
}
