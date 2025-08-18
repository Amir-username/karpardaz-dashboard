// import '@testing-library/jest-dom';
// import { render, screen } from '@testing-library/react';
// import { BrowserRouter } from 'react-router';
// import PanelCard from './PanelCard';
// import PanelCardItem from './PanelCardItem';
// import { vi } from 'vitest';

// // Mock useNavigate from react-router
// const navigateMock = vi.fn();

// vi.mock('react-router', async () => {
//   const actual = await vi.importActual('react-router');
//   return {
//     ...actual,
//     useNavigate: () => navigateMock,
//   };
// });

// // Helper function to render PanelCard with Router
// const renderPanelCard = (children: React.ReactNode) => {
//   return render(
//     <BrowserRouter>
//       <PanelCard>{children}</PanelCard>
//     </BrowserRouter>
//   );
// };

// describe('PanelCard', () => {
//   it('should render children correctly', () => {
//     const testContent = <div data-testid="test-child">Test Content</div>;
//     renderPanelCard(testContent);
    
//     expect(screen.getByTestId('test-child')).toBeInTheDocument();
//     expect(screen.getByText('Test Content')).toBeInTheDocument();
//   });

//   it('should render multiple PanelCardItem components', () => {
//     const panelItems = [
//       { title: 'Dashboard', link: '/dashboard', icon: 'dashboard' },
//       { title: 'Analytics', link: '/analytics', icon: 'analytics' },
//       { title: 'Settings', link: '/settings', icon: 'settings' },
//     ];

//     renderPanelCard(
//       <>
//         {panelItems.map((item, index) => (
//           <PanelCardItem
//             key={index}
//             title={item.title}
//             link={item.link}
//             icon={item.icon}
//           />
//         ))}
//       </>
//     );

//     // Check if all panel items are rendered
//     expect(screen.getByText('Dashboard')).toBeInTheDocument();
//     expect(screen.getByText('Analytics')).toBeInTheDocument();
//     expect(screen.getByText('Settings')).toBeInTheDocument();

//     // Check if all icons are rendered
//     expect(screen.getByText('dashboard')).toBeInTheDocument();
//     expect(screen.getByText('analytics')).toBeInTheDocument();
//     expect(screen.getByText('settings')).toBeInTheDocument();

//     // Check if all links are present
//     const links = screen.getAllByRole('link');
//     expect(links).toHaveLength(3);
//     expect(links[0]).toHaveAttribute('href', '/dashboard');
//     expect(links[1]).toHaveAttribute('href', '/analytics');
//     expect(links[2]).toHaveAttribute('href', '/settings');
//   });

//   it('should have proper main container styling', () => {
//     renderPanelCard(<div>Test</div>);
//     const main = screen.getByRole('main');
    
//     expect(main).toHaveClass('flex-2/3');
//     expect(main).toHaveClass('justify-center');
//     expect(main).toHaveClass('items-center');
//     expect(main).toHaveClass('flex');
//     expect(main).toHaveClass('h-full');
//   });

//   it('should have proper inner container styling', () => {
//     renderPanelCard(<div>Test</div>);
//     const innerContainer = screen.getByText('Test').closest('div')?.parentElement;
    
//     expect(innerContainer).toHaveClass('flex');
//     expect(innerContainer).toHaveClass('items-center');
//     expect(innerContainer).toHaveClass('justify-center');
//     expect(innerContainer).toHaveClass('gap-8');
//     expect(innerContainer).toHaveClass('py-40');
//   });

//   it('should render with empty children', () => {
//     renderPanelCard(null);
//     const main = screen.getByRole('main');
//     expect(main).toBeInTheDocument();
//   });

//   it('should render with string children', () => {
//     renderPanelCard('Simple Text');
//     expect(screen.getByText('Simple Text')).toBeInTheDocument();
//   });

//   it('should render with array of children', () => {
//     const children = [
//       <div key="1">Child 1</div>,
//       <div key="2">Child 2</div>,
//       <div key="3">Child 3</div>,
//     ];

