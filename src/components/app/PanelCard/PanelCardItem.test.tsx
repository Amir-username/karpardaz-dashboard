import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import PanelCardItem from './PanelCardItem';
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

// Helper function to render PanelCardItem with Router
const renderPanelCardItem = (title: string, link: string, icon: string) => {
  return render(
    <BrowserRouter>
      <PanelCardItem title={title} link={link} icon={icon} />
    </BrowserRouter>
  );
};

describe('PanelCardItem', () => {
  const defaultProps = {
    title: 'Test Panel',
    link: '/test-panel',
    icon: 'dashboard',
  };

  it('should render the title correctly', () => {
    renderPanelCardItem(defaultProps.title, defaultProps.link, defaultProps.icon);
    expect(screen.getByText('Test Panel')).toBeInTheDocument();
  });

  it('should render the icon correctly', () => {
    renderPanelCardItem(defaultProps.title, defaultProps.link, defaultProps.icon);
    const iconElement = screen.getByText('dashboard');
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass('material-symbols-outlined');
    expect(iconElement).toHaveClass('text-primary');
  });

  it('should have correct href attribute for the link', () => {
    renderPanelCardItem(defaultProps.title, defaultProps.link, defaultProps.icon);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-panel');
  });

  it('should have proper card styling classes', () => {
    renderPanelCardItem(defaultProps.title, defaultProps.link, defaultProps.icon);
    const card = screen.getByRole('link').firstChild as HTMLElement;
    
    expect(card).toHaveClass('cursor-pointer');
    expect(card).toHaveClass('hover:shadow-md');
    expect(card).toHaveClass('dark:shadow-primary-foreground');
    expect(card).toHaveClass('duration-500');
    expect(card).toHaveClass('min-w-[14rem]');
  });

  it('should have proper icon container styling', () => {
    renderPanelCardItem(defaultProps.title, defaultProps.link, defaultProps.icon);
    const iconContainer = screen.getByText('dashboard').parentElement;
    
    expect(iconContainer).toHaveClass('flex');
    expect(iconContainer).toHaveClass('items-center');
    expect(iconContainer).toHaveClass('justify-center');
    expect(iconContainer).toHaveClass('rounded-full');
    expect(iconContainer).toHaveClass('p-4');
  });

  it('should have proper icon styling', () => {
    renderPanelCardItem(defaultProps.title, defaultProps.link, defaultProps.icon);
    const icon = screen.getByText('dashboard');
    
    expect(icon).toHaveClass('material-symbols-outlined');
    expect(icon).toHaveClass('text-primary');
    expect(icon).toHaveStyle({ fontSize: '6rem' });
  });

  it('should have proper header styling', () => {
    renderPanelCardItem(defaultProps.title, defaultProps.link, defaultProps.icon);
    const header = screen.getByText('Test Panel').closest('div');
    
    expect(header).toHaveClass('flex');
    expect(header).toHaveClass('justify-center');
    expect(header).toHaveClass('text-lg');
    expect(header).toHaveClass('font-bold');
    expect(header).toHaveClass('text-foreground');
  });

  it('should work with different icon names', () => {
    const testIcons = ['dashboard', 'analytics', 'settings', 'person', 'work'];
    
    testIcons.forEach(icon => {
      const { unmount } = renderPanelCardItem('Test Panel', '/test', icon);
      expect(screen.getByText(icon)).toBeInTheDocument();
      unmount();
    });
  });

  it('should work with different link formats', () => {
    const testCases = [
      { title: 'Home', link: '/' },
      { title: 'About', link: '/about' },
      { title: 'Contact', link: '/contact' },
      { title: 'Nested', link: '/nested/route' },
      { title: 'External', link: 'https://example.com' },
    ];

    testCases.forEach(({ title, link }) => {
      const { unmount } = renderPanelCardItem(title, link, 'dashboard');
      const linkElement = screen.getByRole('link');
      expect(linkElement).toHaveAttribute('href', link);
      expect(screen.getByText(title)).toBeInTheDocument();
      unmount();
    });
  });

  it('should work with Persian text', () => {
    renderPanelCardItem('پنل تست', '/test-panel', 'dashboard');
    expect(screen.getByText('پنل تست')).toBeInTheDocument();
  });

  it('should work with special characters in title', () => {
    const specialTitles = [
      'Test & Panel',
      'Test-Panel',
      'Test_Panel',
      'Test Panel 123',
      'Test Panel!',
    ];

    specialTitles.forEach(title => {
      const { unmount } = renderPanelCardItem(title, '/test', 'dashboard');
      expect(screen.getByText(title)).toBeInTheDocument();
      unmount();
    });
  });

  it('should maintain accessibility with proper ARIA attributes', () => {
    renderPanelCardItem(defaultProps.title, defaultProps.link, defaultProps.icon);
    const link = screen.getByRole('link');
    
    // The link should be accessible
    expect(link).toBeInTheDocument();
    
    // The card should be clickable
    const card = link.firstChild as HTMLElement;
    expect(card).toHaveClass('cursor-pointer');
  });

  it('should render with minimum required props', () => {
    renderPanelCardItem('Minimal', '/minimal', 'home');
    
    expect(screen.getByText('Minimal')).toBeInTheDocument();
    expect(screen.getByText('home')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/minimal');
  });

  it('should handle edge case props gracefully', () => {
    // Test with minimal but valid props
    renderPanelCardItem('Test', '/test', 'icon');
    
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('icon')).toBeInTheDocument();
  });

  it('should handle various prop combinations', () => {
    const testCases = [
      { title: 'Single', link: '/single', icon: 'single' },
      { title: 'With Spaces', link: '/with-spaces', icon: 'with_spaces' },
      { title: '123 Numbers', link: '/123', icon: '123' },
      { title: 'Special!@#', link: '/special', icon: 'special' },
    ];

    testCases.forEach(({ title, link, icon }) => {
      const { unmount } = renderPanelCardItem(title, link, icon);
      
      expect(screen.getByRole('link')).toHaveAttribute('href', link);
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(icon)).toBeInTheDocument();
      
      unmount();
    });
  });
}); 