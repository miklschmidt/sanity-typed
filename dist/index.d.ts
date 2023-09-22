import * as react from 'react';
import * as sanity from 'sanity';
import { RuleDef, InitialValueProperty, ValidationBuilder, FieldDefinition, PreviewConfig, PrepareViewOptions, PreviewValue, SanityDocument as SanityDocument$1, DocumentDefinition, ReferenceValue, WeakReference, ImageCrop, ImageHotspot, ArrayRule, IntrinsicDefinitions, TypeAliasDefinition, GeopointValue, SlugValue } from 'sanity';
import { z } from 'zod';
import { PortableTextMarkDefinition, TypedObject, ArbitraryTypedObject, PortableTextSpan, PortableTextBlockStyle, PortableTextListItemType, PortableTextBlock } from '@portabletext/types';
import { Merge, RemoveIndexSignature } from 'type-fest';

type TupleOfLength<T, Min extends number = number, Max extends number = number, Result extends T[] = []> = Result["length"] extends Min ? number extends Max ? [...Result, ...T[]] : Result["length"] extends Max ? Result : Result | TupleOfLength<T, [
    T,
    ...Result
]["length"] & number, Max, [
    T,
    ...Result
]> : TupleOfLength<T, Min, Max, [T, ...Result]>;
type SanityType<Definition, Value, ParsedValue, ResolvedValue> = {
    mock: (faker: null, path?: string) => Value;
    parse: (data: unknown) => ParsedValue;
    resolve: (data: unknown) => ResolvedValue;
    schema: () => Definition;
    zod: z.ZodType<ParsedValue, any, Value>;
    zodResolved: z.ZodType<ResolvedValue, any, Value>;
};
type InferValue<T extends SanityType<any, any, any, any>> = T extends SanityType<any, infer Value, any, any> ? Value : never;
type InferParsedValue<T extends SanityType<any, any, any, any>> = T extends SanityType<any, any, infer ParsedValue, any> ? ParsedValue : never;
type InferResolvedValue<T extends SanityType<any, any, any, any>> = T extends SanityType<any, any, any, infer ResolvedValue> ? ResolvedValue : never;
declare const createType: <Definition, Value, ParsedValue, ResolvedValue>({ mock, zod, zodResolved, parse, resolve, ...def }: {
    schema: () => Definition;
    zod: z.ZodType<ParsedValue, any, Value>;
    parse?: ((data: unknown) => ParsedValue) | undefined;
    resolve?: ((data: unknown) => ResolvedValue) | undefined;
    zodResolved?: z.ZodType<ResolvedValue, any, Value> | undefined;
    mock: (faker: null, path: string) => Value;
}) => SanityType<Definition, Value, ParsedValue, ResolvedValue>;
type TypedValueRule<Value> = RuleDef<TypedValueRule<Value>, Value>;
type TypedValues<Value, Rule extends RuleDef<Rule, any> = TypedValueRule<Value>> = {
    initialValue?: InitialValueProperty<any, Value>;
    validation?: ValidationBuilder<Rule, Value>;
};
type NamedSchemaFields = "description" | "name" | "title";

type SanityBlock<M extends PortableTextMarkDefinition = PortableTextMarkDefinition, C extends TypedObject = ArbitraryTypedObject | PortableTextSpan, S extends string = PortableTextBlockStyle, L extends string = PortableTextListItemType> = PortableTextBlock<M, C, S, L>;
declare const block: <M extends PortableTextMarkDefinition = PortableTextMarkDefinition, C extends TypedObject = ArbitraryTypedObject | PortableTextSpan, S extends string = string, L extends string = string, ParsedValue = SanityBlock<M, C, S, L>, ResolvedValue = SanityBlock<M, C, S, L>>({ mock, zod: zodFn, zodResolved, ...def }?: {
    options?: sanity.BlockOptions | undefined;
    validation?: sanity.ValidationBuilder<TypedValueRule<SanityBlock<M, C, S, L>>, SanityBlock<M, C, S, L>> | undefined;
    styles?: sanity.BlockStyleDefinition[] | undefined;
    lists?: sanity.BlockListDefinition[] | undefined;
    marks?: sanity.BlockMarksDefinition | undefined;
    of?: sanity.ArrayOfType<"object" | "reference", undefined>[] | undefined;
    initialValue?: sanity.InitialValueProperty<any, SanityBlock<M, C, S, L>>;
    components?: {
        block?: react.ComponentType<sanity.BlockProps> | undefined;
    } | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    mock?: ((faker: null, path: string) => SanityBlock<M, C, S, L>) | undefined;
    zod?: ((zod: z.ZodType<SanityBlock<M, C, S, L>, any, SanityBlock<M, C, S, L>>) => z.ZodType<ParsedValue, any, SanityBlock<M, C, S, L>>) | undefined;
    zodResolved?: ((zod: z.ZodType<SanityBlock<M, C, S, L>, any, SanityBlock<M, C, S, L>>) => z.ZodType<ResolvedValue, any, SanityBlock<M, C, S, L>>) | undefined;
}) => SanityType<{
    type: string;
    options?: sanity.BlockOptions | undefined;
    validation?: sanity.ValidationBuilder<TypedValueRule<SanityBlock<M, C, S, L>>, SanityBlock<M, C, S, L>> | undefined;
    styles?: sanity.BlockStyleDefinition[] | undefined;
    lists?: sanity.BlockListDefinition[] | undefined;
    marks?: sanity.BlockMarksDefinition | undefined;
    of?: sanity.ArrayOfType<"object" | "reference", undefined>[] | undefined;
    initialValue?: sanity.InitialValueProperty<any, SanityBlock<M, C, S, L>>;
    components?: {
        block?: react.ComponentType<sanity.BlockProps> | undefined;
    } | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
}, SanityBlock<M, C, S, L>, ParsedValue, ResolvedValue>;

