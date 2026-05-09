import { useState, useEffect } from "react";

function csvToObjects(csv: string): Record<string, string>[] {
  const lines = csv.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  return lines.slice(1).map((row) => {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < row.length; i++) {
      if (row[i] === '"') { inQuotes = !inQuotes; continue; }
      if (row[i] === "," && !inQuotes) { values.push(current.trim()); current = ""; continue; }
      current += row[i];
    }
    values.push(current.trim());
    return Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]));
  });
}

export function useSheetData(csvUrl: string) {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!csvUrl) return;
    setLoading(true);
    setError(false);
    fetch(csvUrl)
      .then((r) => { if (!r.ok) throw new Error("Failed"); return r.text(); })
      .then((text) => { setData(csvToObjects(text)); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [csvUrl]);

  return { data, loading, error };
}
