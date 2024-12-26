import { useUserQuery } from '@/hooks/useUser';
import { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = (props: PropsWithChildren) => {
    const { children } = props;

    const { data, error, isLoading } = useUserQuery({
        refetchIntervalInBackground: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        refetchOnWindowFocus: true,
        retry: false,
    });

    if (isLoading) {
        return <></>;
    }

    if (error || !data || !data?.body) {
        return <Navigate to="/auth" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