type FieldOptions<Name extends string, Zod extends z.ZodTypeAny, ResolvedValue, Optional extends boolean> = Pick<FieldDefinition, "description" | "fieldset" | "group" | "title"> & {
    name: Name;
    optional?: Optional;
    type: SanityType<Omit<FieldDefinition<any>, NamedSchemaFields>, z.input<Zod>, z.output<Zod>, ResolvedValue>;
};
type ZodOptional<T extends z.ZodTypeAny, Optional extends boolean> = Optional extends true ? z.ZodOptional<T> : T;
type FieldsZodObject<FieldsArray extends TupleOfLength<FieldOptions<any, z.ZodTypeAny, any, any>, 1>> = {
    [Name in FieldsArray[number]["name"]]: ZodOptional<Extract<FieldsArray[number], {
        name: Name;
    }>["type"]["zod"], Extract<FieldsArray[number], {
        name: Name;
    }>["optional"]>;
};
type FieldsZodResolvedObject<FieldsArray extends TupleOfLength<FieldOptions<any, z.ZodTypeAny, any, any>, 1>> = {
    [Name in FieldsArray[number]["name"]]: ZodOptional<z.ZodType<InferResolvedValue<Extract<FieldsArray[number], {
        name: Name;
    }>["type"]>, any, InferValue<Extract<FieldsArray[number], {
        name: Name;
    }>["type"]>>, Extract<FieldsArray[number], {
        name: Name;
    }>["optional"]>;
};
type Preview<Value extends {
    [key: string]: unknown;
}, Select extends NonNullable<PreviewConfig["select"]>> = {
    prepare: (object: Merge<Value, {
        [field in keyof Select]: unknown;
    }>, viewOptions?: PrepareViewOptions) => PreviewValue;
    select?: Select;
} | {
    select: PreviewValue;
};
declare const sharedFields: <Names extends string, Zods extends z.ZodTypeAny, ResolvedValues, Optionals extends boolean, FieldsArray extends [FieldOptions<Names, Zods, ResolvedValues, Optionals>, ...FieldOptions<Names, Zods, ResolvedValues, Optionals>[]]>(fields: FieldsArray) => FieldsArray;

type SanityDocumentDefinition<Value> = Merge<DocumentDefinition, TypedValues<Value>>;
type DocumentType<DocumentName extends string, Value, ParsedValue, ResolvedValue> = SanityType<Merge<SanityDocumentDefinition<Value>, {
    name: DocumentName;
}>, Value, ParsedValue, ResolvedValue> & {
    getMockById: (id: string) => Value | undefined;
    getNthMock: (faker: null, n: number) => Value;
    name: DocumentName;
};
type SanityDocument<DocumentName extends string = string> = Merge<RemoveIndexSignature<SanityDocument$1>, {
    _type: DocumentName;
}>;
type ParsedSanityDocument<DocumentName extends string = string> = Merge<SanityDocument<DocumentName>, {
    _createdAt: Date;
    _updatedAt: Date;
}>;
type ExtraZodFields$2<DocumentName extends string> = {
    _createdAt: z.ZodType<Date, any, string>;
    _id: z.ZodString;
    _rev: z.ZodString;
    _type: z.ZodLiteral<DocumentName>;
    _updatedAt: z.ZodType<Date, any, string>;
};
declare const document: <DocumentName extends string, Names extends string, Zods extends z.ZodTypeAny, ResolvedValues, Optionals extends boolean, FieldsArray extends [FieldOptions<Names, Zods, ResolvedValues, Optionals>, ...FieldOptions<Names, Zods, ResolvedValues, Optionals>[]], Zod extends z.ZodObject<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$2<DocumentName>>, z.UnknownKeysParam, z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$2<DocumentName>>>, (z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$2<DocumentName>>> extends infer T_1 extends object ? { [k_1 in keyof T_1]: undefined extends z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$2<DocumentName>>>[k_1] ? never : k_1; } : never)[keyof Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$2<DocumentName>>]> extends infer T ? { [k in keyof T]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$2<DocumentName>>>, (z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$2<DocumentName>>> extends infer T_1 extends object ? { [k_1 in keyof T_1]: undefined extends z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$2<DocumentName>>>[k_1] ? never : k_1; } : never)[keyof Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$2<DocumentName>>]>[k]; } : never, z.baseObjectInputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$2<DocumentName>>> extends infer T_2 ? { [k_2 in keyof T_2]: z.baseObjectInputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$2<DocumentName>>>[k_2]; } : never>, ZodResolved extends z.ZodObject<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$2<DocumentName>>, z.UnknownKeysParam, z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$2<DocumentName>>>, (z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$2<DocumentName>>> extends infer T_4 extends object ? { [k_4 in keyof T_4]: undefined extends z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$2<DocumentName>>>[k_4] ? never : k_4; } : never)[keyof Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$2<DocumentName>>]> extends infer T_3 ? { [k_3 in keyof T_3]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$2<DocumentName>>>, (z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$2<DocumentName>>> extends infer T_4 extends object ? { [k_4 in keyof T_4]: undefined extends z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$2<DocumentName>>>[k_4] ? never : k_4; } : never)[keyof Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$2<DocumentName>>]>[k_3]; } : never, z.baseObjectInputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$2<DocumentName>>> extends infer T_5 ? { [k_5 in keyof T_5]: z.baseObjectInputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$2<DocumentName>>>[k_5]; } : never>, ParsedValue = z.output<Zod>, ResolvedValue = z.output<ZodResolved>, Select extends {
    [key: string]: string;
} = {}>({ name, fields, preview: previewDef, mock, zod: zodFn, zodResolved, ...def }: {
    description?: string | react.ReactElement<any, string | react.JSXElementConstructor<any>> | undefined;
    title?: string | undefined;
    options?: sanity.DocumentOptions | undefined;
    validation?: sanity.ValidationBuilder<TypedValueRule<z.input<Zod>>, z.input<Zod>> | undefined;
    initialValue?: sanity.InitialValueProperty<any, z.input<Zod>>;
    components?: sanity.DocumentComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    groups?: sanity.FieldGroupDefinition[] | undefined;
    fieldsets?: sanity.FieldsetDefinition[] | undefined;
    liveEdit?: boolean | undefined;
    orderings?: sanity.SortOrdering[] | undefined;
    __experimental_search?: {
        path: string;
        weight: number;
        mapWith?: string | undefined;
    }[] | undefined;
    __experimental_omnisearch_visibility?: boolean | undefined;
    mock?: ((faker: null, path: string) => z.input<Zod>) | undefined;
    zod?: ((zod: z.ZodType<z.output<Zod>, any, z.input<Zod>>) => z.ZodType<ParsedValue, any, z.input<Zod>>) | undefined;
    zodResolved?: ((zod: z.ZodType<z.output<ZodResolved>, any, z.input<Zod>>) => z.ZodType<ResolvedValue, any, z.input<Zod>>) | undefined;
    fields: FieldsArray;
    name: DocumentName;
    preview?: Preview<z.input<Zod>, Select> | undefined;
}) => DocumentType<DocumentName, z.input<Zod>, ParsedValue, ResolvedValue>;

