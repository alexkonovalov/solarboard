import { Action } from '@app/core';
import { WeatherInfo} from './weather.model';

interface WeatherDictionary {
  [date: string]: {
    [time: string]: {
      Flux?: number;
      Cloud?: number;
    }
  };
};

class WeatherState {
  IsCloudsLoading: boolean;
  IsFluxLoading: boolean;
  Error?: any;
  Clouds?: WeatherInfo[];
  Flux?: WeatherInfo[];
  Weather: WeatherDictionary;
}

export const initialState: WeatherState = {
  IsCloudsLoading : false,
  IsFluxLoading: false,
  Weather: {}
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

export function weatherReducer(state: WeatherState = initialState, action: WeatherActionTypes): WeatherState {
  switch (action.type) {

    case ACTION_KEYS.WEATHER_RETRIEVE: {
      return {
        ...state,
        IsFluxLoading: true,
        IsCloudsLoading: true
      };
    }

    case ACTION_KEYS.FLUX_RETRIEVE_SUCCESS: { // todo remove code doubling from recducers:
      const infos = action.by;
      const dates: WeatherDictionary = infos
        .reduce((accumulator: WeatherDictionary, currentElement) => {
          const date = currentElement.time.slice(0, 10);
          return { ...accumulator,
            [date]: {
              ...accumulator[date],
              [currentElement.time]: {
                  ...(accumulator[date] || {})[currentElement.time],
                  Flux: currentElement.value
                }
            }
          };

        }, state.Weather);

      return {
        ...state,
        IsFluxLoading: false,
        Weather: dates
      };
    }


    case ACTION_KEYS.CLOUDNESS_RETRIEVE_SUCCESS: {
      const infos = action.by;
      const dates: WeatherDictionary = infos
        .reduce((accumulator: WeatherDictionary, currentElement) => { // todo remove code doubling from recducers:
          const date = currentElement.time.slice(0, 10);
          return { ...accumulator,
            [date]: {
              ...accumulator[date],
              [currentElement.time]: {
                  ...(accumulator[date] || {})[currentElement.time],
                  Cloud: currentElement.value
                }
            }
          };
        }, state.Weather);

      return {
        ...state,
        IsCloudsLoading: false,
        Weather: dates
      };
    }

    default:
      return state;
  }
}


