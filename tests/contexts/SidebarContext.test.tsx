import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';

// Test component that uses the sidebar context
function TestComponent() {
  const { isOpen, toggle, open, close } = useSidebar();

  return (
    <div>
      <div data-testid="is-open">{isOpen ? 'open' : 'closed'}</div>
      <button onClick={toggle} data-testid="toggle-btn">
        Toggle
      </button>
      <button onClick={open} data-testid="open-btn">
        Open
      </button>
      <button onClick={close} data-testid="close-btn">
        Close
      </button>
    </div>
  );
}

describe('SidebarContext', () => {
  it('provides initial state as closed', () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    expect(screen.getByTestId('is-open')).toHaveTextContent('closed');
  });

  it('toggles sidebar state', async () => {
    const user = userEvent.setup();

    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    const toggleBtn = screen.getByTestId('toggle-btn');
    const status = screen.getByTestId('is-open');

    expect(status).toHaveTextContent('closed');

    await user.click(toggleBtn);
    expect(status).toHaveTextContent('open');

    await user.click(toggleBtn);
    expect(status).toHaveTextContent('closed');
  });

  it('opens sidebar with open function', async () => {
    const user = userEvent.setup();

    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    const openBtn = screen.getByTestId('open-btn');
    const status = screen.getByTestId('is-open');

    await user.click(openBtn);
    expect(status).toHaveTextContent('open');
  });

  it('closes sidebar with close function', async () => {
    const user = userEvent.setup();

    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    const openBtn = screen.getByTestId('open-btn');
    const closeBtn = screen.getByTestId('close-btn');
    const status = screen.getByTestId('is-open');

    // First open the sidebar
    await user.click(openBtn);
    expect(status).toHaveTextContent('open');

    // Then close it
    await user.click(closeBtn);
    expect(status).toHaveTextContent('closed');
  });

  it('throws error when useSidebar is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useSidebar must be used within SidebarProvider');

    consoleSpy.mockRestore();
  });
});