type SanityReference<Weak extends boolean = false> = Omit<Weak extends false ? Omit<ReferenceValue, "_weak"> : WeakReference, "_type"> & {
    _type: "reference";
};
declare const referenceZod: <Weak extends boolean>(weak: Weak | undefined) => z.ZodType<SanityReference<Weak>, any, SanityReference<Weak>>;
declare const reference: <DocumentName extends string, ResolvedDocumentValue, DocumentTypes extends [DocumentType<DocumentName, any, any, ResolvedDocumentValue>, ...DocumentType<DocumentName, any, any, ResolvedDocumentValue>[]], Weak extends boolean = false, ParsedValue = SanityReference<Weak>, ResolvedValue = InferResolvedValue<DocumentTypes[number]> | (Weak extends false ? never : null)>({ weak, to: documents, zod: zodFn, zodResolved, ...defRaw }: {
    options?: sanity.ReferenceOptions | undefined;
    validation?: sanity.ValidationBuilder<TypedValueRule<SanityReference<Weak>>, SanityReference<Weak>> | undefined;
    initialValue?: sanity.InitialValueProperty<any, SanityReference<Weak>>;
    components?: sanity.ReferenceComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    mock?: ((faker: null, path: string) => SanityReference<Weak>) | undefined;
    zod?: ((zod: z.ZodType<SanityReference<Weak>, any, SanityReference<Weak>>) => z.ZodType<ParsedValue, any, SanityReference<Weak>>) | undefined;
    zodResolved?: ((zod: z.ZodType<SanityReference<Weak>, any, SanityReference<Weak>>) => z.ZodType<ResolvedValue, any, SanityReference<Weak>>) | undefined;
    to: DocumentTypes;
    weak?: Weak | undefined;
}) => SanityType<{
    weak: Weak | undefined;
    type: string;
    to: {
        type: DocumentName;
    }[];
    options?: sanity.ReferenceOptions | undefined;
    validation?: sanity.ValidationBuilder<TypedValueRule<SanityReference<Weak>>, SanityReference<Weak>> | undefined;
    initialValue?: sanity.InitialValueProperty<any, SanityReference<Weak>>;
    components?: sanity.ReferenceComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
}, SanityReference<Weak>, ParsedValue, ResolvedValue>;

type SanityFile = {
    _type: "file";
    asset: SanityReference;
};
declare const file: <Names extends string, Zods extends z.ZodTypeAny, ResolvedValues, Optionals extends boolean, Zod extends z.ZodObject<Merge<FieldsZodObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>, z.UnknownKeysParam, z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>>, (z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>> extends infer T_1 extends object ? { [k_1 in keyof T_1]: undefined extends z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>>[k_1] ? never : k_1; } : never)[keyof Merge<FieldsZodObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>]> extends infer T ? { [k in keyof T]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>>, (z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>> extends infer T_1 extends object ? { [k_1 in keyof T_1]: undefined extends z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>>[k_1] ? never : k_1; } : never)[keyof Merge<FieldsZodObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>]>[k]; } : never, z.baseObjectInputType<Merge<FieldsZodObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>> extends infer T_2 ? { [k_2 in keyof T_2]: z.baseObjectInputType<Merge<FieldsZodObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>>[k_2]; } : never>, ZodResolved extends z.ZodObject<Merge<FieldsZodResolvedObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>, z.UnknownKeysParam, z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>>, (z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>> extends infer T_4 extends object ? { [k_4 in keyof T_4]: undefined extends z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>>[k_4] ? never : k_4; } : never)[keyof Merge<FieldsZodResolvedObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>]> extends infer T_3 ? { [k_3 in keyof T_3]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>>, (z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>> extends infer T_4 extends object ? { [k_4 in keyof T_4]: undefined extends z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>>[k_4] ? never : k_4; } : never)[keyof Merge<FieldsZodResolvedObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>]>[k_3]; } : never, z.baseObjectInputType<Merge<FieldsZodResolvedObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>> extends infer T_5 ? { [k_5 in keyof T_5]: z.baseObjectInputType<Merge<FieldsZodResolvedObject<FieldsArray>, {
    _type: z.ZodLiteral<"file">;
    asset: z.ZodType<SanityReference<false>, any, SanityReference<false>>;
}>>[k_5]; } : never>, FieldsArray extends [FieldOptions<Names, Zods, ResolvedValues, Optionals>, ...FieldOptions<Names, Zods, ResolvedValues, Optionals>[]] = never, ParsedValue = z.output<Zod>, ResolvedValue = z.output<ZodResolved>>({ fields, mock, zod: zodFn, zodResolved, ...def }?: {
    options?: sanity.FileOptions | undefined;
    validation?: sanity.ValidationBuilder<TypedValueRule<z.input<Zod>>, z.input<Zod>> | undefined;
    initialValue?: sanity.InitialValueProperty<any, z.input<Zod>>;
    components?: sanity.FileComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    fieldsets?: sanity.FieldsetDefinition[] | undefined;
    preview?: sanity.PreviewConfig<Record<string, string>, Record<string, any>> | undefined;
    mock?: ((faker: null, path: string) => z.input<Zod>) | undefined;
    zod?: ((zod: z.ZodType<z.output<Zod>, any, z.input<Zod>>) => z.ZodType<ParsedValue, any, z.input<Zod>>) | undefined;
    zodResolved?: ((zod: z.ZodType<z.output<ZodResolved>, any, z.input<Zod>>) => z.ZodType<ResolvedValue, any, z.input<Zod>>) | undefined;
    fields?: FieldsArray | undefined;
}) => SanityType<{
    type: string;
    fields?: {
        name: string;
        validation: (rule: any) => any;
        description?: string | react.ReactElement<any, string | react.JSXElementConstructor<any>> | undefined;
        title?: string | undefined;
        fieldset?: string | undefined;
        group?: string | string[] | undefined;
    }[] | undefined;
    preview?: sanity.PreviewConfig<Record<string, string>, Record<string, any>> | undefined;
    options?: sanity.FileOptions | undefined;
    validation?: sanity.ValidationBuilder<TypedValueRule<z.input<Zod>>, z.input<Zod>> | undefined;
    initialValue?: sanity.InitialValueProperty<any, z.input<Zod>>;
    components?: sanity.FileComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    fieldsets?: sanity.FieldsetDefinition[] | undefined;
}, z.input<Zod>, ParsedValue, ResolvedValue>;

