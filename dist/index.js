"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __pow = Math.pow;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  s: () => builder_exports,
  sharedFields: () => sharedFields
});
module.exports = __toCommonJS(src_exports);

// src/field/index.ts
var import_fp = require("lodash/fp");
var import_zod = require("zod");
var fieldsZodObject = (fields) => (0, import_fp.fromPairs)(
  fields.map(({ name, optional, type: { zod: zod5 } }) => [
    name,
    optional ? import_zod.z.optional(zod5) : zod5
  ])
);
var fieldsZodResolvedObject = (fields) => (0, import_fp.fromPairs)(
  fields.map(({ name, optional, type: { zodResolved } }) => [
    name,
    optional ? import_zod.z.optional(zodResolved) : zodResolved
  ])
);
var fieldsMock = (fields) => (faker, path = "") => (0, import_fp.fromPairs)(
  fields.map(({ name, type: { mock } }) => [
    name,
    mock(faker, `${path}.${name}`)
  ])
);
var fieldsSchema = (fields, previewDef) => ({
  fields: fields.map((_a) => {
    var _b = _a, { name, type, optional } = _b, props = __objRest(_b, ["name", "type", "optional"]);
    const schema = type.schema();
    const { validation } = schema;
    return __spreadProps(__spreadValues(__spreadValues({}, schema), props), {
      name,
      validation: (0, import_fp.flow)(
        (rule) => optional ? rule : rule.required(),
        (rule) => {
          var _a2;
          return (_a2 = validation == null ? void 0 : validation(rule)) != null ? _a2 : rule;
        }
      )
    });
  }),
  preview: !previewDef ? void 0 : !("prepare" in previewDef) ? previewDef : __spreadProps(__spreadValues({}, previewDef), {
    select: __spreadValues(__spreadValues({}, (0, import_fp.fromPairs)(fields.map(({ name }) => [name, name]))), previewDef.select)
  })
});
var sharedFields = (fields) => fields;

// src/builder.ts
var builder_exports = {};
__export(builder_exports, {
  array: () => array,
  block: () => block,
  boolean: () => boolean,
  createType: () => createType,
  date: () => date,
  datetime: () => datetime,
  document: () => document,
  file: () => file,
  geopoint: () => geopoint,
  image: () => image,
  number: () => number,
  object: () => object,
  objectNamed: () => objectNamed,
  reference: () => reference,
  slug: () => slug,
  string: () => string,
  text: () => text,
  url: () => url
});

// src/array/index.ts
var import_fp2 = require("lodash/fp");
var import_zod3 = require("zod");

// src/types.ts
var import_zod2 = require("zod");
var zodUnion = (zods) => zods.length === 1 ? zods[0] : import_zod2.z.union([zods[0], zods[1], ...zods.slice(2)]);
var isZodObjectWithDiscriminator = (discriminator) => (zod5) => zod5 instanceof import_zod2.z.ZodObject && discriminator in zod5.shape && zod5.shape[discriminator] instanceof import_zod2.z.ZodLiteral;
var zodDiscriminatedUnionMaybe = (discriminator) => (zods) => zods.length === 1 ? zods[0] : zods.every(isZodObjectWithDiscriminator(discriminator)) ? import_zod2.z.discriminatedUnion(discriminator, [
  zods[0],
  zods[1],
  ...zods.slice(
    2
  )
]) : import_zod2.z.union([zods[0], zods[1], ...zods.slice(2)]);
var createMocker = (mockFn) => {
  const fakers = {};
  return (faker, path = "") => {
    return mockFn(fakers[path], path);
  };
};
var createType = (_a) => {
  var _b = _a, {
    mock,
    zod: zod5,
    zodResolved = zod5,
    parse = zod5.parse.bind(zod5),
    resolve = zodResolved.parse.bind(zodResolved)
  } = _b, def = __objRest(_b, [
    "mock",
    "zod",
    "zodResolved",
    "parse",
    "resolve"
  ]);
  return __spreadProps(__spreadValues({}, def), {
    mock: createMocker(mock),
    parse,
    resolve,
    zod: zod5,
    zodResolved
  });
};

