import fs from "node:fs/promises";
import path from "node:path";

export async function loadImages(base: string, folder: string): Promise<string[]> {
  const dir = path.resolve(process.cwd(), "public", folder);

  const sortKey = (f: string) => {
    const stem = f.replace(/\.[^.]+$/, "");
    const us = stem.indexOf("_");
    return us >= 0 ? stem.slice(us + 1) : stem;
  };

  try {
    const files = await fs.readdir(dir);
    return files
      .filter((f) => /\.(jpe?g|png|webp|gif)$/i.test(f))
      .sort((a, b) => {
        const ka = sortKey(a).toLowerCase();
        const kb = sortKey(b).toLowerCase();
        if (ka === "cover" || ka.endsWith("-cover")) return -1;
        if (kb === "cover" || kb.endsWith("-cover")) return 1;
        return ka.localeCompare(kb, undefined, { numeric: true, sensitivity: "base" });
      })
      .map((f) => `${base}${folder}/${f}`);
  } catch {
    return [];
  }
}
