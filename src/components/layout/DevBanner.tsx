import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'recipe-archive-banner-dismissed';

export function DevBanner() {
  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  useEffect(() => {
    // Check if banner was dismissed on mount
    const dismissed = localStorage.getItem(STORAGE_KEY) === 'true';
    setIsDismissed(dismissed);
  }, []);

  if (isDismissed) {
    return null;
  }

  return (
    <div className="bg-destructive text-destructive-foreground relative">
      <div className="container mx-auto px-4 py-2 text-center text-sm font-medium">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-2 top-1/2 -translate-y-1/2 h-6 w-6 text-destructive-foreground hover:bg-destructive-foreground/20"
          onClick={handleDismiss}
          aria-label="Dismiss banner"
        >
          <X className="h-4 w-4" />
        </Button>
        ⚠️ This site is currently in development and is a work in progress
      </div>
    </div>
  );
}