// src/array/index.ts
var addKeyToZod = (zod5) => !(zod5 instanceof import_zod3.z.ZodObject) ? zod5 : zod5.extend({
  _key: import_zod3.z.string()
});
var zodArrayOfLength = ({
  length,
  max,
  min
}) => (zods) => (0, import_fp2.flow)(
  (0, import_fp2.flow)(
    (value) => value,
    (0, import_fp2.map)(addKeyToZod),
    zodDiscriminatedUnionMaybe("_type"),
    import_zod3.z.array,
    (zod5) => min === void 0 ? zod5 : zod5.min(min),
    (zod5) => max === void 0 ? zod5 : zod5.max(max),
    (zod5) => length === void 0 ? zod5 : zod5.length(length)
  ),
  (zod5) => zod5
)(zods);
var array = (_a) => {
  var _b = _a, {
    length,
    max,
    min,
    validation,
    of: items,
    mock: mock = () => [],
    zod: zodFn = (zod5) => zod5,
    zodResolved = (zod5) => zod5
  } = _b, def = __objRest(_b, [
    "length",
    "max",
    "min",
    "validation",
    "of",
    // FIXME Mock the array element types. Not sure how to allow an override, since the function has to be defined before we know the element types.
    "mock",
    "zod",
    "zodResolved"
  ]);
  return createType({
    mock,
    zod: zodFn(
      (0, import_fp2.flow)(
        (value) => value,
        (0, import_fp2.map)(
          ({ zod: zod5 }) => zod5
        ),
        zodArrayOfLength({ length, max, min }),
        (value) => value
      )(items)
    ),
    zodResolved: zodResolved(
      (0, import_fp2.flow)(
        (value) => value,
        (0, import_fp2.map)(
          ({ zodResolved: zodResolved2 }) => zodResolved2
        ),
        zodArrayOfLength({ length, max, min }),
        (value) => value
      )(items)
    ),
    schema: () => __spreadProps(__spreadValues({}, def), {
      type: "array",
      of: items.map(({ schema }) => schema()),
      validation: (0, import_fp2.flow)(
        (rule) => !min ? rule : rule.min(min),
        (rule) => !max ? rule : rule.max(max),
        (rule) => length === void 0 ? rule : rule.length(length),
        (rule) => {
          var _a2;
          return (_a2 = validation == null ? void 0 : validation(rule)) != null ? _a2 : rule;
        }
      )
    })
  });
};

// src/block/index.ts
var import_zod4 = require("zod");
var zod = () => import_zod4.z.object({
  _key: import_zod4.z.optional(import_zod4.z.string()),
  _type: import_zod4.z.string(),
  level: import_zod4.z.optional(import_zod4.z.number()),
  listItem: import_zod4.z.optional(import_zod4.z.string()),
  style: import_zod4.z.optional(import_zod4.z.string()),
  children: import_zod4.z.array(
    import_zod4.z.object({
      _type: import_zod4.z.string(),
      _key: import_zod4.z.optional(import_zod4.z.string())
    }).catchall(import_zod4.z.unknown())
  ),
  markDefs: import_zod4.z.optional(
    import_zod4.z.array(
      import_zod4.z.object({
        _type: import_zod4.z.string(),
        _key: import_zod4.z.string()
      }).catchall(import_zod4.z.unknown())
    )
  )
});
var block = (_a = {}) => {
  var _b = _a, {
    mock = (faker) => ({
      style: "normal",
      _type: "block",
      markDefs: [],
      children: [
        {
          _type: "span",
          text: "",
          marks: []
        }
      ]
    }),
    zod: zodFn = (zod5) => zod5,
    zodResolved
  } = _b, def = __objRest(_b, [
    "mock",
    "zod",
    "zodResolved"
  ]);
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues({}, def), {
      type: "block"
    }),
    zod: zodFn(zod()),
    zodResolved: zodResolved == null ? void 0 : zodResolved(zod())
  });
};

// src/boolean/index.ts
var import_zod5 = require("zod");
var boolean = (_a = {}) => {
  var _b = _a, {
    mock = (faker) => true,
    zod: zodFn = (zod5) => zod5,
    zodResolved
  } = _b, def = __objRest(_b, [
    "mock",
    "zod",
    "zodResolved"
  ]);
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues({}, def), {
      type: "boolean"
    }),
    zod: zodFn(import_zod5.z.boolean()),
    zodResolved: zodResolved == null ? void 0 : zodResolved(import_zod5.z.boolean())
  });
};

