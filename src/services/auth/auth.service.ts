import http from '@/config/axios';
import { SigninDto, SignupDto } from './types';
import { TGenericResponse } from '@/types';

const BASE_AUTH_URL = import.meta.env.VITE_API_BASE_URL + '/auth';

export const signin = async (
    body: SigninDto
): Promise<TGenericResponse<{ tokens: { accessToken: string; refreshToken: string } }>> => {
    return await http.post(`${BASE_AUTH_URL}/signin`, body);
};

export const signup = async (dto: SignupDto) => {
    return http.post(`${BASE_AUTH_URL}/signup`, dto);
};

export const getCurrentUser = () => {
    return http.get(`${BASE_AUTH_URL}/me`);
};
