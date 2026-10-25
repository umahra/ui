import type { ReactNode } from "react";

export interface DesignSystemExample {
  title: string;
  usage: string;
  preview: ReactNode;
}

export interface DesignSystemComponent {
  id: string;
  name: string;
  description: string;
  importCode?: string;
  examples: readonly DesignSystemExample[];
}

export interface DesignSystemColor {
  name: string;
  variable: `--${string}`;
}

export interface DesignSystemTypography {
  name: string;
  className: string;
}

export interface DesignSystemProps {
  components: readonly DesignSystemComponent[];
  colors?: readonly DesignSystemColor[];
  typography?: readonly DesignSystemTypography[];
}
