import { useUserQuery } from '@/hooks/useUser';
import { PropsWithChildren } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = (props: PropsWithChildren) => {
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

    if (!error && data && data?.body && data?.body?.user) {
        return <Navigate to="/attempts" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};

export default PublicRoute;
