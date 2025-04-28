import { JSX, PropsWithChildren } from 'react';

import { render } from '@testing-library/react';

import AppProviders from './AppProviders.tsx';

export const renderWithProviders = (children: PropsWithChildren<JSX.Element>) => {
  return render(<AppProviders>{children}</AppProviders>);
};
