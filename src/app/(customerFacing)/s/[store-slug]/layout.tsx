import { Container } from '@/components/shared/ui';
import Image from 'next/image';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-20">
      <Container>{children}</Container>
    </div>
  );
}

export default Layout;
