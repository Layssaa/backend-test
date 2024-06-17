// ---- UTILS EXPIRES TIMES ----
const authExpiresTimes = {
  jwt_tokens_renew: 24 * 60 * 60,
  jwt_tokens_auth:  60 * 60 * 2,
};

// ---- ERRORS MESSAGES ----
const authErrors = {
  no_token_provided: "No token provided.",
  user_not_found: "user_not_found",
  incorrect_data: "incorrect_data",
  invalid_token: "Invalid token.",
  user_already_exits: "user_already_exits",
  email_already_being_used: "email_already_being_used",
  invalid_CPF:"invalid_CPF",
  unauthorized: 'unauthorized'
};

// ---- RESPONSE MESSAGES ----
const responseMessages = {
  not_token_provide: "No token provided.",
  internal_server_error: "Internal server error.",
  invalid_token: "Invalid token.",
};

// ---- RESPONSES STATUS ----
const responseStatus = {
    ok: 200,
    bad_request: 400,
    unauthorized: 401,
    forbidden: 403,
    not_found: 404,
    not_acceptable: 406,
    internal_server_error: 500,
    service_unavailable: 503,
  };

export { authExpiresTimes, responseMessages, authErrors, responseStatus };
