import { DesignSystem } from "../src/visualiser";
import { useEffectiveDirection } from "../src/visualiser/direction";
import { useAccordionExamples } from "./accordion";
import { useBreadcrumbExamples } from "./breadcrumb";
import { useButtonGroupExamples } from "./button-group";
import { useCarouselExamples } from "./carousel";
import { useCheckboxExamples } from "./checkbox";
import {
  useButtonExamples,
  useDialogExamples,
  useInputExamples,
} from "./core-examples";
import { useFieldExamples } from "./field";
import { useLabelExamples, useTextareaExamples } from "./form-primitives";
import { useInputGroupExamples } from "./input-group";
import { usePopoverExamples } from "./popover";
import { useRadioGroupExamples } from "./radio-group";
import { useSelectExamples } from "./select";
import { useSheetExamples } from "./sheet";
import { useSliderExamples } from "./slider";
import { useSwitchExamples } from "./switch";

export function Playground() {
  const direction = useEffectiveDirection();
  const components = [
    useButtonExamples(),
    useButtonGroupExamples(),
    useInputExamples(),
    useInputGroupExamples(),
    useLabelExamples(),
    useTextareaExamples(),
    useFieldExamples(),
    useDialogExamples(),
    useSelectExamples(),
    useSwitchExamples(),
    useCheckboxExamples(),
    useRadioGroupExamples(),
    useSliderExamples(),
    useSheetExamples(),
    usePopoverExamples(),
    useAccordionExamples(),
    useCarouselExamples({ direction }),
    useBreadcrumbExamples(),
  ];
  return <DesignSystem components={components} />;
}
