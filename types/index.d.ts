import { WatermarkConfig } from "@/app/protected/jobs/_components/WatermarkEditor";

export type Job = {
  id?: string;
  title: string;
  seo_description: string;
  seo_keywords: string;
  active: boolean;
  slug: string;
};

export type WatermarkConfig = {
  text: string;
  size: number;
  opacity: number;
  color: string;
  rotation: number;
  spacingX: number;
  spacingY: number;
  positionX: number;
  positionY: number;
};

export type ImageRegister = {
  id: string;
  path: string;
  title: string;
  description: string;
  price: string;
  visible: boolean;
  categories: string[];
  watermark_config: WatermarkConfig;
};
