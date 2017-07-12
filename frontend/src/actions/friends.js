import { createActionAsync } from 'redux-act-async';
import { API_URL } from "../constants/index";

export const getFriends = createActionAsync('GET_FRIENDS', (payload) => (async () => {
    let res = await fetch(`${API_URL}/friend?name=${payload.name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.getItem('token')
        }
    });

    return await res.json();
})());