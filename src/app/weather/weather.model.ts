export interface WeatherInfo {
  time: string;
  value: number;
}

export enum WeatherAxis {
  Clowdness = 'av_ttl_cld',
  SolarFlux = 'av_swsfcdown'
}
