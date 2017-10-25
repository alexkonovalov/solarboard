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

function getUniqueDaysTimesUnixFormat(infos: WeatherInfo[]): {days: number[], times: number[]} {
  const allDates = infos
  .map(info => moment(info.time))
  .map(dateTime => ({
    day: dateTime.clone().startOf('day'),
    time: moment(dateTime.diff(dateTime.clone().startOf('day')))
  }));

  const days = Array
    .from(new Set(allDates.map(dateTime => dateTime.day.unix())));

  const times = Array
    .from(new Set(allDates
      .map(dateTime => dateTime.time.unix())))
    /* .sort()
    .map(time => moment.unix(time)) */;

  return {
    days: days,
    times: times
  };
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
      const infos = action.by;

      const distinctDates = getUniqueDaysTimesUnixFormat(infos);

      const allDates = infos
        .map(info => ({value: info.value, date: moment(info.time)}))
        .map(info => ({
          value: info.value,
          day: info.date.clone().startOf('day'),
          time: moment(info.date.diff(info.date.clone().startOf('day')))
        }));

      const dates: WeatherDictionary = allDates
        .reduce((accumulator: WeatherDictionary, currentElement) => { // todo remove code doubling from recducers:
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

/*       const dates: WeatherDictionary = infos
        .reduce((accumulator: WeatherDictionary, currentElement) => {
          const date = moment(currentElement.time).startOf('day').toISOString();
          return { ...accumulator,
            [date]: {
              ...accumulator[date],
              [currentElement.time]: {
                  ...(accumulator[date] || {})[currentElement.time],
                  Flux: currentElement.value
                }
            }
          };

        }, state.Weather); */

      return {
        ...state,
        IsFluxLoading: false,
        Weather: dates
      };
    }


    case ACTION_KEYS.CLOUDNESS_RETRIEVE_SUCCESS: {
      const infos = action.by;

      const distinctDates = getUniqueDaysTimesUnixFormat(infos);

      const allDates = infos
        .map(info => ({value: info.value, date: moment(info.time)}))
        .map(info => ({
          value: info.value,
          day: info.date.clone().startOf('day'),
          time: moment(info.date.diff(info.date.clone().startOf('day')))
        }));

      const dates: WeatherDictionary = allDates
        .reduce((accumulator: WeatherDictionary, currentElement) => { // todo remove code doubling from recducers:
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

/*       const dates: WeatherDictionary = infos
        .reduce((accumulator: WeatherDictionary, currentElement) => { // todo remove code doubling from recducers:
          const date = moment(currentElement.time).startOf('day').toISOString();
          return { ...accumulator,
            [date]: {
              ...accumulator[date],
              [currentElement.time]: {
                  ...(accumulator[date] || {})[currentElement.time],
                  Cloud: currentElement.value
                }
            }
          };
        }, state.Weather); */

      return {
        ...state,
        IsCloudsLoading: false,
        Weather: dates,
        AllDays: distinctDates.days.map(day => moment.unix(day)),
        AllTimes: distinctDates.times.sort().map(day => moment.unix(day))
      };
    }

    default:
      return state;
  }
}


