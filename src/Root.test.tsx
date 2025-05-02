import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Root from './Root';

describe('Root', () => {
  it('renderuje stronę Home na ścieżce domyślnej', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Root />
      </MemoryRouter>,
    );
    expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();
  });

  it('renderuje stronę Not Found dla nieistniejącej ścieżki', () => {
    render(
      <MemoryRouter initialEntries={['/nieistniejaca-strona']}>
        <Root />
      </MemoryRouter>,
    );
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('renderuje poprawny layout w zależności od ścieżki', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Root />
      </MemoryRouter>,
    );
    expect(screen.getByText(/biblioteka tolkienisty/i)).toBeInTheDocument();
    expect(screen.getByText(/tolkienarium ©/i)).toBeInTheDocument();
  });
});
