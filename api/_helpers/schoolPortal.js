// Shared rules for the school portal: who is staff of which school, and who may manage which class.
export const uuidish = (v) => /^[\w-]{6,64}$/.test(String(v || ""));

// "admin" | "teacher" | null. The owner is always an admin.
export async function roleIn(sb, schoolId, email) {
  if (!uuidish(schoolId) || !email) return null;
  const { data: s } = await sb.from("schools").select("id,owner_email").eq("id", schoolId).maybeSingle();
  if (!s) return null;
  if (s.owner_email === email) return "admin";
  const { data } = await sb.from("school_staff").select("role").eq("school_id", schoolId).eq("email", email).maybeSingle();
  return data ? data.role : null;
}

// A class can be managed by its teacher, or by an admin of the school it belongs to.
export async function canManageClass(sb, c, email) {
  if (!c) return false;
  if (c.teacher_email === email) return true;
  if (c.school_id) return (await roleIn(sb, c.school_id, email)) === "admin";
  return false;
}

// Whose plan covers this class: the school owner's, or the teacher's own.
export async function planOwnerFor(sb, c) {
  if (c && c.school_id) {
    const { data } = await sb.from("schools").select("owner_email").eq("id", c.school_id).maybeSingle();
    if (data) return data.owner_email;
  }
  return c ? c.teacher_email : "";
}
