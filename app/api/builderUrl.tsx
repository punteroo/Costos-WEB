export const buildApiUrlLot = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LOT}${path}`;
};

export const buildApiUrlSupply = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_SUPPLY}${path}`;
};

export const buildApiUrlRotation = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_ROTATION}${path}`;
};

export const buildApiUrlLabor = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LABOR}${path}`;
};

export const buildApiUrlListPrice = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_LIST_PRICE}${path}`;
};

export const buildApiUrlCost = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_COST}${path}`;
};

export const buildApiUrlProduction = (path: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_PRODUCTION}${path}`;
};
