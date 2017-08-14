export const AUTH = {
	SIGN_IN_REQUESTED: 'SIGN_IN_REQUESTED',
	SIGN_IN_SUCCEEDED: 'SIGN_IN_SUCCEEDED',
	SIGN_IN_FAILED: 'SIGN_IN_FAILED',

	SIGN_UP_REQUESTED: 'SIGN_UP_REQUESTED',
	SIGN_UP_SUCCEEDED: 'SIGN_UP_SUCCEEDED',
	SIGN_UP_FAILED: 'SIGN_UP_FAILED',

	VERIFY_TOKEN_REQUESTED: 'VERIFY_TOKEN_REQUESTED',
	VERIFY_TOKEN_SUCCEEDED: 'VERIFY_TOKEN_SUCCEEDED',
	VERIFY_TOKEN_FAILED: 'VERIFY_TOKEN_FAILED',

	SIGN_OUT_REQUESTED: 'SIGN_OUT_REQUESTED',
	SIGN_OUT_SUCCEEDED: 'SIGN_OUT_SUCCEEDED',
	SIGN_OUT_FAILED: 'SIGN_OUT_FAILED',
};

export function signInRequestAction({email, password}) {
	return {type: AUTH.SIGN_IN_REQUESTED, payload: {email, password}};
}

export function signInSuccessAction(token) {
	return {type: AUTH.SIGN_IN_SUCCEEDED, payload: {token}};
}

export function signInFailedAction(error) {
	return {type: AUTH.SIGN_IN_FAILED, payload: {error}};
}

export function signUpRequestAction({email, password, username}) {
	return {type: AUTH.SIGN_UP_REQUESTED, payload: {email, password, username}};
}

export function signUpSuccessAction(token) {
	return {type: AUTH.SIGN_UP_SUCCEEDED, payload: {token}};
}

export function signUpFailedAction(error) {
	return {type: AUTH.SIGN_UP_FAILED, payload: {error}};
}

export function signOutRequestAction() {
	return {type: AUTH.SIGN_OUT_REQUESTED};
}

export function signOutSuccessAction() {
	return {type: AUTH.SIGN_OUT_SUCCEEDED};
}

export function signOutFailedAction(error) {
	return {type: AUTH.SIGN_OUT_FAILED, payload: {error}};
}

export function verifyTokenRequestAction(token) {
	return {type: AUTH.VERIFY_TOKEN_REQUESTED, payload: {token}};
}

export function verifyTokenSuccessAction(token) {
	return {type: AUTH.VERIFY_TOKEN_SUCCEEDED, payload: {token}};
}

export function verifyTokenFailedAction(error) {
	return {type: AUTH.VERIFY_TOKEN_FAILED, payload: {error}};
}