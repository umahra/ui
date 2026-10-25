import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    carousel: "src/carousel/index.ts",
    accordion: "src/accordion/index.ts",
    heading: "src/heading/index.tsx",
    text: "src/text/index.tsx",
    button: "src/button/index.ts",
    breadcrumb: "src/breadcrumb/index.ts",
    checkbox: "src/checkbox/index.ts",
    dialog: "src/dialog/index.ts",
    popover: "src/popover/index.ts",
    input: "src/input/index.ts",
    field: "src/field/index.ts",
    label: "src/label/index.tsx",
    textarea: "src/textarea/index.tsx",
    select: "src/select/index.ts",
    switch: "src/switch/index.ts",
    slider: "src/slider/index.ts",
    sheet: "src/sheet/index.ts",
    radio: "src/radio/index.ts",
  },
  format: ["esm"],
  platform: "neutral",
  unbundle: true,
  dts: { tsconfig: "tsconfig.build.json" },
});
