import { Action } from '@app/core';
import { ACTION_KEYS, RetrievePowerActionSuccess } from './powerboard.action';

export const initialState = {
};

export const SETTINGS_KEY = 'SETTINGS';
export const SETTINGS_REQUEST_PANEL_DATA = 'SETTINGS_REQUEST_PANEL_DATA';
export const SETTINGS_REQUEST_PANEL_DATA_SUCCESS = 'SETTINGS_REQUEST_PANEL_DATA_SUCCESS';

export const requestPanelSuccess = (panels: string[]) => ({
  type: SETTINGS_REQUEST_PANEL_DATA_SUCCESS,
  payload: panels
});

export const requestPanelData = (payload: any) => ({
  type: SETTINGS_REQUEST_PANEL_DATA,
  payload: payload
});

export const selectorSettings = state => state.settings || { theme: '' };

export function powerboardReducer(state = initialState, action: RetrievePowerActionSuccess) {
  switch (action.type) {
    case ACTION_KEYS.POWER_RETRIEVE_SUCCESS:
      console.log('settingsReduce    case ACTION_KEYS.POWER_RETRIEVE_SUCCESS:');
      return {...state, panels: action.by };
    default:
      return state;
  }
}
