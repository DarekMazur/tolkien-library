import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Wrapper from './Wrapper';

describe('Wrapper', () => {
  it('renders children', () => {
    render(<Wrapper>Test content</Wrapper>);
    expect(screen.getByText(/test content/i)).toBeInTheDocument();
  });

  it('renders complex children elements', () => {
    render(
      <Wrapper>
        <div data-testid="child-element">
          <span>Test span element</span>
        </div>
      </Wrapper>,
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText(/test span element/i)).toBeInTheDocument();
  });

  it('renders Paper component as main HTML element', () => {
    const { container } = render(<Wrapper>Test</Wrapper>);
    const mainElement = container.querySelector('main');
    expect(mainElement).toBeInTheDocument();
  });

  it('has elevation=2 attribute', () => {
    const { container } = render(<Wrapper>Test</Wrapper>);
    const paperElement = container.firstChild;
    expect(paperElement).toHaveClass('MuiPaper-elevation2');
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Wrapper>Snapshot test</Wrapper>);
    expect(asFragment()).toMatchSnapshot();
  });
});