// src/date/index.ts
var import_zod6 = require("zod");
var date = (_a = {}) => {
  var _b = _a, {
    mock = (faker) => (/* @__PURE__ */ new Date("2020-12-31T00:00:00.000Z")).toLocaleDateString("fr-CA"),
    zod: zodFn = (zod5) => zod5,
    zodResolved
  } = _b, def = __objRest(_b, [
    "mock",
    "zod",
    "zodResolved"
  ]);
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues({}, def), {
      type: "date"
    }),
    // TODO Check date validity against dateFormat with something like moment (moment is too big)
    zod: zodFn(import_zod6.z.string()),
    zodResolved: zodResolved == null ? void 0 : zodResolved(import_zod6.z.string())
  });
};

// src/datetime/index.ts
var import_fp3 = require("lodash/fp");
var import_zod7 = require("zod");
var datetime = (_a = {}) => {
  var _b = _a, {
    max,
    min,
    validation,
    mock = (faker) => (/* @__PURE__ */ new Date("2020-12-31T00:00:00.000Z")).toISOString(),
    zod: zodFn = (zod5) => zod5.transform((value) => new Date(value)).refine((date2) => date2.toString() !== "Invalid Date", {
      message: "Invalid Date"
    }),
    zodResolved
  } = _b, def = __objRest(_b, [
    "max",
    "min",
    "validation",
    "mock",
    "zod",
    "zodResolved"
  ]);
  const zod5 = (0, import_fp3.flow)(
    (zod6) => !min ? zod6 : zod6.refine((date2) => new Date(min) <= new Date(date2), {
      message: `Greater than ${min}`
    }),
    (zod6) => !max ? zod6 : zod6.refine((date2) => new Date(date2) <= new Date(max), {
      message: `Less than ${max}`
    })
  )(import_zod7.z.string());
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues({}, def), {
      type: "datetime",
      validation: (0, import_fp3.flow)(
        (rule) => !min ? rule : rule.min(min),
        (rule) => !max ? rule : rule.max(max),
        (rule) => {
          var _a2;
          return (_a2 = validation == null ? void 0 : validation(rule)) != null ? _a2 : rule;
        }
      )
    }),
    zod: zodFn(zod5),
    zodResolved: zodResolved == null ? void 0 : zodResolved(zod5)
  });
};

// src/document/index.ts
var import_fp4 = require("lodash/fp");
var import_zod8 = require("zod");
var extraZodFields = (name) => ({
  _createdAt: import_zod8.z.string().transform((date2) => new Date(date2)),
  _id: import_zod8.z.string(),
  _rev: import_zod8.z.string(),
  _type: import_zod8.z.literal(name),
  _updatedAt: import_zod8.z.string().transform((date2) => new Date(date2))
});
var document = (_a) => {
  var _b = _a, {
    name,
    fields,
    preview: previewDef,
    mock = (faker) => {
      const createdAt = (/* @__PURE__ */ new Date("2021-06-03T03:24:55.395Z")).toISOString();
      return __spreadProps(__spreadValues({}, fieldsMock(fields)(faker, name)), {
        _id: "wdf123-123-123-123-123",
        _createdAt: createdAt,
        _rev: "efgvker1239012",
        _type: name,
        _updatedAt: (/* @__PURE__ */ new Date("2022-06-05T18:50:36.539Z")).toISOString()
      });
    },
    zod: zodFn = (zod5) => zod5,
    zodResolved = (zod5) => zod5
  } = _b, def = __objRest(_b, [
    "name",
    "fields",
    "preview",
    "mock",
    "zod",
    "zodResolved"
  ]);
  let counter = 0;
  let mocks = [];
  let mocksById = {};
  const getNthMock = (faker, index) => {
    const newMocks = Array.from({
      length: Math.max(0, index + 1 - mocks.length)
    }).fill("test").map(() => mock(faker, ""));
    if (newMocks.length > 0) {
      mocks = [...mocks, ...newMocks];
      mocksById = __spreadValues(__spreadValues({}, mocksById), (0, import_fp4.keyBy)(
        (doc) => (
          // eslint-disable-next-line no-underscore-dangle -- Sanity uses _id
          doc._id
        ),
        newMocks
      ));
    }
    return mocks[index];
  };
  return __spreadValues({
    getMockById: (id) => mocksById[id],
    getNthMock,
    name
  }, createType({
    mock: (faker) => {
      counter += 1;
      return getNthMock(faker, counter);
    },
    schema: () => __spreadProps(__spreadValues(__spreadValues({}, def), fieldsSchema(fields, previewDef)), {
      name,
      type: "document"
    }),
    zod: zodFn(
      import_zod8.z.object(__spreadValues(__spreadValues({}, fieldsZodObject(fields)), extraZodFields(name)))
    ),
    zodResolved: zodResolved(
      import_zod8.z.object(__spreadValues(__spreadValues({}, fieldsZodResolvedObject(fields)), extraZodFields(name)))
    )
  }));
};

