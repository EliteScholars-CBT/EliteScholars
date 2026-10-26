// WhatsApp study groups. Stored in settings.group_chats as a list; the defaults are used until an admin saves their own.
export const AUDIENCES = ["jamb", "waec", "neco", "gst", "aspirant", "senior_school", "university"];
export const DEFAULT_GROUPS = [
  { id: "g-jamb", name: "JAMB, aspirants and SS1–SS3", url: "https://chat.whatsapp.com/EMxGWjBhDOuJI5I99UoGdV", audiences: ["jamb", "aspirant", "senior_school"], on: true },
  { id: "g-waec", name: "WAEC, NECO and SS1–SS3", url: "https://chat.whatsapp.com/E13l17eqAN11Eg2EfO3ucn", audiences: ["waec", "neco", "senior_school"], on: true },
  { id: "g-uni", name: "University and GST", url: "https://chat.whatsapp.com/GFm40LBFpF031tpY3e3z4B", audiences: ["gst", "university"], on: true },
];
export const validGroupUrl = (u) => /^https:\/\/(chat\.whatsapp\.com|whatsapp\.com)\/[A-Za-z0-9_\-\/?=&.]{6,200}$/.test(String(u || ""));
export async function loadGroups(sb) {
  try {
    const { data } = await sb.from("settings").select("value").eq("key", "group_chats").maybeSingle();
    if (data && Array.isArray(data.value)) return data.value;
  } catch { /* use defaults */ }
  return DEFAULT_GROUPS;
}
