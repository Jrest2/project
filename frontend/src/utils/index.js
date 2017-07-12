import { createReducer } from 'redux-act';

export const defaultState = {
    loading: false,
    request: null,
    data: null,
    error: null
};

export const asyncReducer = (actionAsync, userObj = {}, initState = defaultState) => {
    let obj = {
        [actionAsync.request]: (state, payload) => ({
            ...state,
            request: payload,
            loading: true,
            error: null
        }),
        [actionAsync.ok]: (state, payload) => ({
            ...state,
            loading: false,
            data: payload.response
        }),
        [actionAsync.error]: (state, payload) => ({
            ...state,
            loading: false,
            error: payload.error
        }),
        // [actionAsync.reset]: () => (defaultsState)
    };

    return createReducer(Object.assign(obj, userObj), initState);
};