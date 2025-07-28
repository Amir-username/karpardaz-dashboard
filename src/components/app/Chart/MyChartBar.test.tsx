import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MyChartBar from './MyChartBar';
import type { ChartConfig } from '@/components/ui/chart';

// Mock the chart components to avoid complex chart rendering in tests
vi.mock('@/components/ui/chart', () => ({
  ChartContainer: ({ children, className }: { children: React.ReactNode; className: string }) => (
    <div data-testid="chart-container" className={className}>
      {children}
    </div>
  ),
  ChartLegend: ({ content }: { content: React.ReactNode }) => (
    <div data-testid="chart-legend">
      {content}
    </div>
  ),
  ChartLegendContent: () => <div data-testid="chart-legend-content" />,
  ChartTooltip: ({ content }: { content: React.ReactNode }) => (
    <div data-testid="chart-tooltip">
      {content}
    </div>
  ),
  ChartTooltipContent: () => <div data-testid="chart-tooltip-content" />,
}));

// Mock recharts components
vi.mock('recharts', () => ({
  BarChart: ({ children, data }: { children: React.ReactNode; data: any[] }) => (
    <div data-testid="bar-chart" data-chart-data={JSON.stringify(data)}>
      {children}
    </div>
  ),
  CartesianGrid: ({ vertical }: { vertical: boolean }) => (
    <div data-testid="cartesian-grid" data-vertical={vertical} />
  ),
  XAxis: ({ dataKey, tickLine, tickMargin, axisLine, tickFormatter }: any) => (
    <div 
      data-testid="x-axis" 
      data-data-key={dataKey}
      data-tick-line={tickLine}
      data-tick-margin={tickMargin}
      data-axis-line={axisLine}
      data-tick-formatter={tickFormatter ? 'function' : 'undefined'}
    />
  ),
}));

describe('MyChartBar', () => {
  const mockChartConfig: ChartConfig = {
    series1: {
      label: 'Series 1',
      color: '#8884d8',
    },
    series2: {
      label: 'Series 2', 
      color: '#82ca9d',
    },
  };

  const mockChartData = [
    { name: 'Category 1', value: 10 },
    { name: 'Category 2', value: 20 },
    { name: 'Category 3', value: 30 },
  ];

  const defaultProps = {
    title: 'Test Chart',
    chartConfig: mockChartConfig,
    chartData: mockChartData,
    chartTitle: 'name',
    children: <div data-testid="chart-children">Chart Children</div>,
  };

  it('renders the component with title', () => {
    render(<MyChartBar {...defaultProps} />);
    
    expect(screen.getByText('Test Chart')).toBeTruthy();
  });

  it('renders the chart container with correct className', () => {
    render(<MyChartBar {...defaultProps} />);
    
    const chartContainer = screen.getByTestId('chart-container');
    expect(chartContainer).toBeTruthy();
    expect(chartContainer.className).toContain('min-h-[400px]');
  });

  it('renders the bar chart with correct data', () => {
    render(<MyChartBar {...defaultProps} />);
    
    const barChart = screen.getByTestId('bar-chart');
    expect(barChart).toBeTruthy();
    expect(barChart.getAttribute('data-chart-data')).toBe(JSON.stringify(mockChartData));
  });

  it('renders the XAxis with correct props', () => {
    render(<MyChartBar {...defaultProps} />);
    
    const xAxis = screen.getByTestId('x-axis');
    expect(xAxis).toBeTruthy();
    expect(xAxis.getAttribute('data-data-key')).toBe('name');
    expect(xAxis.getAttribute('data-tick-line')).toBe('false');
    expect(xAxis.getAttribute('data-tick-margin')).toBe('10');
    expect(xAxis.getAttribute('data-axis-line')).toBe('false');
    expect(xAxis.getAttribute('data-tick-formatter')).toBe('function');
  });

  it('renders the cartesian grid with vertical false', () => {
    render(<MyChartBar {...defaultProps} />);
    
    const cartesianGrid = screen.getByTestId('cartesian-grid');
    expect(cartesianGrid).toBeTruthy();
    expect(cartesianGrid.getAttribute('data-vertical')).toBe('false');
  });

  it('renders chart tooltip and legend components', () => {
    render(<MyChartBar {...defaultProps} />);
    
    expect(screen.getByTestId('chart-tooltip')).toBeTruthy();
    expect(screen.getByTestId('chart-tooltip-content')).toBeTruthy();
    expect(screen.getByTestId('chart-legend')).toBeTruthy();
    expect(screen.getByTestId('chart-legend-content')).toBeTruthy();
  });

  it('renders children components', () => {
    render(<MyChartBar {...defaultProps} />);
    
    expect(screen.getByTestId('chart-children')).toBeTruthy();
  });

  it('renders with different chart title', () => {
    const propsWithDifferentTitle = {
      ...defaultProps,
      chartTitle: 'category',
    };
    
    render(<MyChartBar {...propsWithDifferentTitle} />);
    
    const xAxis = screen.getByTestId('x-axis');
    expect(xAxis.getAttribute('data-data-key')).toBe('category');
  });

  it('renders with different title', () => {
    const propsWithDifferentTitle = {
      ...defaultProps,
      title: 'Different Chart Title',
    };
    
    render(<MyChartBar {...propsWithDifferentTitle} />);
    
    expect(screen.getByText('Different Chart Title')).toBeTruthy();
  });

  it('renders with empty chart data', () => {
    const propsWithEmptyData = {
      ...defaultProps,
      chartData: [],
    };
    
    render(<MyChartBar {...propsWithEmptyData} />);
    
    const barChart = screen.getByTestId('bar-chart');
    expect(barChart.getAttribute('data-chart-data')).toBe('[]');
  });
}); 