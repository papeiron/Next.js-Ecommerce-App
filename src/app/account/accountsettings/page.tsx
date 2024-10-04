import AccountSettingsForm from '@/components/protected/account/AccountSettingsForm';
import { Heading, MiniSpinner } from '@/components/shared/ui';
import { currentUser } from '@/lib/helpers';
import { getUserById } from '@/lib/services/user';

async function AccountSettingsPage() {
  const user = await currentUser();

  const userWithStore = await getUserById(user?.id as string);

  if (!user || !userWithStore) {
    return (
      <div>
        <MiniSpinner />
      </div>
    );
  }

  return (
    <div>
      <Heading type="heading-3" className="mb-4">
        Account Settings
      </Heading>
      <div>
        <AccountSettingsForm user={userWithStore} />
      </div>
    </div>
  );
}

export default AccountSettingsPage;