type SanityImage<Hotspot extends boolean> = Hotspot extends false ? {
    _type: "image";
    asset: SanityReference;
} : {
    _type: "image";
    asset: SanityReference;
    crop?: ImageCrop;
    hotspot?: ImageHotspot;
};
type ExtraZodFields$1<Hotspot extends boolean> = Hotspot extends false ? {
    _type: z.ZodLiteral<"image">;
    asset: ReturnType<typeof referenceZod<false>>;
} : {
    _type: z.ZodLiteral<"image">;
    asset: ReturnType<typeof referenceZod<false>>;
    crop: z.ZodOptional<z.ZodObject<{
        _type: z.ZodOptional<z.ZodLiteral<"sanity.imageCrop">>;
        bottom: z.ZodNumber;
        left: z.ZodNumber;
        right: z.ZodNumber;
        top: z.ZodNumber;
    }>>;
    hotspot: z.ZodOptional<z.ZodObject<{
        _type: z.ZodOptional<z.ZodLiteral<"sanity.imageHotspot">>;
        height: z.ZodNumber;
        width: z.ZodNumber;
        x: z.ZodNumber;
        y: z.ZodNumber;
    }>>;
};
declare const image: <Names extends string, Zods extends z.ZodTypeAny, ResolvedValues, Optionals extends boolean, Zod extends z.ZodObject<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$1<Hotspot>>, z.UnknownKeysParam, z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$1<Hotspot>>>, (z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$1<Hotspot>>> extends infer T_1 extends object ? { [k_1 in keyof T_1]: undefined extends z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$1<Hotspot>>>[k_1] ? never : k_1; } : never)[keyof Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$1<Hotspot>>]> extends infer T ? { [k in keyof T]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$1<Hotspot>>>, (z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$1<Hotspot>>> extends infer T_1 extends object ? { [k_1 in keyof T_1]: undefined extends z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$1<Hotspot>>>[k_1] ? never : k_1; } : never)[keyof Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$1<Hotspot>>]>[k]; } : never, z.baseObjectInputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$1<Hotspot>>> extends infer T_2 ? { [k_2 in keyof T_2]: z.baseObjectInputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields$1<Hotspot>>>[k_2]; } : never>, ZodResolved extends z.ZodObject<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$1<Hotspot>>, z.UnknownKeysParam, z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$1<Hotspot>>>, (z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$1<Hotspot>>> extends infer T_4 extends object ? { [k_4 in keyof T_4]: undefined extends z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$1<Hotspot>>>[k_4] ? never : k_4; } : never)[keyof Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$1<Hotspot>>]> extends infer T_3 ? { [k_3 in keyof T_3]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$1<Hotspot>>>, (z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$1<Hotspot>>> extends infer T_4 extends object ? { [k_4 in keyof T_4]: undefined extends z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$1<Hotspot>>>[k_4] ? never : k_4; } : never)[keyof Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$1<Hotspot>>]>[k_3]; } : never, z.baseObjectInputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$1<Hotspot>>> extends infer T_5 ? { [k_5 in keyof T_5]: z.baseObjectInputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields$1<Hotspot>>>[k_5]; } : never>, FieldsArray extends [FieldOptions<Names, Zods, ResolvedValues, Optionals>, ...FieldOptions<Names, Zods, ResolvedValues, Optionals>[]] = never, Hotspot extends boolean = false, ParsedValue = z.output<Zod>, ResolvedValue = z.output<ZodResolved>>({ hotspot, fields, mock, zod: zodFn, zodResolved, options, ...def }?: {
    zodResolved?: ((zod: z.ZodType<z.output<ZodResolved>, any, z.input<Zod>>) => z.ZodType<ResolvedValue, any, z.input<Zod>>) | undefined;
    mock?: ((faker: null, path: string) => z.input<Zod>) | undefined;
    zod?: ((zod: z.ZodType<z.output<Zod>, any, z.input<Zod>>) => z.ZodType<ParsedValue, any, z.input<Zod>>) | undefined;
    description?: string | react.ReactElement<any, string | react.JSXElementConstructor<any>> | undefined;
    title?: string | undefined;
    options?: sanity.ImageOptions | undefined;
    validation?: sanity.ValidationBuilder<TypedValueRule<z.input<Zod>>, z.input<Zod>> | undefined;
    initialValue?: sanity.InitialValueProperty<any, z.input<Zod>>;
    components?: sanity.ImageComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    fieldsets?: sanity.FieldsetDefinition[] | undefined;
    fields?: FieldsArray | undefined;
    hotspot?: Hotspot | undefined;
}) => SanityType<{
    options: {
        hotspot: boolean;
        metadata?: sanity.ImageMetadataType[] | undefined;
        storeOriginalFilename?: boolean | undefined;
        accept?: string | undefined;
        sources?: sanity.AssetSource[] | undefined;
        collapsible?: boolean | undefined;
        collapsed?: boolean | undefined;
        columns?: number | undefined;
        modal?: {
            type?: "dialog" | "popover" | undefined;
            width?: number | number[] | "auto" | undefined;
        } | undefined;
    };
    type: string;
    fields?: {
        name: string;
        validation: (rule: any) => any;
        description?: string | react.ReactElement<any, string | react.JSXElementConstructor<any>> | undefined;
        title?: string | undefined;
        fieldset?: string | undefined;
        group?: string | string[] | undefined;
    }[] | undefined;
    preview?: sanity.PreviewConfig<Record<string, string>, Record<string, any>> | undefined;
    description?: string | react.ReactElement<any, string | react.JSXElementConstructor<any>> | undefined;
    title?: string | undefined;
    validation?: sanity.ValidationBuilder<TypedValueRule<z.input<Zod>>, z.input<Zod>> | undefined;
    initialValue?: sanity.InitialValueProperty<any, z.input<Zod>>;
    components?: sanity.ImageComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    fieldsets?: sanity.FieldsetDefinition[] | undefined;
}, z.input<Zod>, ParsedValue, ResolvedValue>;

