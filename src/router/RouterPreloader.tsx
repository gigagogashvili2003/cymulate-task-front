/* eslint-disable @typescript-eslint/no-explicit-any */
import { ComponentType, LazyExoticComponent, lazy } from 'react';
import { LoaderFunction } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import RouterWrapper from './RouterWrapper';

type RouterPreloaderProps = {
    loader?: LoaderFunction;
    render?: (component: LazyExoticComponent<ComponentType<any>>) => JSX.Element;
    protected?: boolean;
    disableProgress?: boolean;
};

export const RouterPreloader = (
    componentLoader: () => Promise<{ default: ComponentType<any> }>,
    props?: RouterPreloaderProps
): {
    loader: LoaderFunction;
    element: React.ReactNode | null;
} => {
    return {
        loader: async (options) => {
            try {
                let response: unknown = null;
                if (props?.loader) {
                    response = await props.loader(options);
                    if (response instanceof Response) {
                        return response;
                    }
                }
                await componentLoader();
                sessionStorage.removeItem('RELOAD_RETRIED');
                return response ?? null;
            } catch (error) {
                console.error(error);
                if (!sessionStorage.getItem('RELOAD_RETRIED')) {
                    sessionStorage.setItem('RELOAD_RETRIED', '1');
                    window.location.reload();
                } else {
                    throw error;
                }
                return null;
            }
        },
        element: (
            <RouterPreloaderElementWrapper
                componentLoader={componentLoader}
                disableProgress={props?.disableProgress}
                protected={props?.protected}
            />
        ),
    };
};

type RouterPreloaderElementWrapperProps = {
    componentLoader: () => Promise<{ default: ComponentType<any> }>;
    disableProgress?: boolean;
    protected?: boolean;
    render?: (component: LazyExoticComponent<ComponentType<any>>) => JSX.Element;
};

function RouterPreloaderElementWrapper(props: RouterPreloaderElementWrapperProps) {
    const LazyComponent = lazy(props.componentLoader);
    if (props.protected) {
        return (
            <RouterWrapper>
                <ProtectedRoute>{props.render ? props.render(LazyComponent) : <LazyComponent />}</ProtectedRoute>
            </RouterWrapper>
        );
    }
    return <RouterWrapper>{props.render ? props.render(LazyComponent) : <LazyComponent />}</RouterWrapper>;
}
