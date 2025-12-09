interface MainContentProps {
  children?: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex h-screen flex-1 flex-col overflow-y-auto bg-background">
      <div className="mx-auto w-full max-w-3xl p-6 md:p-8">{children}</div>
    </main>
  );
}
