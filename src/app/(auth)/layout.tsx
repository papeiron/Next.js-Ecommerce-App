import Logo from '@/components/shared/ui/Logo';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="w-full border py-3">
        <nav className="mx-auto flex max-w-5xl justify-center">
          <div className="flex h-36 w-36 items-center">
            <Logo />
          </div>
        </nav>
      </header>
      <main className="flex-grow bg-gray-50">{children}</main>
    </div>
  );
}

export default Layout;
