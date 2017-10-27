import { PowerInfo } from './powerboard.model';

export enum ACTION_KEYS {
  POWER_RETRIEVE = 'POWER_RETRIEVE',
  POWER_RETRIEVE_SUCCESS = 'POWER_RETRIEVE_SUCCESS',
  POWER_RETRIEVE_ERROR = 'POWER_RETRIEVE_ERROR',
  POWER_POLL = 'POWER_POLL',
  POWER_POLL_STOP = 'POWER_POLL_STOP'
}

export interface RetrievePowerAction {
  type: ACTION_KEYS.POWER_RETRIEVE;
}

export interface RetrievePowerActionSuccess {
  type: ACTION_KEYS.POWER_RETRIEVE_SUCCESS;
  by: PowerInfo[];
}

export interface RetrievePowerActionFail {
  type: ACTION_KEYS.POWER_RETRIEVE_ERROR;
}

export interface PollWeatherAction {
  type: ACTION_KEYS.POWER_POLL;
}

export interface PollWeatherStopAction {
  type: ACTION_KEYS.POWER_POLL_STOP;
}

export const actionRetrievePowerSuccess = (by: PowerInfo[]): RetrievePowerActionSuccess => ({
  type: ACTION_KEYS.POWER_RETRIEVE_SUCCESS,
  by
});

export const actionRetrievePowerFail = (): RetrievePowerActionFail => ({
  type: ACTION_KEYS.POWER_RETRIEVE_ERROR,
});

export const actionRetrievePower = (): RetrievePowerAction => ({
  type: ACTION_KEYS.POWER_RETRIEVE
});

export const actionPollPower = (): PollWeatherAction => ({
  type: ACTION_KEYS.POWER_POLL
});

export const actionPollPowerStop = (): PollWeatherStopAction => ({
  type: ACTION_KEYS.POWER_POLL_STOP
});


export type PowerboardActionTypes = RetrievePowerAction
| RetrievePowerActionSuccess
| RetrievePowerActionFail
| PollWeatherAction
| PollWeatherStopAction;
