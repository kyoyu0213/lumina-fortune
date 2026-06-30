"use client";

import { useCallback, useEffect, useState } from "react";

const SECRET_STORAGE_KEY = "lumina_admin_secret";

type TabKey = "contacts" | "wishes" | "letters";

type Contact = { id: string; name: string; email: string; message: string; createdAt: string };
type Wish = { id: string; message: string; createdAt: string };
type Letter = { id: string; nickname: string | null; message: string; createdAt: string };

const TABS: { key: TabKey; label: string }[] = [
  { key: "contacts", label: "お問い合わせ" },
  { key: "wishes", label: "光の願いの庭" },
  { key: "letters", label: "ルミナへの手紙" },
];

function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>("contacts");

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTab = useCallback(
    async (tab: TabKey, key: string) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/admin/${tab}`, {
          headers: { "x-admin-secret": key },
          cache: "no-store",
        });
        if (response.status === 401) {
          throw new Error("シークレットが正しくありません。");
        }
        if (!response.ok) {
          throw new Error("読み込みに失敗しました。");
        }
        const data = await response.json();
        if (tab === "contacts") setContacts(data.contacts ?? []);
        if (tab === "wishes") setWishes(data.wishes ?? []);
        if (tab === "letters") setLetters(data.letters ?? []);
        setAuthed(true);
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(SECRET_STORAGE_KEY, key);
        }
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "読み込みに失敗しました。");
        if (fetchError instanceof Error && fetchError.message.includes("シークレット")) {
          setAuthed(false);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // 起動時にセッションのシークレットを復元して自動ログイン。
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.sessionStorage.getItem(SECRET_STORAGE_KEY);
    if (saved) {
      setSecret(saved);
      void fetchTab("contacts", saved);
    }
  }, [fetchTab]);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (!secret.trim()) return;
    void fetchTab(activeTab, secret.trim());
  };

  const handleTabChange = (tab: TabKey) => {
    setActiveTab(tab);
    if (authed) void fetchTab(tab, secret.trim());
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") window.sessionStorage.removeItem(SECRET_STORAGE_KEY);
    setAuthed(false);
    setSecret("");
    setContacts([]);
    setWishes([]);
    setLetters([]);
  };

  const handleDelete = async (tab: TabKey, id: string) => {
    if (!window.confirm("この項目を削除します。よろしいですか？")) return;
    try {
      const response = await fetch(`/api/admin/${tab}?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-secret": secret.trim() },
      });
      if (!response.ok) throw new Error("削除に失敗しました。");
      if (tab === "contacts") setContacts((prev) => prev.filter((c) => c.id !== id));
      if (tab === "wishes") setWishes((prev) => prev.filter((w) => w.id !== id));
      if (tab === "letters") setLetters((prev) => prev.filter((l) => l.id !== id));
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "削除に失敗しました。");
    }
  };

  const currentCount =
    activeTab === "contacts" ? contacts.length : activeTab === "wishes" ? wishes.length : letters.length;

  return (
    <main className="mx-auto min-h-screen w-full max-w-4xl px-4 py-10 text-[#2e2a26]">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-medium">管理画面</h1>
        {authed ? (
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-[#d9ccb6] bg-white/70 px-3 py-1.5 text-sm hover:bg-white"
          >
            ログアウト
          </button>
        ) : null}
      </div>

      {!authed ? (
        <form
          onSubmit={handleLogin}
          className="rounded-2xl border border-[#e6dac8] bg-[#fdfaf3] p-6 shadow-sm"
        >
          <label className="block text-sm font-medium">
            管理シークレット
            <input
              type="password"
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              autoComplete="current-password"
              className="lumina-input mt-2 w-full rounded-xl px-4 py-3 text-base"
            />
          </label>
          <button
            type="submit"
            disabled={loading || !secret.trim()}
            className="mt-4 rounded-xl bg-[#3c352d] px-6 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {loading ? "確認中..." : "ログイン"}
          </button>
          {error ? <p className="mt-3 text-sm text-[#8b5e5e]">{error}</p> : null}
        </form>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-2 border-b border-[#e6dac8]">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => handleTabChange(tab.key)}
                className={`-mb-px rounded-t-lg px-4 py-2 text-sm transition ${
                  activeTab === tab.key
                    ? "border border-b-white border-[#e6dac8] bg-white font-medium text-[#2e2a26]"
                    : "text-[#847967] hover:text-[#2e2a26]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mb-3 flex items-center justify-between text-sm text-[#847967]">
            <span>{loading ? "読み込み中..." : `${currentCount}件`}</span>
            <button
              type="button"
              onClick={() => fetchTab(activeTab, secret.trim())}
              className="rounded-lg border border-[#d9ccb6] bg-white/70 px-3 py-1 hover:bg-white"
            >
              再読み込み
            </button>
          </div>

          {error ? <p className="mb-3 text-sm text-[#8b5e5e]">{error}</p> : null}

          <div className="space-y-3">
            {activeTab === "contacts" &&
              contacts.map((c) => (
                <article key={c.id} className="rounded-xl border border-[#e6dac8] bg-[#fdfaf3] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-medium">{c.name}</p>
                      <p className="text-sm text-[#847967] break-all">{c.email}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <time className="text-xs text-[#a79c8a]">{formatDate(c.createdAt)}</time>
                      <button
                        type="button"
                        onClick={() => handleDelete("contacts", c.id)}
                        className="text-xs text-[#a86b6b] hover:underline"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#544c42]">{c.message}</p>
                </article>
              ))}

            {activeTab === "wishes" &&
              wishes.map((w) => (
                <article key={w.id} className="rounded-xl border border-[#e6dac8] bg-[#fdfaf3] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#544c42]">{w.message}</p>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <time className="text-xs text-[#a79c8a]">{formatDate(w.createdAt)}</time>
                      <button
                        type="button"
                        onClick={() => handleDelete("wishes", w.id)}
                        className="text-xs text-[#a86b6b] hover:underline"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                </article>
              ))}

            {activeTab === "letters" &&
              letters.map((l) => (
                <article key={l.id} className="rounded-xl border border-[#e6dac8] bg-[#fdfaf3] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-medium">{l.nickname || "（ニックネームなし）"}</p>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <time className="text-xs text-[#a79c8a]">{formatDate(l.createdAt)}</time>
                      <button
                        type="button"
                        onClick={() => handleDelete("letters", l.id)}
                        className="text-xs text-[#a86b6b] hover:underline"
                      >
                        削除
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[#544c42]">{l.message}</p>
                </article>
              ))}

            {!loading && currentCount === 0 ? (
              <p className="rounded-xl border border-dashed border-[#e6dac8] bg-white/50 p-6 text-center text-sm text-[#847967]">
                まだ届いていません。
              </p>
            ) : null}
          </div>
        </>
      )}
    </main>
  );
}
