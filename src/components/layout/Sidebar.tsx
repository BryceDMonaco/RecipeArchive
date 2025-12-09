import { Separator } from '@/components/ui/separator';

interface SidebarProps {
  children?: React.ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <nav
      className="flex h-screen w-full flex-col border-r bg-background lg:w-80 md:w-72"
      aria-label="Recipe navigation"
    >
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold tracking-tight">Recipe Archive</h1>
      </div>
      <Separator />
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </nav>
  );
}
