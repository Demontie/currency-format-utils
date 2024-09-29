# currency-format-utils

A node.js module to list and work on currency codes based on the [ISO 4217](http://en.wikipedia.org/wiki/ISO_4217) standard.

    npm install currency-format-utils

## currencyCountry({ country: "BR", value: 100.0 })

```js
const { CurrencyStandardization } = require("currency-format-utils");

const teste = CurrencyStandardization.currencyCountry({
  country: "BR",
  value: 100.0,
});

console.log(teste.getCentsValue()); //10000
console.log(teste.getValue()); //100
console.log(teste.getValueFormated()); //R$ 100,00
```

## currencyNumber({ currency: "032", value: 100.0, });

```js
const { CurrencyStandardization } = require("currency-format-utils");

const teste = CurrencyStandardization.currencyNumber({
  number: "032",
  value: 100.0,
});

console.log(teste.getCentsValue()); //10000
console.log(teste.getValue()); //100
console.log(teste.getValueFormated()); //$ 100,00
```

## currencyCode({ currency: "JOD", value: 300, });

```js
const { CurrencyStandardization } = require("currency-format-utils");
const teste = CurrencyStandardization.currencyCode({
  code: "JOD",
  value: 300,
});

console.log(teste.getCentsValue()); //300000
console.log(teste.getValue()); //300
console.log(teste.getValueFormated()); //٣٠٠٫٠٠٠ د.أ
```

## getDataByNumber({ number: "032" });

```js
const { CurrencyStandardization } = require("currency-format-utils");
const teste = CurrencyStandardization.getDataByNumber({ number: "032" });
/*
{
    "code": "ARS",
    "number": "032",
    "digits": 2,
    "currency": "Argentine Peso",
    "countries": ["Argentina"],
    "locale": [{ "AR": "es-AR" }],
    "code_country": ["AR"]
}
*/
```

## getDataByCode({ code: "032" });

```js
const { CurrencyStandardization } = require("currency-format-utils");
const teste = CurrencyStandardization.getDataByNumber({ code: "BRL" });
/*
{
    "code": "BRL",
    "number": "986",
    "digits": 2,
    "currency": "Brazilian Real",
    "countries": ["Brazil"],
    "locale": [{ "BR": "pt-BR" }],
    "code_country": ["BR"]
}
*/
```

## ISO-4217

Fetch the latest copy of ISO-4217 from the [maintainer](https://www.currency-iso.org/) and update this library's currency data file.

Note: You may have to manually tweak the capitalization of some country's names.

# License

MIT
