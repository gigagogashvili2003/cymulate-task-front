import AuthPage from '@/pages/auth/AuthPage';
import { createBrowserRouter } from 'react-router-dom';
import RouterWrapper from './RouterWrapper';
import { RouterPreloader } from './RouterPreloader';
import { lazy } from 'react';
import PublicRoute from './PublicRoute';

const MainLayout = lazy(() => import('@/layout/MainLayout'));
const AttemptsPage = () => import('@/pages/attempts/AttemptsPage');

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <RouterWrapper>
                <MainLayout />
            </RouterWrapper>
        ),

        children: [
            {
                path: 'auth',
                element: (
                    <PublicRoute>
                        <AuthPage />
                    </PublicRoute>
                ),
            },

            {
                path: 'attempts',
                ...RouterPreloader(AttemptsPage, { protected: true }),
            },
        ],
    },
]);

export default router;
