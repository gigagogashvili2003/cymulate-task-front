import http from '@/config/axios';
import { CreateAttemptDto } from './types';
import { TGenericResponse } from '@/types';

export enum AttemptStatus {
    Clicked,
    NotClicked,
}

export interface IAttempt {
    _id: string;
    receiver: string;
    sender: string;
    content: string;
    status: AttemptStatus;
}

const BASE_ATTEMPTS_URL = import.meta.env.VITE_API_BASE_URL + '/attempts';

export const createAttempt = async (dto: CreateAttemptDto) => {
    return http.post(`${BASE_ATTEMPTS_URL}/`, dto);
};

export const getAttempts = async (): Promise<TGenericResponse<{ attempts: IAttempt[] }>> => {
    return http.get(`${BASE_ATTEMPTS_URL}/`);
};
