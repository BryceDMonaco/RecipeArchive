import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useSidebar } from '@/contexts/SidebarContext';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  children?: React.ReactNode;
}

function SidebarContent({ children }: SidebarProps) {
  const { close } = useSidebar();

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b px-6">
        <h1 className="text-xl font-bold tracking-tight">Recipe Archive</h1>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={close}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      <Separator />
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </>
  );
}

export function Sidebar({ children }: SidebarProps) {
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Desktop Sidebar - Always visible on md+ screens */}
      <nav
        className="hidden md:flex h-screen w-72 lg:w-80 flex-col border-r bg-background"
        aria-label="Recipe navigation"
      >
        <div className="flex h-16 items-center border-b px-6">
          <h1 className="text-xl font-bold tracking-tight">Recipe Archive</h1>
        </div>
        <Separator />
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </nav>

      {/* Mobile Sidebar - Sheet overlay on mobile screens */}
      <Sheet open={isOpen} onOpenChange={(open) => !open && close()}>
        <SheetContent side="left" className="w-80 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Recipe Navigation</SheetTitle>
          </SheetHeader>
          <nav className="flex h-full flex-col" aria-label="Recipe navigation">
            <SidebarContent>{children}</SidebarContent>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
