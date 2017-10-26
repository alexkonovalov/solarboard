import * as moment from 'moment';

import { WeatherInfo, WeatherState, WeatherDictionary } from './weather.model';
import { WeatherActionTypes, ACTION_KEYS } from './weather.actions';

export const initialState: WeatherState = {
  IsCloudsLoading : false,
  IsFluxLoading: false,
  Weather: {},
  AllDays: [],
  AllTimes: []
};

export const selectorWeather = state => state.weather;

function getDayInfos(infos: WeatherInfo[]): {value: number, day: moment.Moment, time: moment.Moment}[] {
  return infos
    .map(info => ({value: info.value, date: moment.utc(info.time)}))
    .map(info => ({
      value: info.value,
      day: info.date.clone().startOf('day'),
      time: moment.utc(info.date.diff(info.date.clone().startOf('day')))
    }));
}

function mergeDateArrays(arr1: moment.Moment[], arr2: moment.Moment[]): moment.Moment[] {
  return Array
    .from(new Set([...arr1
        .map(day => day.unix()),
      ...arr2
        .map(day => day.unix())]
      .sort()))
    .map(day => moment.utc(moment.unix(day)));
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


