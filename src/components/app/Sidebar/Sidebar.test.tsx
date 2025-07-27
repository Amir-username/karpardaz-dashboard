import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import Sidebar from './Sidebar';
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

// Helper function to render Sidebar with Router
const renderSidebar = () => {
  return render(
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  );
};

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all sidebar sections', () => {
    renderSidebar();

    // Check if all main sections are rendered
    expect(screen.getByText('نمودار ها')).toBeInTheDocument();
    expect(screen.getByText('کارفرما')).toBeInTheDocument();
    expect(screen.getByText('کارجو')).toBeInTheDocument();
  });

  it('should render all chart links', () => {
    renderSidebar();

    // Expand the charts section first
    const chartsTrigger = screen.getByText('نمودار ها').closest('button');
    fireEvent.click(chartsTrigger!);

    // Check if all chart links are present
    expect(screen.getByText('نمودار دستمزد')).toBeInTheDocument();
    expect(screen.getByText('نمودار موقعیت شغلی')).toBeInTheDocument();
    expect(screen.getByText('نمودار تفکیک نقش')).toBeInTheDocument();
    expect(screen.getByText('نمودار تفکیک جنسیت')).toBeInTheDocument();
  });

  it('should render all employer links', () => {
    renderSidebar();

    // Expand the employer section
    const employerTrigger = screen.getByText('کارفرما').closest('button');
    fireEvent.click(employerTrigger!);

    // Check if all employer links are present
    expect(screen.getByText('لیست کارفرما')).toBeInTheDocument();
    expect(screen.getByText('جزئیات کارفرما')).toBeInTheDocument();
    expect(screen.getByText('لیست آگهی کارفرما')).toBeInTheDocument();
    expect(screen.getByText('لیست درخواست های کارفرما')).toBeInTheDocument();
  });

  it('should render all jobseeker links', () => {
    renderSidebar();

    // Expand the jobseeker section
    const jobseekerTrigger = screen.getByText('کارجو').closest('button');
    fireEvent.click(jobseekerTrigger!);

    // Check if all jobseeker links are present
    expect(screen.getByText('لیست کارجو')).toBeInTheDocument();
    expect(screen.getByText('جزئیات کارجو')).toBeInTheDocument();
    expect(screen.getByText('لیست آگهی کارجو')).toBeInTheDocument();
    expect(screen.getByText('لیست درخواست های')).toBeInTheDocument();
  });

  it('should have correct href attributes for chart links', () => {
    renderSidebar();

    // Expand the charts section
    const chartsTrigger = screen.getByText('نمودار ها').closest('button');
    fireEvent.click(chartsTrigger!);

    // Check href attributes
    const adSalaryLink = screen.getByText('نمودار دستمزد').closest('a');
    const positionLink = screen.getByText('نمودار موقعیت شغلی').closest('a');
    const usersLink = screen.getByText('نمودار تفکیک نقش').closest('a');
    const genderLink = screen.getByText('نمودار تفکیک جنسیت').closest('a');

    expect(adSalaryLink).toHaveAttribute('href', '/charts/ad-salary');
    expect(positionLink).toHaveAttribute('href', '/charts/position');
    expect(usersLink).toHaveAttribute('href', '/charts/users');
    expect(genderLink).toHaveAttribute('href', '/charts/gender');
  });

  it('should have correct href attributes for employer links', () => {
    renderSidebar();

    // Expand the employer section
    const employerTrigger = screen.getByText('کارفرما').closest('button');
    fireEvent.click(employerTrigger!);

    // Check href attributes
    const employersLink = screen.getByText('لیست کارفرما').closest('a');
    const employerDetailsLink = screen.getByText('جزئیات کارفرما').closest('a');
    const employerAdvertisesLink = screen.getByText('لیست آگهی کارفرما').closest('a');
    const employerRequestsLink = screen.getByText('لیست درخواست های کارفرما').closest('a');

    expect(employersLink).toHaveAttribute('href', '/employers');
    expect(employerDetailsLink).toHaveAttribute('href', '/employer-details');
    expect(employerAdvertisesLink).toHaveAttribute('href', '/employer-advertises');
    expect(employerRequestsLink).toHaveAttribute('href', '/employer-requests');
  });

  it('should have correct href attributes for jobseeker links', () => {
    renderSidebar();

    // Expand the jobseeker section
    const jobseekerTrigger = screen.getByText('کارجو').closest('button');
    fireEvent.click(jobseekerTrigger!);

    // Check href attributes
    const jobseekersLink = screen.getByText('لیست کارجو').closest('a');
    const jobseekerDetailsLink = screen.getByText('جزئیات کارجو').closest('a');
    const jobseekerAdvertisesLink = screen.getByText('لیست آگهی کارجو').closest('a');
    const jobseekerRequestsLink = screen.getByText('لیست درخواست های').closest('a');

    expect(jobseekersLink).toHaveAttribute('href', '/jobseekers');
    expect(jobseekerDetailsLink).toHaveAttribute('href', '/jobseeker-details');
    expect(jobseekerAdvertisesLink).toHaveAttribute('href', '/jobseeker-advertises');
    expect(jobseekerRequestsLink).toHaveAttribute('href', '/jobseeker-requests');
  });

  it('should expand and collapse accordion sections when clicked', () => {
    renderSidebar();

    const chartsTrigger = screen.getByText('نمودار ها').closest('button');
    const employerTrigger = screen.getByText('کارفرما').closest('button');
    const jobseekerTrigger = screen.getByText('کارجو').closest('button');

    // Initially, sections should be collapsed
    expect(screen.queryByText('نمودار دستمزد')).not.toBeInTheDocument();
    expect(screen.queryByText('لیست کارفرما')).not.toBeInTheDocument();
    expect(screen.queryByText('لیست کارجو')).not.toBeInTheDocument();

    // Click to expand charts section
    fireEvent.click(chartsTrigger!);
    expect(screen.getByText('نمودار دستمزد')).toBeInTheDocument();

    // Click to expand employer section
    fireEvent.click(employerTrigger!);
    expect(screen.getByText('لیست کارفرما')).toBeInTheDocument();

    // Click to expand jobseeker section
    fireEvent.click(jobseekerTrigger!);
    expect(screen.getByText('لیست کارجو')).toBeInTheDocument();

    // All sections should now be expanded
    expect(screen.getByText('نمودار دستمزد')).toBeInTheDocument();
    expect(screen.getByText('لیست کارفرما')).toBeInTheDocument();
    expect(screen.getByText('لیست کارجو')).toBeInTheDocument();
  });

  it('should have proper styling classes on sidebar items', () => {
    renderSidebar();

    // Expand all sections
    const chartsTrigger = screen.getByText('نمودار ها').closest('button');
    const employerTrigger = screen.getByText('کارفرما').closest('button');
    const jobseekerTrigger = screen.getByText('کارجو').closest('button');

    fireEvent.click(chartsTrigger!);
    fireEvent.click(employerTrigger!);
    fireEvent.click(jobseekerTrigger!);

    // Check that sidebar items have the expected CSS classes
    const sidebarItems = screen.getAllByRole('listitem');
    sidebarItems.forEach(item => {
      expect(item).toHaveClass('text-muted-foreground');
      expect(item).toHaveClass('text-sm');
      expect(item).toHaveClass('cursor-pointer');
      expect(item).toHaveClass('hover:text-foreground');
      expect(item).toHaveClass('duration-200');
    });
  });
}); 