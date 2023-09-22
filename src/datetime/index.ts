import { flow } from "lodash/fp";
import type { DatetimeDefinition } from "sanity";
import { z } from "zod";

import { createType } from "../types";
import type { GetRule, SanityTypeDef } from "../types";

export const datetime = <ParsedValue = Date, ResolvedValue = Date>({
  max,
  min,
  validation,
  mock = (faker) =>
      new Date("2020-12-31T00:00:00.000Z")
      .toISOString(),
  zod: zodFn = (zod) =>
    zod
      .transform((value) => new Date(value))
      .refine((date) => date.toString() !== "Invalid Date", {
        message: "Invalid Date",
      }) as unknown as z.ZodType<ParsedValue, any, string>,
  zodResolved,
  ...def
}: SanityTypeDef<DatetimeDefinition, string, ParsedValue, ResolvedValue> & {
  max?: string;
  min?: string;
} = {}) => {
  const zod = flow(
    (zod: z.ZodType<string, any, string>) =>
      !min
        ? zod
        : zod.refine((date) => new Date(min) <= new Date(date), {
            message: `Greater than ${min}`,
          }),
    (zod) =>
      !max
        ? zod
        : zod.refine((date) => new Date(date) <= new Date(max), {
            message: `Less than ${max}`,
          })
  )(z.string());

  return createType({
    mock,
    schema: () => ({
      ...def,
      type: "datetime",
      validation: flow(
        (rule: GetRule<DatetimeDefinition>) => (!min ? rule : rule.min(min)),
        (rule) => (!max ? rule : rule.max(max)),
        (rule) => validation?.(rule) ?? rule
      ),
    }),
    zod: zodFn(zod),
    zodResolved: zodResolved?.(zod),
  });
};
