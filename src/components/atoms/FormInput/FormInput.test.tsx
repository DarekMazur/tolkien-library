import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FormInput from './FormInput';
import { vi } from 'vitest';
import { renderWithProviders } from '@/lib/providers/renderWithProviders.tsx';

describe('FormInput component', () => {
  it('should render input with provided label', () => {
    renderWithProviders(<FormInput label="Username" />);
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('should render input with the correct type', () => {
    renderWithProviders(<FormInput label="Password" type="password" />);
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('should set required attribute when isRequired is true', () => {
    renderWithProviders(<FormInput label="Email" isRequired />);
    expect(screen.getByLabelText(/Email/i)).toBeRequired();
  });

  it('should set disabled attribute when isDisabled is true', () => {
    renderWithProviders(<FormInput label="Name" isDisabled />);
    expect(screen.getByLabelText('Name')).toBeDisabled();
  });

  it('should call onChange handler when user types', async () => {
    const handleChange = vi.fn();
    renderWithProviders(<FormInput label="City" onChange={handleChange} />);
    const input = screen.getByLabelText('City');
    const user = userEvent.setup();
    await user.type(input, 'Warsaw');
    expect(handleChange).toHaveBeenCalled();
  });

  it('should set id attribute when id prop is provided', () => {
    renderWithProviders(<FormInput label="Phone" id="phone-input" />);
    expect(screen.getByLabelText('Phone')).toHaveAttribute('id', 'phone-input');
  });
});
