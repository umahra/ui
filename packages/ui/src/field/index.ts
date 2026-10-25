import {
  Content,
  Description,
  Error as FieldError,
  Set as FieldSet,
  Group,
  Label,
  Legend,
  Root,
  Separator,
  Title,
} from "./field.parts";

export type {
  FieldContentProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldGroupProps,
  FieldLabelProps,
  FieldLegendProps,
  FieldRootProps,
  FieldSeparatorProps,
  FieldSetProps,
  FieldTitleProps,
} from "./field.parts";

export const FieldPrimitive = {
  Root,
  Label,
  Description,
  Error: FieldError,
  Group,
  Set: FieldSet,
  Legend,
  Content,
  Title,
  Separator,
};
