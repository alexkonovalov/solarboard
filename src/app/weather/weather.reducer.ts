import * as moment from 'moment';

import { WeatherInfo, WeatherState, WeatherDictionary } from './weather.model';
import { WeatherActionTypes, ACTION_KEYS } from './weather.actions';

export const initialState: WeatherState = {
  IsCloudsLoading : false,
  IsFluxLoading: false,
  IsError: false,
  Weather: {},
  AllDays: [],
  AllTimes: []
};

export const selectorWeather = state => state.weather;

export function weatherReducer(state: WeatherState = initialState, action: WeatherActionTypes): WeatherState {
  switch (action.type) {

    case ACTION_KEYS.WEATHER_RETRIEVE: {
      return { ...state,
        IsError: false,
        IsFluxLoading: true,
        IsCloudsLoading: true
      };
    }

    case ACTION_KEYS.FLUX_RETRIEVE_SUCCESS: {
      return { ...state,
        ...updateWithInfos(action.by, state, val => ({Flux: val})),
        IsFluxLoading: false
      };
    }

    case ACTION_KEYS.CLOUDNESS_RETRIEVE_SUCCESS: {
      return { ...state,
        ...updateWithInfos(action.by, state, val => ({Cloud: val})),
        IsCloudsLoading: false
      };
    }

    case ACTION_KEYS.FLUX_RETRIEVE_FAIL: {
      return { ...state,
        IsFluxLoading: false,
        IsError: true
      };
    }

    case ACTION_KEYS.CLOUDNESS_RETRIEVE_FAIL: {
      return { ...state,
        IsCloudsLoading: false,
        IsError: true
      };
    }

    default:
      return state;
  }
}

function getDayInfos(infos: WeatherInfo[]): {value: number, day: moment.Moment, time: moment.Moment}[] {
  return infos
    .map(info => ({value: info.value, date: moment.utc(info.time)}))
    .map(info => ({
      value: info.value,
      day: info.date.clone().startOf('day'),
      time: moment.utc(info.date.diff(info.date.clone().startOf('day')))
    }));
}

function mergeToDistinctDateTimes(arr1: moment.Moment[], arr2: moment.Moment[]): moment.Moment[] {
  return Array
    .from(new Set([...arr1
        .map(day => day.unix()),
      ...arr2
        .map(day => day.unix())]
      .sort()))
    .map(day => moment.utc(moment.unix(day)));
}

function updateWithInfos(weatherInfos: WeatherInfo[],
    state: WeatherState,
    callback: (value: number) => { Flux: number } | { Cloud: number }) {

  const dayInfos = getDayInfos(weatherInfos);
  const dates = dayInfos
    .reduce((accumulator: WeatherDictionary, currentElement) => {
      const day = currentElement.day.toISOString();
      const time = currentElement.time.toISOString();

      return { ...accumulator,
        [day]: {
          ...accumulator[day],
          [time]: {
              ...(accumulator[day] || {})[time],
              ...callback(currentElement.value)
            }
        }
      };
    }, state.Weather);

  return { ...state,
    Weather: dates,
    AllDays: mergeToDistinctDateTimes(state.AllDays, dayInfos.map(dateTime => dateTime.day)),
    AllTimes: mergeToDistinctDateTimes(state.AllTimes, dayInfos.map(dateTime => dateTime.time))
  };
}
