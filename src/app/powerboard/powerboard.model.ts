export const STORE_SUBSET_KEY = 'powerboard';

export interface PowerInfo {
  Id: number;
  Power: string;
  Tension: string;
}

export interface PowerboardState {
  Panels: PowerInfo[];
  IsLoading: boolean;
  IsError: boolean;
}