// src/file/index.ts
var import_zod10 = require("zod");

// src/reference/index.ts
var import_zod9 = require("zod");
var referenceZod = (weak) => import_zod9.z.object({
  _key: import_zod9.z.string().optional(),
  _ref: import_zod9.z.string(),
  _strengthenOnPublish: import_zod9.z.object({
    template: import_zod9.z.object({
      id: import_zod9.z.string(),
      params: import_zod9.z.object({}).catchall(import_zod9.z.union([import_zod9.z.string(), import_zod9.z.number(), import_zod9.z.boolean()]))
    }).optional(),
    type: import_zod9.z.string(),
    weak: import_zod9.z.boolean().optional()
  }).optional(),
  _type: import_zod9.z.literal("reference"),
  _weak: weak ? import_zod9.z.literal(true) : import_zod9.z.boolean().optional()
});
var reference = (_a) => {
  var _b = _a, {
    weak,
    to: documents,
    zod: zodFn = (zod5) => zod5,
    zodResolved = (zod5) => zod5.transform(
      ({ _ref }) => {
        var _a2;
        return (_a2 = documents.map(({ getMockById, resolve }) => {
          const mock = getMockById(_ref);
          return !mock ? null : resolve(mock);
        }).find(Boolean)) != null ? _a2 : null;
      }
    )
  } = _b, defRaw = __objRest(_b, [
    "weak",
    "to",
    "zod",
    "zodResolved"
  ]);
  let counter = 0;
  const _a2 = defRaw, {
    mock = (faker) => {
      counter += 1;
      const { _id: ref } = { _id: "owiejfowijefw" };
      const isBrokenRef = true;
      const brokenRef = "23541231";
      const mock2 = {
        _ref: weak && isBrokenRef ? brokenRef : ref,
        _type: "reference"
      };
      return !weak ? mock2 : __spreadProps(__spreadValues({}, mock2), {
        _weak: true
      });
    }
  } = _a2, def = __objRest(_a2, [
    "mock"
  ]);
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues({}, def), {
      weak,
      type: "reference",
      to: documents.map(({ name: type }) => ({ type }))
    }),
    zod: zodFn(referenceZod(weak)),
    zodResolved: zodResolved(referenceZod(weak))
  });
};

// src/file/index.ts
var extraZodFields2 = {
  _type: import_zod10.z.literal("file"),
  asset: referenceZod(false)
};
var file = (_a = {}) => {
  var _b = _a, {
    fields,
    mock = (faker, path) => __spreadProps(__spreadValues({}, fields && fieldsMock(fields)(faker, path)), {
      _type: "file",
      asset: {
        _type: "reference",
        _ref: "wefw"
      }
    }),
    zod: zodFn = (zod5) => zod5,
    zodResolved = (zod5) => zod5
  } = _b, def = __objRest(_b, [
    "fields",
    "mock",
    "zod",
    "zodResolved"
  ]);
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues(__spreadValues({}, def), fields && fieldsSchema(fields)), {
      type: "file"
    }),
    zod: zodFn(
      import_zod10.z.object(__spreadValues(__spreadValues({}, fields && fieldsZodObject(fields)), extraZodFields2))
    ),
    zodResolved: zodResolved(
      import_zod10.z.object(__spreadValues(__spreadValues({}, fields && fieldsZodResolvedObject(fields)), extraZodFields2))
    )
  });
};

