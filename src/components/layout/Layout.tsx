import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';

interface LayoutProps {
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
}

export function Layout({ sidebar, children }: LayoutProps) {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar>{sidebar}</Sidebar>
      <MainContent>{children}</MainContent>
    </div>
  );
}
