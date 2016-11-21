import axios from 'axios';
import { browserHistory } from 'react-router';

import {
	AUTH_USER,
	UNAUTH_USER,
	SIGNUP_USER,
	AUTH_ERROR,
	RESET_ERROR,
	FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ username, password }) {
	return function(dispatch) {
		// Submit username/password to server
		axios.post(`${ROOT_URL}/signin`, { username, password })
			.then((response) => {
				// If request is good...
				// - update state to indicate user is authenticated
				dispatch({ type: AUTH_USER });
				// - save the JWT token
				localStorage.setItem('token', response.data.token);
				// - redirect ro the route '/feature'
				browserHistory.push('/feature');

			})
			.catch((error) => {
				// If request is bad...
				// - show an error to the user
				dispatch(authError('Incorrect login information'));
			});
	}
}

export function signoutUser() {
	localStorage.removeItem('token');
	browserHistory.push('/');

	return { type: UNAUTH_USER };
}

export function signupUser({ username, email, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signup`, { username, email, password })
			.then((response) => {
				// If request is good...
				// - update state to indicate user is authenticated
				dispatch({ type: AUTH_USER });
				// - save the JWT token
				localStorage.setItem('token', response.data.token);
				// - redirect ro the route '/feature'
				browserHistory.push('/feature');
			})
			.catch((error) => {
				dispatch(authError(error.response.data.error));
			});
	}
}

export function fetchMessage() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/secure`, {
			headers: { Authorization: `JWT ${localStorage.getItem('token')}` }
		})
			.then((response) => {
				dispatch({
					type: FETCH_MESSAGE,
					payload: response.data.message
				});
			})
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	};
}

export function resetError() {
	return {
		type: RESET_ERROR
	};
}
