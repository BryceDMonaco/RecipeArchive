import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { ReactNode } from 'react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  children?: ReactNode;
}

export function ErrorMessage({
  title = 'Error',
  message,
  children,
}: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center p-8">
      <Alert variant="destructive" className="max-w-lg">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription className="mt-2">
          {message}
          {children && <div className="mt-4">{children}</div>}
        </AlertDescription>
      </Alert>
    </div>
  );
}
