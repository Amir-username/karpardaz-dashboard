// import '@testing-library/jest-dom';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { vi, beforeEach, afterEach, describe, it, expect } from 'vitest';
// import Theme from './Theme';

// // Mock localStorage
// const localStorageMock = {
//   getItem: vi.fn(),
//   setItem: vi.fn(),
//   removeItem: vi.fn(),
//   clear: vi.fn(),
// };
// Object.defineProperty(window, 'localStorage', {
//   value: localStorageMock,
// });

// // Mock document.querySelector
// const mockHtmlElement = {
//   classList: {
//     add: vi.fn(),
//     remove: vi.fn(),
//   },
// };

// describe('Theme', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//     // Reset document.querySelector mock
//     vi.spyOn(document, 'querySelector').mockReturnValue(mockHtmlElement as any);
//   });

//   afterEach(() => {
//     vi.restoreAllMocks();
//   });

//   it('should render theme toggle button', () => {
//     render(<Theme />);
    
//     const themeButton = screen.getByRole('button');
//     expect(themeButton).toBeInTheDocument();
//     expect(themeButton).toHaveClass('material-symbols-outlined', 'text-primary', 'cursor-pointer');
//   });

//   it('should initialize with dark theme when localStorage has no theme', () => {
//     localStorageMock.getItem.mockReturnValue(null);
    
//     render(<Theme />);
    
//     expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
//     expect(mockHtmlElement.classList.add).toHaveBeenCalledWith('dark');
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    
//     const themeButton = screen.getByRole('button');
//     expect(themeButton).toHaveTextContent('light_mode');
//   });

//   it('should initialize with dark theme when localStorage has "dark" theme', () => {
//     localStorageMock.getItem.mockReturnValue('dark');
    
//     render(<Theme />);
    
//     expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
//     expect(mockHtmlElement.classList.add).toHaveBeenCalledWith('dark');
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    
//     const themeButton = screen.getByRole('button');
//     expect(themeButton).toHaveTextContent('light_mode');
//   });

//   it('should initialize with light theme when localStorage has "light" theme', () => {
//     localStorageMock.getItem.mockReturnValue('light');
    
//     render(<Theme />);
    
//     expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
//     expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith('dark');
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    
//     const themeButton = screen.getByRole('button');
//     expect(themeButton).toHaveTextContent('dark_mode');
//   });

//   it('should toggle from dark to light theme when clicked', () => {
//     localStorageMock.getItem.mockReturnValue('dark');
    
//     render(<Theme />);
    
//     const themeButton = screen.getByRole('button');
    
//     // Initially dark theme
//     expect(themeButton).toHaveTextContent('light_mode');
//     expect(mockHtmlElement.classList.add).toHaveBeenCalledWith('dark');
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    
//     // Clear previous calls
//     vi.clearAllMocks();
    
//     // Click to toggle to light theme
//     fireEvent.click(themeButton);
    
//     expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith('dark');
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
//     expect(themeButton).toHaveTextContent('dark_mode');
//   });

//   it('should toggle from light to dark theme when clicked', () => {
//     localStorageMock.getItem.mockReturnValue('light');
    
//     render(<Theme />);
    
//     const themeButton = screen.getByRole('button');
    
//     // Initially light theme
//     expect(themeButton).toHaveTextContent('dark_mode');
//     expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith('dark');
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    
//     // Clear previous calls
//     vi.clearAllMocks();
    
//     // Click to toggle to dark theme
//     fireEvent.click(themeButton);
    
//     expect(mockHtmlElement.classList.add).toHaveBeenCalledWith('dark');
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
//     expect(themeButton).toHaveTextContent('light_mode');
//   });

//   it('should handle multiple theme toggles correctly', () => {
//     localStorageMock.getItem.mockReturnValue('dark');
    
//     render(<Theme />);
    
//     const themeButton = screen.getByRole('button');
    
//     // First toggle: dark -> light
//     fireEvent.click(themeButton);
//     expect(themeButton).toHaveTextContent('dark_mode');
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
    
//     // Second toggle: light -> dark
//     fireEvent.click(themeButton);
//     expect(themeButton).toHaveTextContent('light_mode');
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    
//     // Third toggle: dark -> light
//     fireEvent.click(themeButton);
//     expect(themeButton).toHaveTextContent('dark_mode');
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
//   });

//   it('should handle case when html element is not found', () => {
//     localStorageMock.getItem.mockReturnValue('dark');
//     vi.spyOn(document, 'querySelector').mockReturnValue(null);
    
//     render(<Theme />);
    
//     const themeButton = screen.getByRole('button');
//     fireEvent.click(themeButton);
    
//     // Should not throw error and should still update localStorage
//     expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
//   });

//   it('should use correct icon names for theme states', () => {
//     localStorageMock.getItem.mockReturnValue('dark');
    
//     render(<Theme />);
    
//     const themeButton = screen.getByRole('button');
    
//     // Dark theme should show light_mode icon
//     expect(themeButton).toHaveTextContent('light_mode');
    
//     // Toggle to light theme
//     fireEvent.click(themeButton);
    
//     // Light theme should show dark_mode icon
//     expect(themeButton).toHaveTextContent('dark_mode');
//   });
// }); 