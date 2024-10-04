import { Container } from '@/components/shared/ui';

function Layout({ children }: { children: React.ReactNode }) {
  return <Container className="h-full">{children}</Container>;
}

export default Layout;
