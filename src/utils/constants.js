/**
 * Standard response for successful HTTP requests.
 * The actual response will depend on the request method used
 */
export const REQUEST_SUCCESS = 200;

/**
 * The server cannot or will not process the request due
 *  to an apparent client error
 */
export const BAD_REQUEST = 400;

/**
 * Similar to 403 Forbidden, but specifically for use when
 * authentication is required and has failed or has not yet
 * been provided
 */
export const UNAUTHORIZED = 401;

/**
 * The request was a valid request, but the server is refusing to
 *  respond to it. The user might be logged in but does not have
 *  the necessary permissions for the resource. */
export const FORBIDDEN = 403;

/**
 * The requested resource could not be found but may be available
 * in the future. Subsequent requests by the client are permissible
 *  */
export const NOT_FOUND = 404;

/**
 * The request was well-formed but was unable to be followed
 *  due to semantic errors
 */
export const UNPROCESSABLE_ENTITY = 422;

/**
 * A generic error message, given when an unexpected condition
 *  was encountered and no more specific message is suitable
 */
export const INTERNAL_SERVER_ERROR = 500;

export const MAX_PRICE_VALUE = 10000;