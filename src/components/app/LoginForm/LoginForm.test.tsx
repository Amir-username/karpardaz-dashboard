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