"use client";

import { useEffect } from "react";

const COCONALA_SERVICE_URL = "https://coconala.com/services/4121312";
const COCONALA_WIDGET_SCRIPT_URL = "https://coconala.com/js/coconala_widget.js";

export default function CoconalaWidget() {
  useEffect(() => {
    const previousScript = document.getElementById("coconala-wjs");
    if (previousScript) {
      previousScript.remove();
    }

    const script = document.createElement("script");
    script.id = "coconala-wjs";
    script.src = COCONALA_WIDGET_SCRIPT_URL;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="w-full space-y-4">
      <a
        className="coconala-widget"
        href={COCONALA_SERVICE_URL}
        data-service_id="4121312"
        data-width="800"
        data-comment="0"
        data-invite="0"
        data-user_id="5959842"
      >
        タロットと宿曜で丁寧な鑑定書をお届けします 恋愛・仕事・人間関係をカードで深く読み解きます
      </a>

      <div className="rounded-2xl border border-[#e1d5bf]/70 bg-[rgba(255,252,247,0.78)] p-4 text-sm leading-relaxed text-[#544c42]">
        <p className="font-medium text-[#2e2a26]">ウィジェットが表示されない場合</p>
        <p className="mt-2">
          読み込みに失敗しても、下のボタンからココナラの鑑定ページを開けます。
        </p>
        <a
          href={COCONALA_SERVICE_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex min-h-11 items-center justify-center rounded-full bg-[#8f7a5a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#7b684c]"
        >
          ココナラで鑑定を依頼する
        </a>
      </div>
    </div>
  );
}