// src/geopoint/index.ts
var import_zod11 = require("zod");
var zod2 = import_zod11.z.object({
  _type: import_zod11.z.literal("geopoint"),
  alt: import_zod11.z.number().optional(),
  lat: import_zod11.z.number(),
  lng: import_zod11.z.number()
});
var geopoint = (_a = {}) => {
  var _b = _a, {
    mock = (faker) => ({
      _type: "geopoint",
      alt: Math.random(),
      lat: 1.0040230231,
      lng: 5.0203892
    }),
    zod: zodFn = (zod5) => zod5,
    zodResolved
  } = _b, def = __objRest(_b, [
    "mock",
    "zod",
    "zodResolved"
  ]);
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues({}, def), {
      type: "geopoint"
    }),
    zod: zodFn(zod2),
    zodResolved: zodResolved == null ? void 0 : zodResolved(zod2)
  });
};

// src/image/index.ts
var import_zod12 = require("zod");
var extraZodFields3 = (hotspot) => __spreadValues({
  _type: import_zod12.z.literal("image"),
  asset: referenceZod(false)
}, !hotspot ? {} : {
  crop: import_zod12.z.object({
    _type: import_zod12.z.literal("sanity.imageCrop").optional(),
    bottom: import_zod12.z.number(),
    left: import_zod12.z.number(),
    right: import_zod12.z.number(),
    top: import_zod12.z.number()
  }).optional(),
  hotspot: import_zod12.z.object({
    _type: import_zod12.z.literal("sanity.imageHotspot").optional(),
    height: import_zod12.z.number(),
    width: import_zod12.z.number(),
    x: import_zod12.z.number(),
    y: import_zod12.z.number()
  }).optional()
});
var zeroToOne = (faker) => Math.random();
var image = (_a = {}) => {
  var _b = _a, {
    hotspot,
    fields,
    mock = (faker, path) => __spreadValues(__spreadProps(__spreadValues({}, fields && fieldsMock(fields)(faker, path)), {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: `image-345234234512314-900x3000-jpeg`
      }
    }), !hotspot ? {} : {
      crop: {
        top: zeroToOne(faker),
        bottom: zeroToOne(faker),
        left: zeroToOne(faker),
        right: zeroToOne(faker)
      },
      hotspot: {
        x: zeroToOne(faker),
        y: zeroToOne(faker),
        height: zeroToOne(faker),
        width: zeroToOne(faker)
      }
    }),
    zod: zodFn = (zod5) => zod5,
    zodResolved = (zod5) => zod5,
    options
  } = _b, def = __objRest(_b, [
    "hotspot",
    "fields",
    "mock",
    "zod",
    "zodResolved",
    "options"
  ]);
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues(__spreadValues({}, def), fields && fieldsSchema(fields)), {
      options: __spreadProps(__spreadValues({}, options), { hotspot: Boolean(hotspot) }),
      type: "image"
    }),
    zod: zodFn(
      import_zod12.z.object(__spreadValues(__spreadValues({}, fields && fieldsZodObject(fields)), extraZodFields3(hotspot)))
    ),
    zodResolved: zodResolved(
      import_zod12.z.object(__spreadValues(__spreadValues({}, fields && fieldsZodResolvedObject(fields)), extraZodFields3(hotspot)))
    )
  });
};

// src/number/index.ts
var import_fp6 = require("lodash/fp");
var import_zod13 = require("zod");

// src/list/index.ts
var import_fp5 = require("lodash/fp");
var listValueToValue = (item) => (0, import_fp5.isObject)(item) && "title" in item && "value" in item ? item.value : item;
var listMock = (list) => (faker) => (0, import_fp5.flow)(
  (0, import_fp5.map)(listValueToValue)
)(list);

