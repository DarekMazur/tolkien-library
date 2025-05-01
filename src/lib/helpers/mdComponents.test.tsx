import { render, screen } from '@testing-library/react';
import { components } from './mdComponents';

describe('components.div', () => {
  it('renders Alert with severity="warning" when className contains "warning"', () => {
    render(
      components.div({
        className: 'some warning message',
        children: 'Warning content',
      }),
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Warning content');
  });

  it('renders Alert with severity="info" when className contains "info"', () => {
    render(
      components.div({
        className: 'info-box',
        children: 'Info content',
      }),
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Info content');
  });

  it('renders Alert with severity="error" when className contains "danger"', () => {
    render(
      components.div({
        className: 'danger-area',
        children: 'Danger content',
      }),
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Danger content');
  });

  it('renders div when className does not contain "warning", "info", or "danger"', () => {
    render(
      components.div({
        className: 'regular-class',
        children: 'Regular content',
      }),
    );
    expect(screen.getByText('Regular content').tagName).toBe('DIV');
  });

  it('renders correctly when className is undefined', () => {
    render(
      components.div({
        children: 'No className content',
      }),
    );
    expect(screen.getByText('No className content').tagName).toBe('DIV');
  });
});
