/*
 * LoginConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SUBMIT = 'app/LoginPage/SUBMIT';
export const COOKIE_LOGIN = 'app/LoginPage/COOKIE_LOGIN';

// Form constants
export const FORM_NAME = 'login';
export const FORM_FIELD_EMAIL = 'email';
export const FORM_FIELD_PASSWORD = 'password';
export const FORM_FIELD_SUBMIT = 'submit';
