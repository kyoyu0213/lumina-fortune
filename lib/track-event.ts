import { supabaseInsert } from "@/lib/analytics/supabase-client";

export async function trackEvent(data: {
  event_name: string;
  page?: string;
  label?: string;
}) {
  await supabaseInsert("events", {
    event_name: data.event_name,
    page: data.page || null,
    label: data.label || null,
  });
}