// src/number/index.ts
var number = (_a = {}) => {
  var _b = _a, {
    greaterThan,
    integer,
    lessThan,
    max,
    min,
    options,
    negative,
    positive,
    precision,
    validation,
    options: { list } = {},
    mock = !list ? (faker) => 1.232 : listMock(list),
    zod: zodFn = (zod5) => zod5,
    zodResolved
  } = _b, def = __objRest(_b, [
    "greaterThan",
    "integer",
    "lessThan",
    "max",
    "min",
    "options",
    "negative",
    "positive",
    "precision",
    "validation",
    "options",
    "mock",
    "zod",
    "zodResolved"
  ]);
  const zod5 = !list ? (0, import_fp6.flow)(
    (0, import_fp6.flow)(
      (zod6) => !min ? zod6 : zod6.min(min),
      (zod6) => !max ? zod6 : zod6.max(max),
      (zod6) => !greaterThan ? zod6 : zod6.gt(greaterThan),
      (zod6) => !lessThan ? zod6 : zod6.lt(lessThan),
      (zod6) => !integer ? zod6 : zod6.int(),
      (zod6) => !positive ? zod6 : zod6.nonnegative(),
      (zod6) => !negative ? zod6 : zod6.negative()
    ),
    (zod6) => !precision ? zod6 : zod6.transform(
      (value) => Math.round(value * __pow(10, precision)) / __pow(10, precision)
    ),
    (zod6) => zod6
  )(import_zod13.z.number()) : (0, import_fp6.flow)(
    (value) => value,
    (0, import_fp6.map)((0, import_fp6.flow)(listValueToValue, import_zod13.z.literal)),
    zodUnion
  )(list);
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues({}, def), {
      options,
      type: "number",
      validation: (0, import_fp6.flow)(
        (0, import_fp6.flow)(
          (rule) => !min ? rule : rule.min(min),
          (rule) => !max ? rule : rule.max(max),
          (rule) => !greaterThan ? rule : rule.greaterThan(greaterThan),
          (rule) => !lessThan ? rule : rule.lessThan(lessThan),
          (rule) => !integer ? rule : rule.integer(),
          (rule) => !positive ? rule : rule.positive(),
          (rule) => !negative ? rule : rule.negative()
        ),
        (rule) => !precision ? rule : rule.precision(precision),
        (rule) => {
          var _a2;
          return (_a2 = validation == null ? void 0 : validation(rule)) != null ? _a2 : rule;
        }
      )
    }),
    zod: zodFn(zod5),
    zodResolved: zodResolved == null ? void 0 : zodResolved(zod5)
  });
};

// src/object/index.ts
var import_zod14 = require("zod");
var object = (_a) => {
  var _b = _a, {
    fields,
    preview: previewDef,
    mock = fieldsMock(fields),
    zod: zodFn = (zod5) => zod5,
    zodResolved = (zod5) => zod5
  } = _b, def = __objRest(_b, [
    "fields",
    "preview",
    "mock",
    "zod",
    "zodResolved"
  ]);
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues(__spreadValues({}, def), fieldsSchema(fields, previewDef)), {
      type: "object"
    }),
    zod: zodFn(import_zod14.z.object(fieldsZodObject(fields))),
    zodResolved: zodResolved(
      import_zod14.z.object(fieldsZodResolvedObject(fields))
    )
  });
};

// src/objectNamed/index.ts
var import_zod15 = require("zod");
var objectNamed = (_a) => {
  var _b = _a, {
    name,
    fields,
    preview: previewDef,
    mock = (faker, path = "") => __spreadProps(__spreadValues({}, fieldsMock(fields)(faker, `${path}.${name}`)), {
      _type: name
    }),
    zod: zodFn = (zod5) => zod5,
    zodResolved = (zod5) => zod5
  } = _b, def = __objRest(_b, [
    "name",
    "fields",
    "preview",
    "mock",
    "zod",
    "zodResolved"
  ]);
  const typeDef = {
    mock,
    zod: zodFn(
      import_zod15.z.object(__spreadProps(__spreadValues({}, fieldsZodObject(fields)), {
        _type: import_zod15.z.literal(name)
      }))
    ),
    zodResolved: zodResolved(
      import_zod15.z.object(__spreadProps(__spreadValues({}, fieldsZodResolvedObject(fields)), {
        _type: import_zod15.z.literal(name)
      }))
    )
  };
  const namedType = () => createType(__spreadProps(__spreadValues({}, typeDef), {
    schema: () => ({ type: name })
  }));
  return __spreadProps(__spreadValues({}, createType(__spreadProps(__spreadValues({}, typeDef), {
    schema: () => __spreadProps(__spreadValues(__spreadValues({}, def), fieldsSchema(fields, previewDef)), {
      name,
      type: "object"
    })
  }))), {
    namedType,
    /**
     * @deprecated in upcoming version
     */
    ref: namedType
  });
};

