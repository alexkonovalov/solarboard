import * as moment from 'moment';

import { Action } from '@app/core';
import { WeatherInfo, WeatherState, WeatherDictionary } from './weather.model';

export const initialState: WeatherState = {
  IsCloudsLoading : false,
  IsFluxLoading: false,
  Weather: {},
  AllDays: [],
  AllTimes: []
};

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

export const actionRetrieveWeatherSuccess = (by: WeatherInfo[]): RetrieveFluxActionSuccess => ({
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

export const actionRetrieveWeather = () => ({
  type: ACTION_KEYS.WEATHER_RETRIEVE
});

export type WeatherActionTypes =
  RetrieveWeatherAction
  | RetrieveFluxActionSuccess
  | RetrieveCloudnessActionSuccess;


export const selectorWeather = state => state.weather;

function getDayInfos(infos: WeatherInfo[]): {value: number, day: moment.Moment, time: moment.Moment}[] {
  return infos
    .map(info => ({value: info.value, date: moment(info.time)}))
    .map(info => ({
      value: info.value,
      day: info.date.clone().startOf('day'),
      time: moment(info.date.diff(info.date.clone().startOf('day')))
    }));
}

function mergeDateArrays(arr1: moment.Moment[], arr2: moment.Moment[]): moment.Moment[] {
  return Array
    .from(new Set([...arr1
        .map(day => day.unix()),
      ...arr2
        .map(day => day.unix())]))
    .map(day => moment.unix(day));
}

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
      const dayInfos = getDayInfos(action.by);

      const dates: WeatherDictionary = dayInfos
        .reduce((accumulator: WeatherDictionary, currentElement) => {
          const day = currentElement.day.toISOString();
          const time = currentElement.time.toISOString();

          return { ...accumulator,
            [day]: {
              ...accumulator[day],
              [time]: {
                  ...(accumulator[day] || {})[time],
                  Flux: currentElement.value
                }
            }
          };
        }, state.Weather);

      return {
        ...state,
        IsFluxLoading: false,
        Weather: dates,
        AllDays: mergeDateArrays(state.AllDays, dayInfos.map(dateTime => dateTime.day)),
        AllTimes: mergeDateArrays(state.AllTimes, dayInfos.map(dateTime => dateTime.time))
      };
    }


    case ACTION_KEYS.CLOUDNESS_RETRIEVE_SUCCESS: { // todo remove code doubling from recducers:
      const dayInfos = getDayInfos(action.by);

      const dates: WeatherDictionary = dayInfos
        .reduce((accumulator: WeatherDictionary, currentElement) => {
          const day = currentElement.day.toISOString();
          const time = currentElement.time.toISOString();

          return { ...accumulator,
            [day]: {
              ...accumulator[day],
              [time]: {
                  ...(accumulator[day] || {})[time],
                  Cloud: currentElement.value
                }
            }
          };
        }, state.Weather);

      return {
        ...state,
        IsCloudsLoading: false,
        Weather: dates,
        AllDays: mergeDateArrays(state.AllDays, dayInfos.map(dateTime => dateTime.day)),
        AllTimes: mergeDateArrays(state.AllTimes, dayInfos.map(dateTime => dateTime.time))
      };
    }

    default:
      return state;
  }
}