type AddKey<T> = T extends object ? Merge<T, {
    _key: string;
}> : T;
type Precedence<A extends number, B extends number> = number extends A ? B : A;
type ItemDefinitions = Omit<IntrinsicDefinitions[keyof IntrinsicDefinitions] | TypeAliasDefinition<string, undefined>, NamedSchemaFields>;
declare const array: <ItemValue, ParsedItemValue, ResolvedItemValue, ItemsArray extends [SanityType<ItemDefinitions, ItemValue, ParsedItemValue, ResolvedItemValue>, ...SanityType<ItemDefinitions, ItemValue, ParsedItemValue, ResolvedItemValue>[]], Length extends number, Min extends number, Max extends number, Value extends TupleOfLength<AddKey<InferValue<ItemsArray[number]>>, Precedence<Length, Min>, Precedence<Length, Max>>, ParsedValue = TupleOfLength<AddKey<InferParsedValue<ItemsArray[number]>>, Precedence<Length, Min>, Precedence<Length, Max>>, ResolvedValue = TupleOfLength<AddKey<InferResolvedValue<ItemsArray[number]>>, Precedence<Length, Min>, Precedence<Length, Max>>>({ length, max, min, validation, of: items, mock, zod: zodFn, zodResolved, ...def }: {
    options?: sanity.ArrayOptions<unknown> | undefined;
    validation?: sanity.ValidationBuilder<ArrayRule<Value>, Value> | undefined;
    initialValue?: sanity.InitialValueProperty<any, Value>;
    components?: sanity.ArrayOfObjectsComponents | sanity.ArrayOfPrimitivesComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    mock?: ((faker: null, path: string) => Value) | undefined;
    zod?: ((zod: z.ZodType<TupleOfLength<AddKey<InferParsedValue<ItemsArray[number]>>, Precedence<Length, Min>, Precedence<Length, Max>>, any, Value>) => z.ZodType<ParsedValue, any, Value>) | undefined;
    zodResolved?: ((zod: z.ZodType<TupleOfLength<AddKey<InferResolvedValue<ItemsArray[number]>>, Precedence<Length, Min>, Precedence<Length, Max>>, any, Value>) => z.ZodType<ResolvedValue, any, Value>) | undefined;
    length?: Length | undefined;
    max?: Max | undefined;
    min?: Min | undefined;
    of: ItemsArray;
}) => SanityType<{
    type: string;
    of: ItemDefinitions[];
    validation: (rule: ArrayRule<Value>) => sanity.RuleBuilder<ArrayRule<Value>, Value>;
    options?: sanity.ArrayOptions<unknown> | undefined;
    initialValue?: sanity.InitialValueProperty<any, Value>;
    components?: sanity.ArrayOfObjectsComponents | sanity.ArrayOfPrimitivesComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
}, Value, ParsedValue, ResolvedValue>;

declare const boolean: <ParsedValue = boolean, ResolvedValue = boolean>({ mock, zod: zodFn, zodResolved, ...def }?: {
    options?: sanity.BooleanOptions | undefined;
    validation?: sanity.ValidationBuilder<sanity.BooleanRule, boolean> | undefined;
    initialValue?: sanity.InitialValueProperty<any, boolean>;
    components?: sanity.BooleanComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    mock?: ((faker: null, path: string) => boolean) | undefined;
    zod?: ((zod: z.ZodType<boolean, any, boolean>) => z.ZodType<ParsedValue, any, boolean>) | undefined;
    zodResolved?: ((zod: z.ZodType<boolean, any, boolean>) => z.ZodType<ResolvedValue, any, boolean>) | undefined;
}) => SanityType<{
    type: string;
    options?: sanity.BooleanOptions | undefined;
    validation?: sanity.ValidationBuilder<sanity.BooleanRule, boolean> | undefined;
    initialValue?: sanity.InitialValueProperty<any, boolean>;
    components?: sanity.BooleanComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
}, boolean, ParsedValue, ResolvedValue>;

declare const date: <ParsedValue = string, ResolvedValue = string>({ mock, zod: zodFn, zodResolved, ...def }?: {
    options?: sanity.DateOptions | undefined;
    validation?: sanity.ValidationBuilder<sanity.DateRule, string> | undefined;
    initialValue?: sanity.InitialValueProperty<any, string>;
    components?: sanity.DateComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    placeholder?: string | undefined;
    mock?: ((faker: null, path: string) => string) | undefined;
    zod?: ((zod: z.ZodType<string, any, string>) => z.ZodType<ParsedValue, any, string>) | undefined;
    zodResolved?: ((zod: z.ZodType<string, any, string>) => z.ZodType<ResolvedValue, any, string>) | undefined;
}) => SanityType<{
    type: string;
    options?: sanity.DateOptions | undefined;
    validation?: sanity.ValidationBuilder<sanity.DateRule, string> | undefined;
    initialValue?: sanity.InitialValueProperty<any, string>;
    components?: sanity.DateComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    placeholder?: string | undefined;
}, string, ParsedValue, ResolvedValue>;

declare const datetime: <ParsedValue = Date, ResolvedValue = Date>({ max, min, validation, mock, zod: zodFn, zodResolved, ...def }?: {
    options?: sanity.DatetimeOptions | undefined;
    validation?: sanity.ValidationBuilder<sanity.DatetimeRule, string> | undefined;
    initialValue?: sanity.InitialValueProperty<any, string>;
    components?: sanity.DatetimeComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    placeholder?: string | undefined;
    mock?: ((faker: null, path: string) => string) | undefined;
    zod?: ((zod: z.ZodType<string, any, string>) => z.ZodType<ParsedValue, any, string>) | undefined;
    zodResolved?: ((zod: z.ZodType<string, any, string>) => z.ZodType<ResolvedValue, any, string>) | undefined;
} & {
    max?: string | undefined;
    min?: string | undefined;
}) => SanityType<{
    type: string;
    validation: (rule: sanity.DatetimeRule) => sanity.RuleBuilder<sanity.DatetimeRule, string>;
    options?: sanity.DatetimeOptions | undefined;
    initialValue?: sanity.InitialValueProperty<any, string>;
    components?: sanity.DatetimeComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    placeholder?: string | undefined;
}, string, ParsedValue, ResolvedValue>;

declare const geopoint: <ParsedValue = GeopointValue, ResolvedValue = GeopointValue>({ mock, zod: zodFn, zodResolved, ...def }?: {
    options?: sanity.GeopointOptions | undefined;
    validation?: sanity.ValidationBuilder<sanity.GeopointRule, GeopointValue> | undefined;
    initialValue?: sanity.InitialValueProperty<any, Omit<GeopointValue, "_type">>;
    components?: sanity.GeopointComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    mock?: ((faker: null, path: string) => GeopointValue) | undefined;
    zod?: ((zod: z.ZodType<GeopointValue, any, GeopointValue>) => z.ZodType<ParsedValue, any, GeopointValue>) | undefined;
    zodResolved?: ((zod: z.ZodType<GeopointValue, any, GeopointValue>) => z.ZodType<ResolvedValue, any, GeopointValue>) | undefined;
}) => SanityType<{
    type: string;
    options?: sanity.GeopointOptions | undefined;
    validation?: sanity.ValidationBuilder<sanity.GeopointRule, GeopointValue> | undefined;
    initialValue?: sanity.InitialValueProperty<any, Omit<GeopointValue, "_type">>;
    components?: sanity.GeopointComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
}, GeopointValue, ParsedValue, ResolvedValue>;

