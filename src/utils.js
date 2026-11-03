import { optimizedImages } from "./image-files";
export const asset = (name) => `/assets/${optimizedImages[name] || name}`;
export const money = (n) =>
  `$${n.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })}`;
