// Details a school or tutorial centre gives when it registers, and the "show us on the site" choice.
// Shared by school-create / school-profile-save (portal) and the admin approval list.
export const STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];
export const SIZE_BANDS = ["under-50", "50-200", "200-500", "500-1000", "1000+"];
export const CONTACT_ROLES = ["Proprietor / Owner", "Principal / Head", "Vice principal", "Administrator", "Teacher", "Other"];

const clean = (v, n) => String(v == null ? "" : v).replace(/[\u0000-\u001F]/g, "").replace(/\s+/g, " ").trim().slice(0, n);

// Nigerian mobile numbers are stored as +234XXXXXXXXXX. Other international numbers are kept as +<digits>.
export function normalizePhone(v) {
  const raw = String(v == null ? "" : v).replace(/[\s\-().]/g, "");
  if (!raw) return "";
  if (/^(?:\+?234|0)[789][01]\d{8}$/.test(raw)) return "+234" + raw.replace(/^(?:\+?234|0)/, "");
  if (/^\+\d{10,15}$/.test(raw)) return raw;
  return null; // not valid
}

// Returns { value } or { error }. `kind` is "school" or "centre".
export function parseSchoolProfile(b, kind) {
  const word = kind === "centre" ? "centre" : "school";
  const contactName = clean(b.contact_name, 80);
  if (contactName.length < 2) return { error: "Enter the name of the person registering." };
  const phone = normalizePhone(b.phone);
  if (!phone) return { error: "Enter a valid phone / WhatsApp number, e.g. 0803 123 4567." };
  const state = clean(b.state, 30);
  if (!STATES.includes(state)) return { error: "Choose the state your " + word + " is in." };
  const city = clean(b.city, 60);
  if (city.length < 2) return { error: "Enter the town or area your " + word + " is in." };
  const role = clean(b.contact_role, 40);
  const size = clean(b.size_band, 12);
  return {
    value: {
      contact_name: contactName,
      contact_role: CONTACT_ROLES.includes(role) ? role : "",
      phone,
      state,
      city,
      size_band: SIZE_BANDS.includes(size) ? size : "",
      address: clean(b.address, 160),
    },
  };
}
export const cleanTagline = (v) => clean(v, 110);
