export interface GoldApiResponse {
  timestamp: number;
  metal: string;
  currency: string;
  exchange: string;
  symbol: string;
  prev_close_price: number;
  open_price: number;
  low_price: number;
  high_price: number;
  open_time: number;
  price: number;
  ch: number; // Change value
  chp: number; // Change percent
  ask: number;
  bid: number;
  price_gram_24k: number;
  price_gram_22k: number;
  price_gram_21k: number;
  price_gram_20k: number;
  price_gram_18k: number;
}

export interface PriceState {
  data: GoldApiResponse | null;
  loading: boolean;
  error: string | null;
}

export interface HistoricalDataPoint {
  date: string;
  price: number;
}