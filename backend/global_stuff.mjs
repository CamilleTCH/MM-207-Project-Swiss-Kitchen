
export const pg_errors = {
    uniqueConstraintViolation : '23505',
    unexistantForeignKey: '23503'
};

export const http_code = {
    ok : 200,
    created : 201,
    bad_request : 400,
    unauthorized : 401,
    forbidden: 403,
    not_found: 404,
    conflict: 409,
    internal_server_error : 500
}

export const userPasswordHashRounds = 10;
