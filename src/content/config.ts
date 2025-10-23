// src/content/config.ts
import { defineCollection, z } from "astro:content";

/**
 * Apartments collection:
 * - Files live in: src/content/apartments/
 * - Filename (e.g., "apartment-3.md") becomes the slug used in URLs.
 * - Optional fields "thumbnail" and "details" are used on the WG list page.
 */
const apartments = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    shared_spaces: z.array(z.string()).default([]),
    order: z.number().default(0),
    thumbnail: z.string().optional(),
    details: z.array(z.string()).optional(),
  }),
});

/**
 * Rooms collection:
 * - Files live in: src/content/rooms/
 * - Filename becomes the room slug (e.g., "albert" → /zimmer/albert/).
 * - `apartment` must match the target apartment's slug/filename (e.g., "apartment-3").
 */
const rooms = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    apartment: z
      .string()
      .regex(/^apartment-\d+$/, 'Use the apartment slug, e.g. "apartment-3"'),
    size_m2: z.number().optional(),
    cold_rent_eur: z.number().optional(),
    available_from: z.string().optional(), // e.g., "2025-12"
    teaser: z.string().optional(),
    images: z.array(z.string()).default([]), // e.g., ["/rooms/img1.jpg"]
  }),
});

export const collections = { apartments, rooms };
