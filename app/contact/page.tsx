"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { LuminaButton } from "@/components/ui/button";
import { PageShell } from "@/components/ui/page-shell";
import { runClientModerationCheck } from "@/lib/moderation/clientCheck";
import { getOrCreateChatVisitorKey } from "@/lib/membership";

const MAX_MESSAGE_LENGTH = 2000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function countChars(input: string): number {
  return Array.from(input).length;
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  const charCount = useMemo(() => countChars(message), [message]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setError("お名前を入力してください。");
      return;
    }
    if (!trimmedEmail || !EMAIL_RE.test(trimmedEmail)) {
      setError("メールアドレスの形式が正しくありません。");
      return;
    }
    if (!trimmedMessage) {
      setError("お問い合わせ内容を入力してください。");
      return;
    }
    if (countChars(trimmedMessage) > MAX_MESSAGE_LENGTH) {
      setError(`${MAX_MESSAGE_LENGTH}文字以内で入力してください。`);
      return;
    }

    const moderation = runClientModerationCheck(trimmedMessage, getOrCreateChatVisitorKey(), {
      maxLength: MAX_MESSAGE_LENGTH,
    });
    if (!moderation.ok) {
      setError(moderation.error);
      return;
    }

    try {
      setSending(true);
      setError(null);
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: moderation.normalizedText,
        }),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "送信に失敗しました。");
      }
      setSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "送信に失敗しました。");
    } finally {
      setSending(false);
    }
  };

  const handleWriteAgain = () => {
    setSubmitted(false);
    setName("");
    setEmail("");
    setMessage("");
    setError(null);
  };

  return (
    <PageShell
      maxWidth="content"
      title="お問い合わせ"
      description="ご質問・ご感想・不具合のご連絡などはこちらからお寄せください。順次確認のうえ、必要に応じてご返信いたします。"
      backHref="/"
      backLabel="トップへ戻る"
      className="font-serif"
    >
      {submitted ? (
        <GlassCard className="rounded-3xl space-y-4">
          <p className="text-base leading-relaxed text-[#544c42]">
            お問い合わせを受け付けました。<br />
            内容を確認のうえ、必要に応じてご入力いただいたメールアドレスへご返信いたします。
          </p>
          <div className="flex flex-wrap gap-3">
            <LuminaButton type="button" tone="secondary" className="rounded-xl px-6" onClick={handleWriteAgain}>
              続けて送る
            </LuminaButton>
            <LuminaButton asChild className="rounded-xl px-6">
              <Link href="/">トップへ戻る</Link>
            </LuminaButton>
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="rounded-3xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block text-sm font-medium text-[#2e2a26]">
              お名前（必須）
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                maxLength={60}
                className="lumina-input mt-2 w-full rounded-xl px-4 py-3 text-base"
                required
              />
            </label>

            <label className="block text-sm font-medium text-[#2e2a26]">
              メールアドレス（必須）
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                maxLength={200}
                inputMode="email"
                autoComplete="email"
                className="lumina-input mt-2 w-full rounded-xl px-4 py-3 text-base"
                required
              />
            </label>

            <label className="block text-sm font-medium text-[#2e2a26]">
              お問い合わせ内容（必須 / {MAX_MESSAGE_LENGTH}文字）
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                maxLength={MAX_MESSAGE_LENGTH}
                className="lumina-input mt-2 min-h-40 w-full rounded-xl px-4 py-3 text-base leading-relaxed"
                required
              />
            </label>

            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-[#847967]">
                {charCount}/{MAX_MESSAGE_LENGTH}文字
              </p>
              <LuminaButton type="submit" disabled={sending} className="rounded-xl px-6">
                {sending ? "送信しています..." : "送信する"}
              </LuminaButton>
            </div>

            <p className="text-xs leading-relaxed text-[#7d6d5a]">
              ※鑑定のお申し込みは
              <Link href="/consultation" className="underline underline-offset-2">個人鑑定のご依頼</Link>
              から、ルミナへのメッセージは
              <Link href="/letter" className="underline underline-offset-2">ルミナへの手紙</Link>
              からどうぞ。
            </p>
            {error ? <p className="text-sm text-[#8b5e5e] whitespace-pre-line">{error}</p> : null}
          </form>
        </GlassCard>
      )}
    </PageShell>
  );
}
