/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SET_USER = 'joggy/App/SET_USER';
export const UNSET_USER = 'joggy/App/UNSET_USER';
export const LOGOUT = 'joggy/App/LOGOUT';

// global constants
// These constants can are used to show the progress
// indicators for the user. Used application wide.
export const SUBMIT_START = 'joggy/App/SUBMIT_START';
export const SUBMIT_END = 'joggy/App/SUBMIT_END';
