import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { DevBanner } from './DevBanner';

interface LayoutProps {
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
}

export function Layout({ sidebar, children }: LayoutProps) {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <DevBanner />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar>{sidebar}</Sidebar>
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
}
