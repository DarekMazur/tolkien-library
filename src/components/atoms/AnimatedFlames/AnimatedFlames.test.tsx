import { describe, it, expect } from 'vitest';
import AnimatedFlames from './AnimatedFlames';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';

declare module '@emotion/jest' {
  interface Matchers {
    toHaveStyleRule(property: string, value: unknown): void;
  }
}

describe('AnimatedFlames Component', () => {
  it('should render flames SVG component correctly', () => {
    renderWithProviders(<AnimatedFlames />);

    const flamesImage = screen.getByRole('img', { hidden: true });
    expect(flamesImage).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    renderWithProviders(<AnimatedFlames />);

    const flamesImage = screen.getByRole('img', { hidden: true });
    expect(flamesImage).toHaveAttribute('aria-hidden', 'true');
  });

  it('should render flame elements in proper wrapper', () => {
    const { container } = renderWithProviders(<AnimatedFlames />);

    const fireWrapper = container.firstChild;
    expect(fireWrapper).toBeInTheDocument();

    const moFireElement = container.querySelector('.mo-fire');
    expect(moFireElement).toBeInTheDocument();
  });

  it('should render SVG with flame elements', () => {
    const { container } = renderWithProviders(<AnimatedFlames />);

    const flameElements = container.querySelectorAll('.flame');
    expect(flameElements.length).toBeGreaterThan(0);

    const mainFlameElements = container.querySelectorAll('.flame-main');
    expect(mainFlameElements.length).toBeGreaterThan(0);
  });

  it('should match the rendered output with the snapshot', () => {
    const { container } = renderWithProviders(<AnimatedFlames />);
    expect(container).toMatchSnapshot();
  });
});
