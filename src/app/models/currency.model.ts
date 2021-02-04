import {CurrencyRate} from './currency-rates.model';

export class Currency {
  amount: number;
  base_currency_code: string;
  base_currency_name: string;
  rates: CurrencyRate[];
}
