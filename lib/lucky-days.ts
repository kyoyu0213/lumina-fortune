export type LuckyDayKind = "ichiryumanbaibi" | "tenshabi" | "mi-no-hi";
export type Rokuyo = "大安" | "友引" | "先勝" | "先負" | "赤口" | "仏滅";

export type LuckyDayRecord = {
  lucky: LuckyDayKind[];
  rokuyo?: Rokuyo;
};

export const LUCKY_DAY_LABELS: Record<LuckyDayKind, string> = {
  ichiryumanbaibi: "一粒万倍日",
  tenshabi: "天赦日",
  "mi-no-hi": "巳の日",
};

export const LUCKY_DAY_DESCRIPTIONS: Record<LuckyDayKind, string> = {
  ichiryumanbaibi: "小さな種が広がる日",
  tenshabi: "すべてを赦される日",
  "mi-no-hi": "流れを整える日",
};

export const ROKUYO_DESCRIPTIONS: Partial<Record<Rokuyo, string>> = {
  大安: "安心して動ける日",
};

// JSONライクな日付データ: YYYY-MM-DD -> lucky / rokuyo
export const LUCKY_DAYS_DATA: Record<string, LuckyDayRecord> = {
  "2026-01-03": { lucky: ["ichiryumanbaibi"], rokuyo: "大安" },
  "2026-01-06": { lucky: ["mi-no-hi"] },
  "2026-01-11": { lucky: [], rokuyo: "大安" },
  "2026-01-18": { lucky: ["ichiryumanbaibi"] },
  "2026-01-23": { lucky: ["mi-no-hi"], rokuyo: "大安" },
  "2026-01-30": { lucky: ["tenshabi"] },

  "2026-02-01": { lucky: [], rokuyo: "大安" },
  "2026-02-05": { lucky: ["ichiryumanbaibi"] },
  "2026-02-06": { lucky: ["mi-no-hi"] },
  "2026-02-11": { lucky: [], rokuyo: "大安" },
  "2026-02-15": { lucky: ["ichiryumanbaibi"] },
  "2026-02-18": { lucky: ["tenshabi"] },
  "2026-02-19": { lucky: ["mi-no-hi"] },
  "2026-02-22": { lucky: [], rokuyo: "大安" },
  "2026-02-27": { lucky: ["ichiryumanbaibi"] },

  "2026-03-02": { lucky: [], rokuyo: "大安" },
  "2026-03-07": { lucky: ["mi-no-hi"] },
  "2026-03-10": { lucky: ["ichiryumanbaibi"] },
  "2026-03-14": { lucky: [], rokuyo: "大安" },
  "2026-03-21": { lucky: ["ichiryumanbaibi"] },
  "2026-03-22": { lucky: ["mi-no-hi"] },
  "2026-03-26": { lucky: [], rokuyo: "大安" },
};

export function getLuckyDaysForMonth(month: string): Record<string, LuckyDayRecord> {
  const result: Record<string, LuckyDayRecord> = {};
  for (const [dateKey, value] of Object.entries(LUCKY_DAYS_DATA)) {
    if (dateKey.startsWith(`${month}-`)) {
      result[dateKey] = value;
    }
  }
  return result;
}

