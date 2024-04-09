export class ErrorModel {
    public constructor(public message:string, public status:number) {}
}

export class RouteNotFoundErrorModel extends ErrorModel {
    public constructor(route:string) {
        super(`Route ${route} doesn't exist`, 404);
    }
}

export class ResourceNotFoundErrorModel extends ErrorModel {
    public constructor(id:number) {
        super(`ID ${id} not found`, 404)
    }
}

export class ValidationErrorModel extends ErrorModel {
    public constructor(msg:string) {
        super(msg, 400);
    }
}