import { defineCollection, z } from "astro:content";

const apartments = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    shared_spaces: z.array(z.string()).default([]),
    order: z.number().default(0),
  })
});

const rooms = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),                // e.g., "3.1 Albert"
    apartment: z.string(),            // "3" (matches wohnung-3)
    size_m2: z.number().optional(),
    cold_rent_eur: z.number().optional(),
    available_from: z.string().optional(), // "2025-12"
    teaser: z.string().optional(),
    images: z.array(z.string()).default([]),
  })
});

export const collections = { apartments, rooms };
