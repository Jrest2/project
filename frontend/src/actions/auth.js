import { createActionAsync } from 'redux-act-async';
import { API_URL } from "../constants/index";

export const login = createActionAsync('SIGN_IN', (payload) => (async () => {
    let res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
    });

    return await res.json();
})());
