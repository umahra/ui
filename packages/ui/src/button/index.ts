import { Content, Loader, Root } from "./button.parts";
import { Separator, Text } from "./button-group.client";
import { Root as GroupRoot } from "./button-group.parts";

export type {
  ButtonContentProps,
  ButtonLoaderProps,
  ButtonRootProps,
} from "./button.parts";

export const ButtonPrimitive = {
  Root,
  Content,
  Loader,
};

export type {
  ButtonGroupSeparatorProps,
  ButtonGroupTextProps,
} from "./button-group.client";
export type { ButtonGroupRootProps } from "./button-group.parts";

export const ButtonGroupPrimitive = {
  Root: GroupRoot,
  Text,
  Separator,
};
