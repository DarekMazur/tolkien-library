import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Root from './Root';

describe('Root', () => {
  it('renders the Home page on the default path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Root />
      </MemoryRouter>,
    );
    expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();
  });

  it('renders a Not Found page for a path that does not exist', () => {
    render(
      <MemoryRouter initialEntries={['/incorrect-path']}>
        <Root />
      </MemoryRouter>,
    );
    expect(screen.getByText(/not all those who wander/i)).toBeInTheDocument();
  });

  it('renders the correct layout depending on the path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Root />
      </MemoryRouter>,
    );
    expect(screen.getByText(/biblioteka tolkienisty/i)).toBeInTheDocument();
    expect(screen.getByText(/tolkienarium ©/i)).toBeInTheDocument();
  });

  it('renders a Login Page for /login path', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Root />
      </MemoryRouter>,
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeRequired();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeRequired();
  });

  it('matches the snapshot for the default path', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/']}>
        <Root />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for NotFound page', () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={['/incorrect-path']}>
        <Root />
      </MemoryRouter>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
