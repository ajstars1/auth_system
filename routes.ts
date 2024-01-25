/**
 * An array of routes that are accessible to the public.
 * These routes are not protected by authentication.
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification",
];

/**
 * An array of routes that are used for authentication.
 * These routes will redirect logged in users to /settings.
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
];


/**
 * The prefix for API authentication routes.
 * Routes that start with this prefix are used for API authentication processes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";


/**
 * The default redirect path after logging In.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";