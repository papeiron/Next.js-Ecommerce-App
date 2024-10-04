import { Button } from '@/components/shared/ui';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="mb-10 flex flex-col items-center justify-center gap-6">
        <h2 className="text-9xl font-bold">404</h2>
        <p>
          Sorry, the page you requested was{' '}
          <span className="font-semibold">not found.</span>
        </p>
        <Button el="anchor" href="/">
          Go to homepage
        </Button>
      </div>
    </div>
  );
}
