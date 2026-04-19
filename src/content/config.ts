import { defineCollection, z } from "astro:content";

const apartments = defineCollection({
  type: "content",
  schema: z.object({
    title_de: z.string(),
    title_en: z.string(),
    description_de: z.string().optional(),
    description_en: z.string().optional(),
    shared_spaces_de: z.array(z.string()).default([]),
    shared_spaces_en: z.array(z.string()).default([]),
    order: z.number().default(0),
    thumbnail: z.string().optional(),
    image_folder: z.string().optional(),
  }),
});

const rooms = defineCollection({
  type: "content",
  schema: z.object({
    title_de: z.string(),
    title_en: z.string(),
    teaser_de: z.string().optional(),
    teaser_en: z.string().optional(),
    apartment: z.string(),
    size_m2: z.number().optional(),
    cold_rent_eur: z.number().optional(),
    available_from: z.string().optional(),
    available: z.boolean().default(true),
  }),
});

export const collections = { apartments, rooms };
