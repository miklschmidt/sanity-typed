import type { GeopointDefinition, GeopointValue } from "sanity";
import { z } from "zod";

import { createType } from "../types";
import type { SanityTypeDef } from "../types";

const zod: z.ZodType<GeopointValue, any, GeopointValue> = z.object({
  _type: z.literal("geopoint"),
  alt: z.number().optional(),
  lat: z.number(),
  lng: z.number(),
});

export const geopoint = <
  ParsedValue = GeopointValue,
  ResolvedValue = GeopointValue
>({
  mock = (faker) => ({
    _type: "geopoint",
    alt: Math.random(),
    lat: 1.0040230231,
    lng: 5.02038920,
  }),
  zod: zodFn = (zod) =>
    zod as unknown as z.ZodType<ParsedValue, any, GeopointValue>,
  zodResolved,
  ...def
}: SanityTypeDef<
  GeopointDefinition,
  GeopointValue,
  ParsedValue,
  ResolvedValue
> = {}) =>
  createType({
    mock,
    schema: () => ({
      ...def,
      type: "geopoint",
    }),
    zod: zodFn(zod),
    zodResolved: zodResolved?.(zod),
  });
