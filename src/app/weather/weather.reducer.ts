import { Action } from '@app/core';
import { WeatherInfo} from './weather.model';

interface IDictionary {
  [date: string]: {
    [time: string]: {
      Flux?: number;
      Cloud?: number;
    }
  };
};

class WeatherState {
  IsLoading: boolean;
  Error?: any;
  Clouds?: WeatherInfo[];
  Flux?: WeatherInfo[];
  Weather?: IDictionary;
}

export const initialState: WeatherState = {
  IsLoading : false
};

export const WEATHER_RETRIEVE = 'WEATHER_RETRIEVE';
export const WEATHER_RETRIEVE_SUCCESS = 'WEATHER_RETRIEVE_SUCCESS';
export const WEATHER_RETRIEVE_ERROR = 'WEATHER_RETRIEVE_ERROR';

export enum ACTION_KEYS {
  WEATHER_RETRIEVE = 'WEATHER_RETRIEVE',
  FLUX_RETRIEVE_SUCCESS = 'FLUX_RETRIEVE_SUCCESS',
  CLOUDNESS_RETRIEVE_SUCCESS = 'CLOUDNESS_RETRIEVE_SUCCESS',
  WEATHER_RETRIEVE_ERROR = 'WEATHER_RETRIEVE_ERROR',
  WEATHER_RETRIEVE_FAIL = 'WEATHER_RETRIEVE_FAIL'
}

export interface RetrieveWeatherAction {
  type: ACTION_KEYS.WEATHER_RETRIEVE;
  by: string;
}

export interface RetrieveFluxActionSuccess {
  type: ACTION_KEYS.FLUX_RETRIEVE_SUCCESS;
  by: WeatherInfo[];
}

export interface RetrieveCloudnessActionSuccess {
  type: ACTION_KEYS.CLOUDNESS_RETRIEVE_SUCCESS;
  by: WeatherInfo[];
}

export interface RetrieveWeatherActionFail {
  type: ACTION_KEYS.WEATHER_RETRIEVE_FAIL;
  by: string;
}

export const actionWeatherSuccess2 = (by: WeatherInfo[]): RetrieveFluxActionSuccess => ({
  type: ACTION_KEYS.FLUX_RETRIEVE_SUCCESS,
  by
});

export const actionCloudnessSuccess = (by: WeatherInfo[]): RetrieveCloudnessActionSuccess => ({
  type: ACTION_KEYS.CLOUDNESS_RETRIEVE_SUCCESS,
  by
});

export const actionWeatherFail = (by: string): RetrieveWeatherActionFail => ({
  type: ACTION_KEYS.WEATHER_RETRIEVE_FAIL,
  by
});

export const actionRetrieveWeather2 = (by: string): RetrieveWeatherAction => ({
  type: ACTION_KEYS.WEATHER_RETRIEVE,
  by
});

export type WeatherActionTypes =
  RetrieveWeatherAction
  | RetrieveFluxActionSuccess
  | RetrieveCloudnessActionSuccess;

export const actionRetrieveWeather = (symbol: string) => ({
  type: ACTION_KEYS.WEATHER_RETRIEVE,
  payload: symbol
});

export const actionRetrieveWeatherSuccess = (weather: WeatherInfo[]) => ({
  type: ACTION_KEYS.FLUX_RETRIEVE_SUCCESS,
  payload: weather
});

export const selectorWeather = state => state.weather;

class WeatherObj {
  Date: string;
  WeatherTimes: {
    Time: string;
    Flux?: number;
    Cloud?: number;
  };
}



export function weatherReducer(state: WeatherState = initialState, action: WeatherActionTypes): WeatherState {
  switch (action.type) {
    case ACTION_KEYS.FLUX_RETRIEVE_SUCCESS: {
      const infos = action.by;
      const dates: IDictionary = infos
        .reduce((acc: IDictionary, curr) => {
          const date = curr.time.slice(0, 10);
          if (!acc[date]) { // todo remove code duplication
            acc[date] = {[curr.time]: {Flux: curr.value }};
          } else
          if (!acc[date][curr.time]) {
            acc[date][curr.time] = {Flux: curr.value };
          } else {
            acc[date][curr.time] = {...acc[date][curr.time], Flux: curr.value };
          }

          return acc;
        } , state.Weather || {});

      return {
        ...state,
        IsLoading: false,
        Flux: infos,
        Weather: dates
      };
    }

    case ACTION_KEYS.CLOUDNESS_RETRIEVE_SUCCESS: {
      const infos = action.by;
      const dates: IDictionary = infos
        .reduce((acc: IDictionary, curr) => {
          const date = curr.time.slice(0, 10);
          if (!acc[date]) { // todo remove code duplication
            acc[date] = {[curr.time]: {Cloud: curr.value }};
          } else
          if (!acc[date][curr.time]) {
            acc[date][curr.time] = { Cloud: curr.value };
          } else {
            acc[date][curr.time] = {...acc[date][curr.time], Cloud: curr.value };
          }
          return acc;
        }, state.Weather || {});

      return {
        ...state,
        IsLoading: false,
        Clouds: action.by,
        Weather: dates
      };
    }

    default:
      return state;
  }
}


