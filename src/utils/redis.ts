export const STOCK_PREFIX_REDIS = 'stock_';
export const STYLENAME_PREFIX_REDIS = 'styleName_';

export function getStockKey(vendorProductVariantsId: number) {
  return STOCK_PREFIX_REDIS + vendorProductVariantsId;
}

export function getStyleNameKey(vendorProductStyleId: number) {
  return STYLENAME_PREFIX_REDIS + vendorProductStyleId;
}
