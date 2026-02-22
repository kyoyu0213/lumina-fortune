"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"

type FortuneResponse = {
  text?: string
  error?: string
}

export default function Fortune2026Page() {
  const [birthDate, setBirthDate] = useState("")
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!birthDate) {
      setError("生年月日を入力してください。")
      return
    }

    setLoading(true)
    setError("")
    setResult("")

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `生年月日: ${birthDate}。この人の2026年の運勢を占ってください。総合運・仕事運・恋愛運・金運・健康運を含め、最後に開運アドバイスを3つ示してください。`,
          mode: "birthdate-2026",
          history: [],
        }),
      })

      const data = (await res.json()) as FortuneResponse
      if (!res.ok) {
        throw new Error(data.error ?? "占い結果の取得に失敗しました。")
      }

      setResult(data.text ?? "")
    } catch (err) {
      setError(err instanceof Error ? err.message : "通信エラーが発生しました。")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 px-6 py-10 text-amber-950">
      <div className="mx-auto max-w-2xl rounded-2xl border border-amber-200 bg-white/80 p-6 shadow-sm backdrop-blur">
        <div className="mb-4">
          <Link href="/" className="text-sm text-amber-700 underline-offset-4 hover:underline">
            トップへ戻る
          </Link>
        </div>

        <h1 className="text-2xl font-bold">生年月日で占う2026年の運勢</h1>
        <p className="mt-2 text-sm text-amber-900/80">
          生年月日を入力すると、占術の説明付きで2026年の運勢を詳しく占います。
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block text-sm font-medium">
            生年月日
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-2 w-full rounded-lg border border-amber-300 bg-white px-4 py-2 outline-none ring-amber-500 transition focus:ring-2"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-amber-600 px-8 py-3 font-medium text-white shadow-lg transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "占い中..." : "2026年の運勢を占う"}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-red-700">{error}</p> : null}

        {result ? (
          <section className="mt-6 rounded-xl border border-amber-200 bg-amber-50/60 p-4">
            <h2 className="mb-2 text-lg font-semibold">占い結果</h2>
            <p className="whitespace-pre-wrap leading-relaxed">{result}</p>
          </section>
        ) : null}
      </div>
    </main>
  )
}
