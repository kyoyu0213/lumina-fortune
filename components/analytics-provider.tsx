// 分析プロバイダー
// - visitor 初期化
// - page_view イベント送信
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initVisitor } from "@/lib/analytics/visitor";
import { trackEvent } from "@/lib/analytics/track";

/** 全ページ共通の分析初期化・page_view 送信コンポーネント */
export function AnalyticsProvider() {
  // visitor 初期化（初回マウント時のみ）
  useEffect(() => {
    void initVisitor();
  }, []);

  // page_view 送信（パス変更ごと）
  const pathname = usePathname();
  useEffect(() => {
    void trackEvent("page_view", pathname);
  }, [pathname]);

  return null;
}
