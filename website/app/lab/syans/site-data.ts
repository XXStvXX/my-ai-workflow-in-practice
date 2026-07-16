import companyData from "../../../site-data/syans/company.json";
import navigationData from "../../../site-data/syans/navigation.json";
import productsData from "../../../site-data/syans/products.json";
import servicesData from "../../../site-data/syans/services.json";
import postersData from "../../../site-data/syans/posters.json";

export type PosterItem = {
  id: string;
  file: string;
  alt: string;
  order: number;
  visible: boolean;
  startDate: string | null;
  endDate: string | null;
};

export const company = companyData.company;
export const navigation = navigationData.items;
export const footerGroups = navigationData.footerGroups;
export const products = productsData.items;
export const services = servicesData.items;
export const serviceSteps = servicesData.steps;
const today = new Date().toISOString().slice(0, 10);

export const posters = (postersData.items as PosterItem[])
  .filter((poster) => poster.visible && (!poster.startDate || poster.startDate <= today) && (!poster.endDate || poster.endDate >= today))
  .sort((a, b) => a.order - b.order);
