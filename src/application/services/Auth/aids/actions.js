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
};

export function signInRequestAction({email, password}) {
	return {type: AUTH.SIGN_IN_REQUESTED, payload: {email, password}};
}

export function signInSuccessAction(user) {
	return {type: AUTH.SIGN_IN_SUCCEEDED, payload: user};
}

export function signInFailedAction(error) {
	return {type: AUTH.SIGN_IN_FAILED, payload: {error}};
}

export function signUpRequestAction({email, password, username}) {
	return {type: AUTH.SIGN_UP_REQUESTED, payload: {email, password, username}};
}

export function signUpSuccessAction(user) {
	return {type: AUTH.SIGN_UP_SUCCEEDED, payload: user};
}

export function signUpFailedAction(error) {
	return {type: AUTH.SIGN_UP_FAILED, payload: {error}};
}

export function verifyTokenRequestAction(token) {
	return {type: AUTH.VERIFY_TOKEN_REQUESTED, payload: {token}};
}

export function verifyTokenSuccessAction(user) {
	return {type: AUTH.VERIFY_TOKEN_SUCCEEDED, payload: user};
}

export function verifyTokenFailedAction(error) {
	return {type: AUTH.VERIFY_TOKEN_FAILED, payload: {error}};
}