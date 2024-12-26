import { HttpStatusCode } from 'axios';

export type TGenericResponse<B = null> = {
    message?: string;
    status: HttpStatusCode;
    body?: B;
    success?: boolean;
};

export type TUser = {
    fullName: string;
    id: string;
    email: string;
};
