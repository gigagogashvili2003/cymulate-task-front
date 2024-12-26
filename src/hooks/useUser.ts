import { useQuery, UseQueryOptions } from 'react-query';

import { TGenericResponse, TUser } from '@/types';
import { setAuthUser } from '@/store/useAuthStore';
import { getCurrentUser } from '@/services/auth/auth.service';

export const useUserQuery = (options: UseQueryOptions<TGenericResponse<{ user: TUser }>>) => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
        onSuccess: (data) => {
            const { body } = data;

            setAuthUser(body?.user!);
            return data.body;
        },
        ...options,
    });
};
