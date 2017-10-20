import { Action } from '@app/core';

export const initialState = {
  symbol: 'GOOGL',
};


export const WEATHER_RETRIEVE = 'WEATHER_RETRIEVE';
export const WEATHER_RETRIEVE_SUCCESS = 'WEATHER_RETRIEVE_SUCCESS';
export const WEATHER_RETRIEVE_ERROR = 'WEATHER_RETRIEVE_ERROR';

export enum ACTION_KEYS {
  WEATHER_RETRIEVE = 'WEATHER_RETRIEVE',
  WEATHER_RETRIEVE_SUCCESS = 'WEATHER_RETRIEVE_SUCCESS',
  WEATHER_RETRIEVE_ERROR = 'WEATHER_RETRIEVE_ERROR',
  WEATHER_RETRIEVE_FAIL = 'WEATHER_RETRIEVE_FAIL'
}

export interface RetrieveWeatherAction {
  type: ACTION_KEYS.WEATHER_RETRIEVE;
  by: string;
}

export interface RetrieveWeatherActionSuccess {
  type: ACTION_KEYS.WEATHER_RETRIEVE_SUCCESS;
  by: WeatherInfo[];
}

export interface RetrieveWeatherActionFail {
  type: ACTION_KEYS.WEATHER_RETRIEVE_FAIL;
  by: string;
}

export const actionWeatherSuccess2 = (by: WeatherInfo[]): RetrieveWeatherActionSuccess => ({
  type: ACTION_KEYS.WEATHER_RETRIEVE_SUCCESS,
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
  | RetrieveWeatherActionSuccess;

export const actionRetrieveWeather = (symbol: string) => ({
  type: ACTION_KEYS.WEATHER_RETRIEVE,
  payload: symbol
});

export const actionRetrieveWeatherSuccess = (weather: WeatherInfo[]) => ({
  type: ACTION_KEYS.WEATHER_RETRIEVE_SUCCESS,
  payload: weather
});

export const selectorWeather = state => state.weather;

export function weatherReducer(state = initialState, action: WeatherActionTypes) {
  switch (action.type) {
    case ACTION_KEYS.WEATHER_RETRIEVE_SUCCESS: {
      console.log('Weather_RETRIEVE_SUCCESS', action.by);

      const weatherObj = Object.assign({}, state, {
        loading: false,
        weather: action.by,
        error: null
      });

      console.log('***weatherObj', weatherObj);
      return weatherObj;
    }

    default:
      return state;
  }
}

export interface WeatherInfo {
  time: string;
  sun: number;
}
