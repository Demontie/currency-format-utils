import currencies from "./currencies.json";
import { CurrencyFormatInstance } from "./currency-format-instance";

type Params = {
  currency: string;
  value: number | string;
  code_country?: any;
  isCents?: boolean;
};

export class CurrencyStandardization {
  private static getLocale({
    codeParam,
    codeCountryParam,
  }: {
    codeParam: string;
    codeCountryParam?: string;
  }): string {
    const currencyData = currencies.find((obj) => codeParam === obj.code);
    if (!currencyData) {
      throw new Error(``);
    }

    const { locale } = currencyData;
    if (codeCountryParam) {
      const codeCountry: any = locale.find(
        (objCurrence) => Object.keys(objCurrence)[0] === codeCountryParam
      );

      return codeCountry[codeCountryParam];
    }

    const lastLocale: any = locale[locale.length - 1];
    const lastKey: any = Object.keys(lastLocale)[0];
    return lastLocale[lastKey];
  }

  private static convertedCents(
    value: number | string,
    digits: number,
    isCents: boolean
  ): number {
    let valueCurrency = Number(value);
    if (typeof value === "string") {
      valueCurrency = parseFloat(value);
    }

    return isCents ? valueCurrency / Math.pow(10, digits) : valueCurrency;
  }

  static currencyCode({
    code,
    value,
    isCents = false,
    code_country = null,
  }: Omit<Params, "currency"> & { code: string }): CurrencyFormatInstance {
    const currencyData = currencies.find((obj) => code === obj.code);

    if (!currencyData) {
      throw new Error(`Currency code '${code}' not found.`);
    }

    const { digits } = currencyData;

    const locale = this.getLocale({
      codeParam: code,
      codeCountryParam: code_country,
    });

    value = this.convertedCents(value, digits, isCents);

    return new CurrencyFormatInstance(value, locale, code, digits);
  }

  static currencyNumber({
    currency,
    value,
    isCents = false,
    code_country = null,
  }: Params) {
    const currencyData = currencies.find((obj) => currency === obj.number);

    if (!currencyData) {
      throw new Error(`Currency number '${currency}' not found.`);
    }

    const { digits, code } = currencyData;

    const locale = this.getLocale({
      codeParam: code,
      codeCountryParam: code_country,
    });

    value = this.convertedCents(value, digits, isCents);

    return new CurrencyFormatInstance(value, locale, code, digits);
  }

  static currencyCountry({
    country,
    value,
    isCents = false,
  }: Omit<Params, "currency"> & { country: string }) {
    const currencyData = currencies.find(
      (obj) =>
        obj.code_country.includes(country.toLocaleUpperCase()) ||
        obj.countries.includes(country)
    );

    if (!currencyData) {
      throw new Error(`Country code '${country}' not found.`);
    }

    const { code } = currencyData;

    return this.currencyCode({
      code,
      value,
      isCents,
      code_country: country.toLocaleUpperCase(),
    });
  }

  static getDataByNumber({ number }: { number: string }) {
    const currencyData = currencies.find((obj) => number === obj.number);

    if (!currencyData) {
      throw new Error(`Currency number '${number}' not found.`);
    }

    return currencyData;
  }

  static getDataByCode({ code }: { code: string }) {
    const currencyData = currencies.find((obj) => code === obj.number);

    if (!currencyData) {
      throw new Error(`Currency code '${code}' not found.`);
    }

    return currencyData;
  }
}
