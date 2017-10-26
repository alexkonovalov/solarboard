import * as moment from 'moment';

import { WeatherInfo } from './weather.model';

export enum ACTION_KEYS {
  WEATHER_RETRIEVE = 'WEATHER_RETRIEVE',
  FLUX_RETRIEVE_SUCCESS = 'FLUX_RETRIEVE_SUCCESS',
  CLOUDNESS_RETRIEVE_SUCCESS = 'CLOUDNESS_RETRIEVE_SUCCESS',
  FLUX_RETRIEVE_FAIL = 'FLUX_RETRIEVE_ERROR',
  CLOUDNESS_RETRIEVE_FAIL = 'CLOUDNESS_RETRIEVE_FAIL'
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

export interface RetrieveCloudnessActionFail {
  type: ACTION_KEYS.CLOUDNESS_RETRIEVE_FAIL;
  by: string;
}

export interface RetrieveFluxActionFail {
  type: ACTION_KEYS.FLUX_RETRIEVE_FAIL;
  by: string;
}

export const actionRetrieveFluxSuccess = (by: WeatherInfo[]): RetrieveFluxActionSuccess => ({
  type: ACTION_KEYS.FLUX_RETRIEVE_SUCCESS,
  by
});

export const actionRetrieveCloudnessSuccess = (by: WeatherInfo[]): RetrieveCloudnessActionSuccess => ({
  type: ACTION_KEYS.CLOUDNESS_RETRIEVE_SUCCESS,
  by
});

export const actionRetrieveFluxFail = (by: string): RetrieveFluxActionFail => ({
  type: ACTION_KEYS.FLUX_RETRIEVE_FAIL,
  by
});

export const actionRetrieveCloudnessFail = (by: string): RetrieveCloudnessActionFail => ({
  type: ACTION_KEYS.CLOUDNESS_RETRIEVE_FAIL,
  by
});

export const actionRetrieveWeather = () => ({
  type: ACTION_KEYS.WEATHER_RETRIEVE
});

export type WeatherActionTypes = RetrieveWeatherAction
  | RetrieveFluxActionSuccess
  | RetrieveFluxActionFail
  | RetrieveCloudnessActionSuccess
  | RetrieveCloudnessActionFail;
