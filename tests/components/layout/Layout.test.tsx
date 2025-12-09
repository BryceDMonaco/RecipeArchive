import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Layout } from '@/components/layout/Layout';

describe('Layout', () => {
  it('renders sidebar and main content areas', () => {
    render(
      <Layout sidebar={<div>Sidebar Content</div>}>
        <div>Main Content</div>
      </Layout>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders sidebar content', () => {
    render(
      <Layout sidebar={<div>Test Sidebar</div>}>
        <div>Main Content</div>
      </Layout>
    );

    expect(screen.getByText('Test Sidebar')).toBeInTheDocument();
  });

  it('renders main content', () => {
    render(
      <Layout sidebar={<div>Sidebar</div>}>
        <div>Test Main Content</div>
      </Layout>
    );

    expect(screen.getByText('Test Main Content')).toBeInTheDocument();
  });

  it('renders Recipe Archive heading in sidebar', () => {
    render(
      <Layout sidebar={<div>Sidebar</div>}>
        <div>Main</div>
      </Layout>
    );

    expect(
      screen.getByRole('heading', { name: /recipe archive/i })
    ).toBeInTheDocument();
  });

  it('applies correct layout styles', () => {
    render(
      <Layout sidebar={<div>Sidebar</div>}>
        <div>Main</div>
      </Layout>
    );

    const container = screen.getByRole('navigation').parentElement;
    expect(container).toHaveClass('flex');
  });
});
