import { PowerInfo } from './powerboard.model';

export enum ACTION_KEYS {
  POWER_RETRIEVE = 'POWER_RETRIEVE',
  POWER_RETRIEVE_SUCCESS = 'POWER_RETRIEVE_SUCCESS',
  POWER_RETRIEVE_ERROR = 'POWER_RETRIEVE_ERROR',
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
  by: string;
}

export const actionRetrievePowerSuccess = (by: PowerInfo[]): RetrievePowerActionSuccess => ({
  type: ACTION_KEYS.POWER_RETRIEVE_SUCCESS,
  by
});

export const actionRetrievePowerFail = (by: string): RetrievePowerActionFail => ({
  type: ACTION_KEYS.POWER_RETRIEVE_ERROR,
  by
});

export const actionRetrievePower = (): RetrievePowerAction => ({
  type: ACTION_KEYS.POWER_RETRIEVE
});
