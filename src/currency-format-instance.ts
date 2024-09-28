export class CurrencyFormatInstance {
  constructor(
    private readonly value: number,
    private readonly locale: string,
    private readonly currency: string,
    private readonly digits: number
  ) {}

  getValueFormated(): string {
    return new Intl.NumberFormat(this.locale, {
      style: "currency",
      currency: this.currency,
    }).format(this.value);
  }

  getValue(): number {
    return this.value;
  }

  getCentsValue(): number {
    const calValue = this.value * Math.pow(10, this.digits);

    return Math.round(calValue);
  }
}
