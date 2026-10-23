import { createCn } from "cn/config";

export const cn: ReturnType<typeof createCn> = createCn({
  extend: {
    classGroups: {
      "font-size": [{ text: ["h1", "h2", "h3", "h4", "h5", "h6", "body"] }],
    },
  },
});
