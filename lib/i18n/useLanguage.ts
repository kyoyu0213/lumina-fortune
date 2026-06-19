"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { DEFAULT_LANG, LANG_STORAGE_KEY, isLang, type Lang } from "./config";

/**
 * 表示言語を管理するフック。
 * 優先順位: URL の ?lang= → localStorage(lumina_lang) → 既定(ja)。
 *
 * localStorage を外部ストアとして useSyncExternalStore で購読する。
 * SSR/初期スナップショットは ja（getServerSnapshot）で、ハイドレーション後に
 * クライアントの解決値へ切り替わる（同一URL内で文言切替・他タブ変更にも追従）。
 */
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  const onStorage = (event: StorageEvent) => {
    if (event.key === LANG_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function resolveLang(): Lang {
  try {
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    if (isLang(urlLang)) return urlLang;
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    // localStorage 不可環境では既定言語
  }
  return DEFAULT_LANG;
}

function getServerSnapshot(): Lang {
  return DEFAULT_LANG;
}

export function useLanguage(): { lang: Lang; setLang: (next: Lang) => void } {
  const lang = useSyncExternalStore(subscribe, resolveLang, getServerSnapshot);

  // ?lang= 指定時は localStorage にも反映し、次回以降（?lang なし）も同じ言語で表示
  useEffect(() => {
    try {
      const urlLang = new URLSearchParams(window.location.search).get("lang");
      if (isLang(urlLang)) localStorage.setItem(LANG_STORAGE_KEY, urlLang);
    } catch {
      // 保存できなくても表示は URL 優先で正しく出る
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, next);
      // URL の ?lang も同期更新（リロードなし）。URL 優先の解決と矛盾させず、
      // ?lang 付きで訪れた後の手動切替も確実に反映し、URL を共有可能に保つ。
      const url = new URL(window.location.href);
      url.searchParams.set("lang", next);
      window.history.replaceState(null, "", url.toString());
    } catch {
      // 保存/URL更新できなくても切り替えは反映する
    }
    emitChange();
  }, []);

  return { lang, setLang };
}