// src/slug/index.ts
var import_zod16 = require("zod");
var zod3 = import_zod16.z.object({
  _type: import_zod16.z.literal("slug"),
  current: import_zod16.z.string()
});
var slug = (_a = {}) => {
  var _b = _a, {
    mock = (faker) => ({
      _type: "slug",
      current: "dadwf/fwefwe"
    }),
    zod: zodFn = (zod5) => zod5.transform(({ current }) => current),
    zodResolved
  } = _b, def = __objRest(_b, [
    "mock",
    "zod",
    "zodResolved"
  ]);
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues({}, def), {
      type: "slug"
    }),
    zod: zodFn(zod3),
    zodResolved: zodResolved == null ? void 0 : zodResolved(zod3)
  });
};

// src/string/index.ts
var import_fp7 = require("lodash/fp");
var import_zod17 = require("zod");
var string = (_a = {}) => {
  var _b = _a, {
    length,
    max,
    min,
    options,
    regex,
    validation,
    options: { list } = {},
    mock = !list ? (faker) => "wefoiwjefow" : listMock(list),
    zod: zodFn = (zod5) => zod5,
    zodResolved
  } = _b, def = __objRest(_b, [
    "length",
    "max",
    "min",
    "options",
    "regex",
    "validation",
    "options",
    "mock",
    "zod",
    "zodResolved"
  ]);
  const zod5 = !list ? (0, import_fp7.flow)(
    (zod6) => !min ? zod6 : zod6.min(min),
    (zod6) => !max ? zod6 : zod6.max(max),
    (zod6) => !length ? zod6 : zod6.length(length),
    (zod6) => !regex ? zod6 : zod6.regex(regex),
    (zod6) => zod6
  )(import_zod17.z.string()) : (0, import_fp7.flow)(
    (value) => value,
    (0, import_fp7.map)((0, import_fp7.flow)(listValueToValue, import_zod17.z.literal)),
    zodUnion
  )(list);
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues({}, def), {
      options,
      type: "string",
      validation: (0, import_fp7.flow)(
        (rule) => !min ? rule : rule.min(min),
        (rule) => !max ? rule : rule.max(max),
        (rule) => !length ? rule : rule.length(length),
        (rule) => !regex ? rule : rule.regex(regex),
        (rule) => {
          var _a2;
          return (_a2 = validation == null ? void 0 : validation(rule)) != null ? _a2 : rule;
        }
      )
    }),
    zod: zodFn(zod5),
    zodResolved: zodResolved == null ? void 0 : zodResolved(zod5)
  });
};

// src/text/index.ts
var import_fp8 = require("lodash/fp");
var import_zod18 = require("zod");
var text = (_a = {}) => {
  var _b = _a, {
    length,
    max,
    min,
    mock = (faker) => "wegiowefiodjwoiefjio",
    regex,
    validation,
    zod: zodFn = (zod5) => zod5,
    zodResolved
  } = _b, def = __objRest(_b, [
    "length",
    "max",
    "min",
    "mock",
    "regex",
    "validation",
    "zod",
    "zodResolved"
  ]);
  const zod5 = (0, import_fp8.flow)(
    (zod6) => !min ? zod6 : zod6.min(min),
    (zod6) => !max ? zod6 : zod6.max(max),
    (zod6) => !length ? zod6 : zod6.length(length),
    (zod6) => !regex ? zod6 : zod6.regex(regex)
  )(import_zod18.z.string());
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues({}, def), {
      type: "text",
      validation: (0, import_fp8.flow)(
        (rule) => !min ? rule : rule.min(min),
        (rule) => !max ? rule : rule.max(max),
        (rule) => !length ? rule : rule.length(length),
        (rule) => !regex ? rule : rule.regex(regex),
        (rule) => {
          var _a2;
          return (_a2 = validation == null ? void 0 : validation(rule)) != null ? _a2 : rule;
        }
      )
    }),
    zod: zodFn(zod5),
    zodResolved: zodResolved == null ? void 0 : zodResolved(zod5)
  });
};

// src/url/index.ts
var import_zod19 = require("zod");
var zod4 = import_zod19.z.string().url();
var url = (_a = {}) => {
  var _b = _a, {
    mock = (faker) => "https://www.google.com",
    zod: zodFn = (zod5) => zod5,
    zodResolved
  } = _b, def = __objRest(_b, [
    "mock",
    "zod",
    "zodResolved"
  ]);
  return createType({
    mock,
    schema: () => __spreadProps(__spreadValues({}, def), {
      type: "url"
    }),
    zod: zodFn(zod4),
    zodResolved: zodResolved == null ? void 0 : zodResolved(zod4)
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  s,
  sharedFields
});