declare const number: <TypedValue extends number, ParsedValue = TypedValue, ResolvedValue = TypedValue>({ greaterThan, integer, lessThan, max, min, options, negative, positive, precision, validation, options: { list }, mock, zod: zodFn, zodResolved, ...def }?: {
    options?: (Omit<sanity.NumberOptions | undefined, "list"> & {
        list?: [TypedValue | {
            title: string;
            value: TypedValue;
        }, ...(TypedValue | {
            title: string;
            value: TypedValue;
        })[]] | undefined;
    }) | undefined;
    validation?: sanity.ValidationBuilder<sanity.NumberRule, number> | undefined;
    initialValue?: sanity.InitialValueProperty<any, number>;
    components?: sanity.NumberComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    placeholder?: string | undefined;
    mock?: ((faker: null, path: string) => TypedValue) | undefined;
    zod?: ((zod: z.ZodType<TypedValue, any, TypedValue>) => z.ZodType<ParsedValue, any, TypedValue>) | undefined;
    zodResolved?: ((zod: z.ZodType<TypedValue, any, TypedValue>) => z.ZodType<ResolvedValue, any, TypedValue>) | undefined;
} & {
    greaterThan?: number | undefined;
    integer?: boolean | undefined;
    lessThan?: number | undefined;
    max?: number | undefined;
    min?: number | undefined;
    negative?: boolean | undefined;
    positive?: boolean | undefined;
    precision?: number | undefined;
}) => SanityType<{
    options: (Omit<sanity.NumberOptions | undefined, "list"> & {
        list?: [TypedValue | {
            title: string;
            value: TypedValue;
        }, ...(TypedValue | {
            title: string;
            value: TypedValue;
        })[]] | undefined;
    }) | undefined;
    type: string;
    validation: (rule: sanity.NumberRule) => sanity.RuleBuilder<sanity.NumberRule, number>;
    initialValue?: sanity.InitialValueProperty<any, number>;
    components?: sanity.NumberComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    placeholder?: string | undefined;
}, TypedValue, ParsedValue, ResolvedValue>;

declare const object: <Names extends string, Zods extends z.ZodTypeAny, ResolvedValues, Optionals extends boolean, FieldsArray extends [FieldOptions<Names, Zods, ResolvedValues, Optionals>, ...FieldOptions<Names, Zods, ResolvedValues, Optionals>[]], Zod extends z.ZodObject<FieldsZodObject<FieldsArray>, z.UnknownKeysParam, z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<FieldsZodObject<FieldsArray>>, (z.baseObjectOutputType<FieldsZodObject<FieldsArray>> extends infer T_1 extends object ? { [k_1 in keyof T_1]: undefined extends z.baseObjectOutputType<FieldsZodObject<FieldsArray>>[k_1] ? never : k_1; } : never)[FieldsArray[number]["name"]]> extends infer T ? { [k in keyof T]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<FieldsZodObject<FieldsArray>>, (z.baseObjectOutputType<FieldsZodObject<FieldsArray>> extends infer T_1 extends object ? { [k_1 in keyof T_1]: undefined extends z.baseObjectOutputType<FieldsZodObject<FieldsArray>>[k_1] ? never : k_1; } : never)[FieldsArray[number]["name"]]>[k]; } : never, z.baseObjectInputType<FieldsZodObject<FieldsArray>> extends infer T_2 ? { [k_2 in keyof T_2]: z.baseObjectInputType<FieldsZodObject<FieldsArray>>[k_2]; } : never>, ZodResolved extends z.ZodObject<FieldsZodResolvedObject<FieldsArray>, z.UnknownKeysParam, z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<FieldsZodResolvedObject<FieldsArray>>, (z.baseObjectOutputType<FieldsZodResolvedObject<FieldsArray>> extends infer T_4 extends object ? { [k_4 in keyof T_4]: undefined extends z.baseObjectOutputType<FieldsZodResolvedObject<FieldsArray>>[k_4] ? never : k_4; } : never)[FieldsArray[number]["name"]]> extends infer T_3 ? { [k_3 in keyof T_3]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<FieldsZodResolvedObject<FieldsArray>>, (z.baseObjectOutputType<FieldsZodResolvedObject<FieldsArray>> extends infer T_4 extends object ? { [k_4 in keyof T_4]: undefined extends z.baseObjectOutputType<FieldsZodResolvedObject<FieldsArray>>[k_4] ? never : k_4; } : never)[FieldsArray[number]["name"]]>[k_3]; } : never, z.baseObjectInputType<FieldsZodResolvedObject<FieldsArray>> extends infer T_5 ? { [k_5 in keyof T_5]: z.baseObjectInputType<FieldsZodResolvedObject<FieldsArray>>[k_5]; } : never>, ParsedValue = z.output<Zod>, ResolvedValue = z.output<ZodResolved>, Select extends {
    [key: string]: string;
} = {}>({ fields, preview: previewDef, mock, zod: zodFn, zodResolved, ...def }: {
    options?: sanity.ObjectOptions | undefined;
    validation?: sanity.ValidationBuilder<TypedValueRule<z.input<Zod>>, z.input<Zod>> | undefined;
    initialValue?: sanity.InitialValueProperty<any, z.input<Zod>>;
    components?: sanity.ObjectComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    groups?: sanity.FieldGroupDefinition[] | undefined;
    fieldsets?: sanity.FieldsetDefinition[] | undefined;
    mock?: ((faker: null, path: string) => z.input<Zod>) | undefined;
    zod?: ((zod: z.ZodType<z.output<Zod>, any, z.input<Zod>>) => z.ZodType<ParsedValue, any, z.input<Zod>>) | undefined;
    zodResolved?: ((zod: z.ZodType<z.output<ZodResolved>, any, z.input<Zod>>) => z.ZodType<ResolvedValue, any, z.input<Zod>>) | undefined;
    fields: FieldsArray;
    preview?: Preview<z.input<Zod>, Select> | undefined;
}) => SanityType<{
    type: string;
    fields: {
        name: string;
        validation: (rule: any) => any;
        description?: string | react.ReactElement<any, string | react.JSXElementConstructor<any>> | undefined;
        title?: string | undefined;
        fieldset?: string | undefined;
        group?: string | string[] | undefined;
    }[];
    preview: sanity.PreviewConfig<Record<string, string>, Record<string, any>> | undefined;
    options?: sanity.ObjectOptions | undefined;
    validation?: sanity.ValidationBuilder<TypedValueRule<z.input<Zod>>, z.input<Zod>> | undefined;
    initialValue?: sanity.InitialValueProperty<any, z.input<Zod>>;
    components?: sanity.ObjectComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    groups?: sanity.FieldGroupDefinition[] | undefined;
    fieldsets?: sanity.FieldsetDefinition[] | undefined;
}, z.input<Zod>, ParsedValue, ResolvedValue>;

