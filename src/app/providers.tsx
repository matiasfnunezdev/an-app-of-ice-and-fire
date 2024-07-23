'use client';

import { GotProvider } from './_presentation/context/got-context';

export function Providers({ children }: any): JSX.Element {
	return <GotProvider>{children}</GotProvider>;
}
