import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const sightingSchema = z.object({
  title: z.string(),
  target: z.string(),
  category: z.enum(['solar-system', 'lunar', 'solar', 'deep-sky', 'stellar']),
  timestamp: z.coerce.date(),
  location: z.object({
    name: z.string(),
    bortleClass: z.number().min(1).max(9),
  }),
  ephemeris: z.object({
    constellation: z.string(),
    apparentMagnitude: z.number(),
    distanceAU: z.number(),
    lightTravelTimeMinutes: z.number(),
    phasePercent: z.number().optional(),
    altitude: z.string().optional(),
    azimuth: z.string().optional(),
  }),
  optics: z.object({
    device: z.string(),
    focalLength: z.string(),
    exposure: z.string(),
    iso: z.number(),
    stacked: z.boolean(),
  }),
  notes: z.string(),
  rawImage: z.string(),
  rawImageLabel: z.string().optional(),
  rawImageSecondary: z.string().optional(),
  rawImageSecondaryLabel: z.string().optional(),
  rawImageSecondaryPosition: z.string().optional(),
  stellariumImage: z.string().optional(),
  imagePosition: z.string().optional(),
});

export type Sighting = z.infer<typeof sightingSchema>;

const sightings = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/sightings' }),
  schema: sightingSchema,
});

export const collections = { sightings };