type ExtraZodFields<ObjectNames extends string> = {
    _type: z.ZodLiteral<ObjectNames>;
};
declare const objectNamed: <ObjectNames extends string, Names extends string, Zods extends z.ZodTypeAny, ResolvedValues, Optionals extends boolean, FieldsArray extends [FieldOptions<Names, Zods, ResolvedValues, Optionals>, ...FieldOptions<Names, Zods, ResolvedValues, Optionals>[]], Zod extends z.ZodObject<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields<ObjectNames>>, z.UnknownKeysParam, z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields<ObjectNames>>>, (z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields<ObjectNames>>> extends infer T_1 extends object ? { [k_1 in keyof T_1]: undefined extends z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields<ObjectNames>>>[k_1] ? never : k_1; } : never)[keyof Merge<FieldsZodObject<FieldsArray>, ExtraZodFields<ObjectNames>>]> extends infer T ? { [k in keyof T]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields<ObjectNames>>>, (z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields<ObjectNames>>> extends infer T_1 extends object ? { [k_1 in keyof T_1]: undefined extends z.baseObjectOutputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields<ObjectNames>>>[k_1] ? never : k_1; } : never)[keyof Merge<FieldsZodObject<FieldsArray>, ExtraZodFields<ObjectNames>>]>[k]; } : never, z.baseObjectInputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields<ObjectNames>>> extends infer T_2 ? { [k_2 in keyof T_2]: z.baseObjectInputType<Merge<FieldsZodObject<FieldsArray>, ExtraZodFields<ObjectNames>>>[k_2]; } : never>, ZodResolved extends z.ZodObject<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields<ObjectNames>>, z.UnknownKeysParam, z.ZodTypeAny, z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields<ObjectNames>>>, (z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields<ObjectNames>>> extends infer T_4 extends object ? { [k_4 in keyof T_4]: undefined extends z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields<ObjectNames>>>[k_4] ? never : k_4; } : never)[keyof Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields<ObjectNames>>]> extends infer T_3 ? { [k_3 in keyof T_3]: z.objectUtil.addQuestionMarks<z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields<ObjectNames>>>, (z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields<ObjectNames>>> extends infer T_4 extends object ? { [k_4 in keyof T_4]: undefined extends z.baseObjectOutputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields<ObjectNames>>>[k_4] ? never : k_4; } : never)[keyof Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields<ObjectNames>>]>[k_3]; } : never, z.baseObjectInputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields<ObjectNames>>> extends infer T_5 ? { [k_5 in keyof T_5]: z.baseObjectInputType<Merge<FieldsZodResolvedObject<FieldsArray>, ExtraZodFields<ObjectNames>>>[k_5]; } : never>, ParsedValue = z.output<Zod>, ResolvedValue = z.output<ZodResolved>, Select extends {
    [key: string]: string;
} = {}>({ name, fields, preview: previewDef, mock, zod: zodFn, zodResolved, ...def }: {
    description?: string | react.ReactElement<any, string | react.JSXElementConstructor<any>> | undefined;
    title?: string | undefined;
    options?: sanity.ObjectOptions | undefined;
    validation?: sanity.ValidationBuilder<TypedValueRule<z.input<Zod>>, z.input<Zod>> | undefined;
    initialValue?: sanity.InitialValueProperty<any, z.input<Zod>>;
    components?: sanity.ObjectComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    groups?: sanity.FieldGroupDefinition[] | undefined;
    fieldsets?: sanity.FieldsetDefinition[] | undefined;
    mock?: ((faker: null, path: string) => z.input<Zod>) | undefined;
    zod?: ((zod: z.ZodType<z.output<Zod>, any, z.input<Zod>>) => z.ZodType<ParsedValue, any, z.input<Zod>>) | undefined;
    zodResolved?: ((zod: z.ZodType<z.output<ZodResolved>, any, z.input<Zod>>) => z.ZodType<ResolvedValue, any, z.input<Zod>>) | undefined;
    fields: FieldsArray;
    name: ObjectNames;
    preview?: Preview<z.input<Zod>, Select> | undefined;
}) => {
    namedType: () => SanityType<{
        type: ObjectNames;
    }, z.input<Zod>, ParsedValue, ResolvedValue>;
    /**
     * @deprecated in upcoming version
     */
    ref: () => SanityType<{
        type: ObjectNames;
    }, z.input<Zod>, ParsedValue, ResolvedValue>;
    mock: (faker: null, path?: string | undefined) => z.input<Zod>;
    parse: (data: unknown) => ParsedValue;
    resolve: (data: unknown) => ResolvedValue;
    schema: () => {
        name: ObjectNames;
        type: string;
        fields: {
            name: string;
            validation: (rule: any) => any;
            description?: string | react.ReactElement<any, string | react.JSXElementConstructor<any>> | undefined;
            title?: string | undefined;
            fieldset?: string | undefined;
            group?: string | string[] | undefined;
        }[];
        preview: sanity.PreviewConfig<Record<string, string>, Record<string, any>> | undefined;
        description?: string | react.ReactElement<any, string | react.JSXElementConstructor<any>> | undefined;
        title?: string | undefined;
        options?: sanity.ObjectOptions | undefined;
        validation?: sanity.ValidationBuilder<TypedValueRule<z.input<Zod>>, z.input<Zod>> | undefined;
        initialValue?: sanity.InitialValueProperty<any, z.input<Zod>>;
        components?: sanity.ObjectComponents | undefined;
        hidden?: sanity.ConditionalProperty;
        readOnly?: sanity.ConditionalProperty;
        icon?: react.ComponentType | react.ReactNode;
        groups?: sanity.FieldGroupDefinition[] | undefined;
        fieldsets?: sanity.FieldsetDefinition[] | undefined;
    };
    zod: z.ZodType<ParsedValue, any, z.input<Zod>>;
    zodResolved: z.ZodType<ResolvedValue, any, z.input<Zod>>;
};

declare const slug: <ParsedValue = string, ResolvedValue = string>({ mock, zod: zodFn, zodResolved, ...def }?: {
    options?: sanity.SlugOptions | undefined;
    validation?: sanity.ValidationBuilder<sanity.SlugRule, SlugValue> | undefined;
    initialValue?: sanity.InitialValueProperty<any, Omit<SlugValue, "_type">>;
    components?: sanity.SlugComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    mock?: ((faker: null, path: string) => SlugValue) | undefined;
    zod?: ((zod: z.ZodType<SlugValue, any, SlugValue>) => z.ZodType<ParsedValue, any, SlugValue>) | undefined;
    zodResolved?: ((zod: z.ZodType<SlugValue, any, SlugValue>) => z.ZodType<ResolvedValue, any, SlugValue>) | undefined;
}) => SanityType<{
    type: string;
    options?: sanity.SlugOptions | undefined;
    validation?: sanity.ValidationBuilder<sanity.SlugRule, SlugValue> | undefined;
    initialValue?: sanity.InitialValueProperty<any, Omit<SlugValue, "_type">>;
    components?: sanity.SlugComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
}, SlugValue, ParsedValue, ResolvedValue>;

