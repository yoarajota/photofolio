export type Job = {
  id?: string;
  title: string;
  seo_description: string;
  seo_keywords: string;
  active: boolean;
  slug: string;
};

export type ImageRegister = {
  id: string;
  url: string;
  title: string;
  description: string;
  price: string;
  categories: string[];
};