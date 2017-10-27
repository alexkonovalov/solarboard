import { ACTION_KEYS, PowerboardActionTypes } from './powerboard.action';
import { STORE_SUBSET_KEY, PowerboardState } from './powerboard.model';

export const initialState: PowerboardState = {
  Panels: [],
  IsError: false,
  IsLoading: false
};

const rootSelector = state => state[STORE_SUBSET_KEY] as PowerboardState;

export const panelsSelector = state => rootSelector(state).Panels;
export const isErrorSelector = state => rootSelector(state).IsError;
export const isLoadingSelector = state => rootSelector(state).IsLoading;

export function powerboardReducer(state = initialState, action: PowerboardActionTypes): PowerboardState {
  switch (action.type) {
    case ACTION_KEYS.POWER_RETRIEVE_SUCCESS:
      return {...state,
         Panels: action.by,
         IsLoading: false
        };
    case ACTION_KEYS.POWER_RETRIEVE:
      return {...state,
        IsLoading: true,
        IsError: false
      };
    case ACTION_KEYS.POWER_RETRIEVE_ERROR:
      return {...state,
        IsLoading: false,
        IsError: true
      }
    default:
      return state;
  }
}
