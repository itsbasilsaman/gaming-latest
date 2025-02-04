// validation.ts
export interface Offer {
  productId: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  unitPriceUSD: string;
  unitPriceSAR: string;
  minQty: string;
  maxQty: string;
  lowStockAlertQty: string;
  deliveryMethods: string[];
}

export interface ValidationErrors {
  [key: string]: string;
}

export const validateOffer = (offer: Offer): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!offer.title) errors.title = "Title is required";
  if (!offer.titleAr) errors.titleAr = "Title (Arabic) is required";
  if (!offer.description) errors.description = "Description is required";
  if (!offer.descriptionAr) errors.descriptionAr = "Description (Arabic) is required";
  if (!offer.unitPriceUSD) errors.unitPriceUSD = "Unit Price (USD) is required";
  if (!offer.unitPriceSAR) errors.unitPriceSAR = "Unit Price (SAR) is required";
  if (!offer.minQty) errors.minQty = "Min Quantity is required";
  if (!offer.maxQty) errors.maxQty = "Max Quantity is required";
  if (offer.deliveryMethods.length === 0) errors.deliveryMethods = "Delivery Method is required";

  return errors;
};