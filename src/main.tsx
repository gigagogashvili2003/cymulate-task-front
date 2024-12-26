import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

import { ToastContainer } from 'react-toastify';

// CSS
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ToastContainer position="bottom-center" limit={1} theme="light" />
            <RouterProvider router={router} />
        </QueryClientProvider>
    </StrictMode>
);
