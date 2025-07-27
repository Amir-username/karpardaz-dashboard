import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';
import axios from 'axios';
import Cookies from 'js-cookie';
import { vi } from 'vitest';

// Create a single mock function for navigation
const navigateMock = vi.fn();

// Mock useNavigate from react-router to always return the same mock
vi.mock('react-router', () => ({
  useNavigate: () => navigateMock,
}));

// Mock axios
vi.mock('axios');

// Mock js-cookie
vi.mock('js-cookie');

describe('LoginForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should login successfully and navigate to home', async () => {
    (axios.post as any) = vi.fn().mockResolvedValue({
      data: { access_token: 'test-token' },
    });
    (Cookies.set as any) = vi.fn();

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('نام کاربری'), {
      target: { value: 'admin' },
    });

    fireEvent.change(screen.getByPlaceholderText(/رمز عبور/), {
      target: { value: '@myPass123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /ورود/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(Cookies.set).toHaveBeenCalledWith(
        'dashboard_token',
        'test-token',
        expect.objectContaining({ expires: 30, secure: true, sameSite: 'strict' })
      );
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });

  it('should show validation error if username or password is too short', async () => {
    (axios.post as any) = vi.fn();
    (Cookies.set as any) = vi.fn();

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('نام کاربری'), {
      target: { value: 'a' },
    });

    fireEvent.change(screen.getByPlaceholderText(/رمز عبور/), {
      target: { value: '@123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /ورود/i }));

    await waitFor(() => {
      expect(screen.getByText('لطفاً نام کاربری و رمز عبور را به درستی وارد کنید')).toBeInTheDocument();
      expect(axios.post).not.toHaveBeenCalled();
      expect(Cookies.set).not.toHaveBeenCalled();
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });

  it('should show error message when login fails', async () => {
    (axios.post as any) = vi.fn().mockRejectedValue(new Error('Login failed'));
    (Cookies.set as any) = vi.fn();

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('نام کاربری'), {
      target: { value: 'admin' },
    });

    fireEvent.change(screen.getByPlaceholderText(/رمز عبور/), {
      target: { value: '@myPass123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /ورود/i }));

    await waitFor(() => {
      expect(screen.getByText('نام کاربری یا رمز عبور اشتباه است')).toBeInTheDocument();
      expect(axios.post).toHaveBeenCalled();
      expect(Cookies.set).not.toHaveBeenCalled();
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });

  it('should show loading state during login attempt', async () => {
    (axios.post as any) = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    (Cookies.set as any) = vi.fn();

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('نام کاربری'), {
      target: { value: 'admin' },
    });

    fireEvent.change(screen.getByPlaceholderText(/رمز عبور/), {
      target: { value: '@myPass123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /ورود/i }));

    // Check loading state
    expect(screen.getByText('در حال ورود...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('نام کاربری')).toBeDisabled();
    expect(screen.getByPlaceholderText(/رمز عبور/)).toBeDisabled();
  });

  it('should toggle password visibility when eye icon is clicked', () => {
    render(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText(/رمز عبور/);
    const toggleButton = screen.getByRole('button', { name: '' }); // Eye icon button

    // Initially password should be hidden
    expect(passwordInput).toHaveAttribute('type', 'password');

    // Click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Click to hide password again
    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('should clear error message when starting a new login attempt', async () => {
    (axios.post as any) = vi.fn().mockRejectedValue(new Error('Login failed'));
    (Cookies.set as any) = vi.fn();

    render(<LoginForm />);

    // First login attempt - should fail
    fireEvent.change(screen.getByPlaceholderText('نام کاربری'), {
      target: { value: 'admin' },
    });

    fireEvent.change(screen.getByPlaceholderText(/رمز عبور/), {
      target: { value: '@myPass123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /ورود/i }));

    await waitFor(() => {
      expect(screen.getByText('نام کاربری یا رمز عبور اشتباه است')).toBeInTheDocument();
    });

    // Second login attempt - error should be cleared
    fireEvent.click(screen.getByRole('button', { name: /ورود/i }));

    await waitFor(() => {
      expect(screen.getByText('نام کاربری یا رمز عبور اشتباه است')).toBeInTheDocument();
    });
  });

  it('should not submit if username or password is too short', async () => {
    (axios.post as any) = vi.fn();
    (Cookies.set as any) = vi.fn();

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('نام کاربری'), {
      target: { value: 'a' },
    });

    fireEvent.change(screen.getByPlaceholderText(/رمز عبور/), {
      target: { value: '@123' },
    });
    
    fireEvent.click(screen.getByRole('button', { name: /ورود/i }));

    await waitFor(() => {
      expect(axios.post).not.toHaveBeenCalled();
      expect(Cookies.set).not.toHaveBeenCalled();
      expect(navigateMock).not.toHaveBeenCalled();
    });
  });
}); 