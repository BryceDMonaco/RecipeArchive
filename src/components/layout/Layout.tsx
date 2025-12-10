import { Sidebar } from './Sidebar';
import { MainContent } from './MainContent';
import { DevBanner } from './DevBanner';
import { HamburgerMenuButton } from './HamburgerMenuButton';
import { SidebarProvider } from '@/contexts/SidebarContext';

interface LayoutProps {
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
}

export function Layout({ sidebar, children }: LayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col overflow-hidden">
        <DevBanner />
        <HamburgerMenuButton />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar>{sidebar}</Sidebar>
          <MainContent>{children}</MainContent>
        </div>
      </div>
    </SidebarProvider>
  );
}
