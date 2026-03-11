export type ContentSection = {
  title: string;
  body: readonly string[];
  items?: readonly string[];
};

export type TermsSection = ContentSection & {
  hasPrivacyLink?: boolean;
};

export type PrivacySection = ContentSection;

export type SpecialEvent =
  | {
      badge: string;
      title: string;
      body: string;
    }
  | null;

export type FortuneSection = {
  heading: string;
  text: string;
};
