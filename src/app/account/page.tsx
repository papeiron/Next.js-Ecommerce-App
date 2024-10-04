import Image from 'next/image';

import Button from '@/components/shared/ui/Button';
import { currentUser } from '@/lib/helpers';
import AccountImg from '/public/account-shop.jpg';

async function AccountPage() {
  const user = await currentUser();

  return (
    <div className="flex gap-2">
      <div className="flex flex-1 flex-col justify-center">
        {user?.store ? (
          <div className="flex flex-col gap-6">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              Go to your
              <mark className="rounded bg-orange-1 px-1 text-white dark:bg-blue-500">
                store!
              </mark>
            </h1>
            <div>
              <Button el="anchor" href="/store/mystore">
                Store dashboard
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
              Launch Your
              <mark className="rounded bg-orange-1 px-1 text-white dark:bg-blue-500">
                store
              </mark>
              and Reach Millions!
            </h1>
            <p>
              Start your own store today and reach millions of potential customers
              effortlessly!
            </p>
            <div>
              <Button el="anchor" href="/account/store-application">
                Start now!
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1">
        <Image src={AccountImg} alt="Account Image" />
      </div>
    </div>
  );
}

export default AccountPage;