declare const string: <TypedValue extends string, ParsedValue = TypedValue, ResolvedValue = TypedValue>({ length, max, min, options, regex, validation, options: { list }, mock, zod: zodFn, zodResolved, ...def }?: {
    options?: (Omit<sanity.StringOptions | undefined, "list"> & {
        list?: [TypedValue | {
            title: string;
            value: TypedValue;
        }, ...(TypedValue | {
            title: string;
            value: TypedValue;
        })[]] | undefined;
    }) | undefined;
    validation?: sanity.ValidationBuilder<sanity.StringRule, string> | undefined;
    initialValue?: sanity.InitialValueProperty<any, string>;
    components?: sanity.StringComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    placeholder?: string | undefined;
    mock?: ((faker: null, path: string) => TypedValue) | undefined;
    zod?: ((zod: z.ZodType<TypedValue, any, TypedValue>) => z.ZodType<ParsedValue, any, TypedValue>) | undefined;
    zodResolved?: ((zod: z.ZodType<TypedValue, any, TypedValue>) => z.ZodType<ResolvedValue, any, TypedValue>) | undefined;
} & {
    length?: number | undefined;
    max?: number | undefined;
    min?: number | undefined;
    regex?: RegExp | undefined;
}) => SanityType<{
    options: (Omit<sanity.StringOptions | undefined, "list"> & {
        list?: [TypedValue | {
            title: string;
            value: TypedValue;
        }, ...(TypedValue | {
            title: string;
            value: TypedValue;
        })[]] | undefined;
    }) | undefined;
    type: string;
    validation: (rule: sanity.StringRule) => sanity.RuleBuilder<sanity.StringRule, string>;
    initialValue?: sanity.InitialValueProperty<any, string>;
    components?: sanity.StringComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    placeholder?: string | undefined;
}, TypedValue, ParsedValue, ResolvedValue>;

declare const text: <ParsedValue = string, ResolvedValue = string>({ length, max, min, mock, regex, validation, zod: zodFn, zodResolved, ...def }?: {
    options?: sanity.TextOptions | undefined;
    validation?: sanity.ValidationBuilder<sanity.TextRule, string> | undefined;
    initialValue?: sanity.InitialValueProperty<any, string>;
    components?: sanity.TextComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    placeholder?: string | undefined;
    rows?: number | undefined;
    mock?: ((faker: null, path: string) => string) | undefined;
    zod?: ((zod: z.ZodType<string, any, string>) => z.ZodType<ParsedValue, any, string>) | undefined;
    zodResolved?: ((zod: z.ZodType<string, any, string>) => z.ZodType<ResolvedValue, any, string>) | undefined;
} & {
    length?: number | undefined;
    max?: number | undefined;
    min?: number | undefined;
    regex?: RegExp | undefined;
}) => SanityType<{
    type: string;
    validation: (rule: sanity.TextRule) => sanity.StringRule | sanity.TextRule[];
    options?: sanity.TextOptions | undefined;
    initialValue?: sanity.InitialValueProperty<any, string>;
    components?: sanity.TextComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    placeholder?: string | undefined;
    rows?: number | undefined;
}, string, ParsedValue, ResolvedValue>;

declare const url: <ParsedValue = string, ResolvedValue = string>({ mock, zod: zodFn, zodResolved, ...def }?: {
    options?: sanity.UrlOptions | undefined;
    validation?: sanity.ValidationBuilder<sanity.UrlRule, string> | undefined;
    initialValue?: sanity.InitialValueProperty<any, string>;
    components?: sanity.UrlComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    placeholder?: string | undefined;
    mock?: ((faker: null, path: string) => string) | undefined;
    zod?: ((zod: z.ZodType<string, any, string>) => z.ZodType<ParsedValue, any, string>) | undefined;
    zodResolved?: ((zod: z.ZodType<string, any, string>) => z.ZodType<ResolvedValue, any, string>) | undefined;
}) => SanityType<{
    type: string;
    options?: sanity.UrlOptions | undefined;
    validation?: sanity.ValidationBuilder<sanity.UrlRule, string> | undefined;
    initialValue?: sanity.InitialValueProperty<any, string>;
    components?: sanity.UrlComponents | undefined;
    hidden?: sanity.ConditionalProperty;
    readOnly?: sanity.ConditionalProperty;
    icon?: react.ComponentType | react.ReactNode;
    placeholder?: string | undefined;
}, string, ParsedValue, ResolvedValue>;

type builder_SanityType<Definition, Value, ParsedValue, ResolvedValue> = SanityType<Definition, Value, ParsedValue, ResolvedValue>;
declare const builder_array: typeof array;
declare const builder_block: typeof block;
declare const builder_boolean: typeof boolean;
declare const builder_createType: typeof createType;
declare const builder_date: typeof date;
declare const builder_datetime: typeof datetime;
declare const builder_document: typeof document;
declare const builder_file: typeof file;
declare const builder_geopoint: typeof geopoint;
declare const builder_image: typeof image;
declare const builder_number: typeof number;
declare const builder_object: typeof object;
declare const builder_objectNamed: typeof objectNamed;
declare const builder_reference: typeof reference;
declare const builder_slug: typeof slug;
declare const builder_string: typeof string;
declare const builder_text: typeof text;
declare const builder_url: typeof url;
declare namespace builder {
  export {
    builder_SanityType as SanityType,
    builder_array as array,
    builder_block as block,
    builder_boolean as boolean,
    builder_createType as createType,
    builder_date as date,
    builder_datetime as datetime,
    builder_document as document,
    builder_file as file,
    builder_geopoint as geopoint,
    builder_image as image,
    InferValue as infer,
    InferValue as input,
    builder_number as number,
    builder_object as object,
    builder_objectNamed as objectNamed,
    InferParsedValue as output,
    InferParsedValue as parsed,
    builder_reference as reference,
    InferResolvedValue as resolved,
    builder_slug as slug,
    builder_string as string,
    builder_text as text,
    builder_url as url,
    InferValue as value,
  };
}

export { ParsedSanityDocument, SanityBlock, SanityDocument, SanityFile, SanityImage, SanityReference, builder as s, sharedFields };
