import { Action } from '@app/core';
import { ACTION_KEYS, RetrievePowerActionSuccess } from './powerboard.action';
import { STORE_SUBSET_KEY, PowerboardState } from './powerboard.model';

export const initialState: PowerboardState = {
  Panels: []
};

const rootSelector = state => state[STORE_SUBSET_KEY] as PowerboardState;

export const panelsSelector = state => rootSelector(state).Panels;

export function powerboardReducer(state = initialState, action: RetrievePowerActionSuccess): PowerboardState {
  switch (action.type) {
    case ACTION_KEYS.POWER_RETRIEVE_SUCCESS:
      return {...state, Panels: action.by };
    default:
      return state;
  }
}
