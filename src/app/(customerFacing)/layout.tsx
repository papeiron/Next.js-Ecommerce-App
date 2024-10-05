import Footer from '@/components/main/footer/Footer';
import PublicHeader from '@/components/main/header/PublicHeader';
import EducationalSiteDisclaimerBanner from '@/components/shared/ui/EducationalSiteDisclaimerBanner ';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen min-h-[130vh] flex-col">
      <PublicHeader />

      <main className="flex-grow py-4">{children}</main>
      <EducationalSiteDisclaimerBanner />
      <Footer />
    </div>
  );
}

export default Layout;
