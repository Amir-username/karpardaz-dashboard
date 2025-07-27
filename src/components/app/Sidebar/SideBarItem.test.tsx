import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import SideBarItem from './SideBarItem';
import { vi } from 'vitest';

// Mock useNavigate from react-router
const navigateMock = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

// Helper function to render SideBarItem with Router
const renderSideBarItem = (text: string, link: string) => {
  return render(
    <BrowserRouter>
      <SideBarItem text={text} link={link} />
    </BrowserRouter>
  );
};

describe('SideBarItem', () => {
  it('should render the text correctly', () => {
    renderSideBarItem('Test Link', '/test-link');
    expect(screen.getByText('Test Link')).toBeInTheDocument();
  });

  it('should have correct href attribute', () => {
    renderSideBarItem('Test Link', '/test-link');
    const link = screen.getByText('Test Link').closest('a');
    expect(link).toHaveAttribute('href', '/test-link');
  });

  it('should have proper styling classes', () => {
    renderSideBarItem('Test Link', '/test-link');
    const listItem = screen.getByRole('listitem');
    
    expect(listItem).toHaveClass('text-muted-foreground');
    expect(listItem).toHaveClass('text-sm');
    expect(listItem).toHaveClass('cursor-pointer');
    expect(listItem).toHaveClass('hover:text-foreground');
    expect(listItem).toHaveClass('duration-200');
  });

  it('should render Persian text correctly', () => {
    renderSideBarItem('نمودار دستمزد', '/charts/ad-salary');
    expect(screen.getByText('نمودار دستمزد')).toBeInTheDocument();
  });

  it('should work with different link formats', () => {
    const testCases = [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Contact', link: '/contact' },
      { text: 'Nested', link: '/nested/route' },
    ];

    testCases.forEach(({ text, link }) => {
      const { unmount } = renderSideBarItem(text, link);
      const linkElement = screen.getByText(text).closest('a');
      expect(linkElement).toHaveAttribute('href', link);
      unmount();
    });
  });
}); 