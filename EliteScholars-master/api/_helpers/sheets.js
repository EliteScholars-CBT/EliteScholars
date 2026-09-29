const SHEETS_URL = process.env.SHEETS_URL;

export async function sheetsGet(params) {
  try {
    const url = `${SHEETS_URL}?${new URLSearchParams(params)}`;

    const res = await fetch(url);
    const text = await res.text();

    try {
      return JSON.parse(text);
    } catch {
      return {
        success: false,
        error: "Invalid JSON from Sheets",
        raw: text
      };
    }

  } catch (err) {
    return {
      success: false,
      error: err.message
    };
  }
}

export async function sheetsPost(body) {
  try {
    await fetch(SHEETS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {}
}