export class ErrorModel {
    public constructor(public message:string, public status:number) {}
}

export class RouteNotFoundErrorModel extends ErrorModel {
    public constructor(route:string) {
        // Create with error status 404 (page not found)
        super(`Route ${route} doesn't exist`, 404);
    }
}

export class ResourceNotFoundErrorModel extends ErrorModel {
    public constructor(resource:string) {
        // Create with error status 404 (not found)
        super(`${resource} not found`, 404)
    }
}

export class ValidationErrorModel extends ErrorModel {
    public constructor(msg:string) {
        // Create with error status 400 (bad request)
        super(msg, 400);
    }
}

export class AuthenticationErrorModel extends ErrorModel {
    public constructor(msg:string) {
        // Create with error status 401 (unauthorised)
        super(msg, 401);
    }
}

export class ResourceExistsErrorModel extends ErrorModel {
    public constructor(msg:string) {
        // Create with error status 409 (conflict) indicating that the error is due to a conflict being created (such as existing username for example)
        super(msg, 409);
    }
}

export class ForbiddenErrorModel extends ErrorModel {
    public constructor(msg:string) {
        // Create with error status 403 (forbidden)
        super(msg, 403);
    }
}
