import { PropsWithChildren, Suspense } from 'react';

type Props = {
    disableProgress?: boolean;
};

export default function RouterWrapper(props: PropsWithChildren<Props>) {
    return <Suspense fallback={<></>}>{props.children}</Suspense>;
}
