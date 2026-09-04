export const PRODUCT_VND_PRICE_LOCALE = "vi-VN";
export const PRODUCT_VND_PRICE_CURRENCY = "VND";
export const PRODUCT_USD_PRICE_LOCALE = "en-US";
export const PRODUCT_USD_PRICE_CURRENCY = "USD";

export type SupportedCurrency =
  | typeof PRODUCT_VND_PRICE_CURRENCY
  | typeof PRODUCT_USD_PRICE_CURRENCY;

const vndFormatter = new Intl.NumberFormat(PRODUCT_VND_PRICE_LOCALE, {
  style: "currency",
  currency: PRODUCT_VND_PRICE_CURRENCY,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const usdFormatter = new Intl.NumberFormat(PRODUCT_USD_PRICE_LOCALE, {
  style: "currency",
  currency: PRODUCT_USD_PRICE_CURRENCY,
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatCurrency(price: number, currency: SupportedCurrency): string {
  switch (currency) {
    case PRODUCT_VND_PRICE_CURRENCY:
      return vndFormatter.format(price);
    case PRODUCT_USD_PRICE_CURRENCY:
      return usdFormatter.format(price);
  }
}
