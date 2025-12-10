import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HamburgerMenuButton } from '@/components/layout/HamburgerMenuButton';
import { SidebarProvider, useSidebar } from '@/contexts/SidebarContext';

// Helper component to display sidebar state
function SidebarStatus() {
  const { isOpen } = useSidebar();
  return <div data-testid="sidebar-status">{isOpen ? 'open' : 'closed'}</div>;
}

describe('HamburgerMenuButton', () => {
  it('renders button with correct aria-label', () => {
    render(
      <SidebarProvider>
        <HamburgerMenuButton />
      </SidebarProvider>
    );

    const button = screen.getByRole('button', { name: /open menu/i });
    expect(button).toBeInTheDocument();
  });

  it('toggles sidebar when clicked', async () => {
    const user = userEvent.setup();

    render(
      <SidebarProvider>
        <HamburgerMenuButton />
        <SidebarStatus />
      </SidebarProvider>
    );

    const button = screen.getByRole('button');
    const status = screen.getByTestId('sidebar-status');

    expect(status).toHaveTextContent('closed');

    await user.click(button);
    expect(status).toHaveTextContent('open');

    await user.click(button);
    expect(status).toHaveTextContent('closed');
  });

  it('updates aria-label based on sidebar state', async () => {
    const user = userEvent.setup();

    render(
      <SidebarProvider>
        <HamburgerMenuButton />
      </SidebarProvider>
    );

    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('aria-label', 'Open menu');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);

    expect(button).toHaveAttribute('aria-label', 'Close menu');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  it('has menu icon', () => {
    render(
      <SidebarProvider>
        <HamburgerMenuButton />
      </SidebarProvider>
    );

    const button = screen.getByRole('button');
    const svg = button.querySelector('svg');

    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass('lucide-menu');
  });
});