//     renderPanelCard(children);
    
//     expect(screen.getByText('Child 1')).toBeInTheDocument();
//     expect(screen.getByText('Child 2')).toBeInTheDocument();
//     expect(screen.getByText('Child 3')).toBeInTheDocument();
//   });

//   it('should maintain proper spacing between multiple PanelCardItems', () => {
//     const panelItems = [
//       { title: 'Item 1', link: '/item1', icon: 'icon1' },
//       { title: 'Item 2', link: '/item2', icon: 'icon2' },
//       { title: 'Item 3', link: '/item3', icon: 'icon3' },
//     ];

//     renderPanelCard(
//       <>
//         {panelItems.map((item, index) => (
//           <PanelCardItem
//             key={index}
//             title={item.title}
//             link={item.link}
//             icon={item.icon}
//           />
//         ))}
//       </>
//     );

//     // All items should be rendered
//     expect(screen.getByText('Item 1')).toBeInTheDocument();
//     expect(screen.getByText('Item 2')).toBeInTheDocument();
//     expect(screen.getByText('Item 3')).toBeInTheDocument();

//     // All icons should be rendered
//     expect(screen.getByText('icon1')).toBeInTheDocument();
//     expect(screen.getByText('icon2')).toBeInTheDocument();
//     expect(screen.getByText('icon3')).toBeInTheDocument();

//     // All links should be present
//     const links = screen.getAllByRole('link');
//     expect(links).toHaveLength(3);
//   });

//   it('should work with Persian text in PanelCardItems', () => {
//     const persianItems = [
//       { title: 'پنل اول', link: '/panel1', icon: 'icon1' },
//       { title: 'پنل دوم', link: '/panel2', icon: 'icon2' },
//     ];

//     renderPanelCard(
//       <>
//         {persianItems.map((item, index) => (
//           <PanelCardItem
//             key={index}
//             title={item.title}
//             link={item.link}
//             icon={item.icon}
//           />
//         ))}
//       </>
//     );

//     expect(screen.getByText('پنل اول')).toBeInTheDocument();
//     expect(screen.getByText('پنل دوم')).toBeInTheDocument();
//   });

//   it('should handle complex nested children', () => {
//     const complexChildren = (
//       <div>
//         <PanelCardItem title="Nested Item" link="/nested" icon="nested" />
//         <div>
//           <span>Some text</span>
//           <PanelCardItem title="Deep Nested" link="/deep" icon="deep" />
//         </div>
//       </div>
//     );

//     renderPanelCard(complexChildren);

//     expect(screen.getByText('Nested Item')).toBeInTheDocument();
//     expect(screen.getByText('Deep Nested')).toBeInTheDocument();
//     expect(screen.getByText('Some text')).toBeInTheDocument();
//     expect(screen.getByText('nested')).toBeInTheDocument();
//     expect(screen.getByText('deep')).toBeInTheDocument();
//   });

//   it('should maintain accessibility structure', () => {
//     renderPanelCard(<div>Test</div>);
    
//     const main = screen.getByRole('main');
//     expect(main).toBeInTheDocument();
    
//     // The main element should be properly structured
//     expect(main.tagName).toBe('MAIN');
//   });

//   it('should render with conditional children', () => {
//     const shouldRender = true;
//     const conditionalChildren = shouldRender ? (
//       <PanelCardItem title="Conditional" link="/conditional" icon="conditional" />
//     ) : null;

//     renderPanelCard(conditionalChildren);
    
//     expect(screen.getByText('Conditional')).toBeInTheDocument();
//     expect(screen.getByText('conditional')).toBeInTheDocument();
//     expect(screen.getByRole('link')).toHaveAttribute('href', '/conditional');
//   });

//   it('should handle undefined children gracefully', () => {
//     renderPanelCard(undefined);
//     const main = screen.getByRole('main');
//     expect(main).toBeInTheDocument();
//   });
// }); 