'use client';

import React, { useState } from 'react';
import { useFormState } from 'react-dom';

import { updateAccountSettings } from '@/actions/account';
import { Button, FormError, Input, SubmitButton } from '@/components/shared/ui';
import { UserForAccountSetings } from '@/types';
import { ChevronRight, Lock, Mail, Shield, ShieldAlert, User } from 'lucide-react';

import { HiOutlineShieldCheck, HiOutlineShieldExclamation } from 'react-icons/hi2';

type SettingsItemProps = {
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
};

const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`mb-4 rounded-md border bg-white p-5 ${className}`}>{children}</div>
);

const SwitchButton = ({
  checked,
  onCheckedChange,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}) => {
  return (
    <button
      type="submit"
      aria-pressed={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-green-500' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

const SettingsItem = ({
  icon: Icon,
  title,
  description,
  children,
}: SettingsItemProps) => (
  <Card>
    <div className="mb-2 flex items-center gap-4">
      <Icon className="h-6 w-6 text-orange-500" />
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
    <div className="mx-10">{children}</div>
  </Card>
);

const AccountSettingsForm = ({ user }: { user: UserForAccountSetings }) => {
  const [switchState, setSwitchState] = useState<boolean>(
    user.isTwoFactorEnabled as boolean,
  );
  const [formState, action] = useFormState(
    updateAccountSettings.bind(null, { userId: user.id as string }),
    { errors: {} },
  );
  const [isEditing, setIsEditing] = useState<{ [key: string]: string | boolean }>();

  const handleCheckedChange = (newValue: boolean) => {
    setSwitchState(newValue);
  };

  return (
    <form action={action} className="max-w-2xl">
      <SettingsItem
        icon={Mail}
        title="Email Address"
        description="Manage your email address"
      >
        {isEditing?.email ? (
          <div className="flex items-center gap-2">
            <Input type="email" defaultValue={user.email || ''} name="email" />
            <SubmitButton>Save</SubmitButton>
            <Button
              el="button"
              color="transparent"
              onClick={() => setIsEditing({ email: false })}
              type="button"
            >
              Cancel
            </Button>
            {formState.errors?.email && <FormError>{formState.errors?.email}</FormError>}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-gray-500">{user.email}</span>
            <Button
              el="button"
              color="transparent"
              onClick={() => setIsEditing({ email: true })}
              className="flex items-center"
              type="button"
            >
              Edit <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </SettingsItem>

      <SettingsItem icon={User} title="Name" description="Manage your display name">
        {isEditing?.name ? (
          <div className="flex items-center gap-2">
            <Input type="text" defaultValue={user.name || ''} name="name" />
            <SubmitButton>Save</SubmitButton>
            <Button
              el="button"
              color="transparent"
              onClick={() => setIsEditing({ name: false })}
              type="button"
            >
              Cancel
            </Button>
            {formState.errors?.name && <FormError>{formState.errors?.name}</FormError>}
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-gray-500">{user.name}</span>
            <Button
              el="button"
              color="transparent"
              onClick={() => setIsEditing({ name: true })}
              className="flex items-center"
              type="button"
            >
              Edit <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </SettingsItem>

      <SettingsItem
        icon={Lock}
        title="Password"
        description="Manage your account password"
      >
        {isEditing?.password ? (
          <div className="flex items-center gap-2">
            <Input type="password" placeholder="Enter new password" name="password" />
            <SubmitButton>Save</SubmitButton>
            <Button
              el="button"
              color="transparent"
              onClick={() => setIsEditing({ password: false })}
              type="button"
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-gray-500">••••••••</span>
            <Button
              el="button"
              color="transparent"
              onClick={() => setIsEditing({ password: true })}
              className="flex items-center"
              type="button"
            >
              Change <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            {formState.errors?.password && (
              <FormError>{formState.errors?.password}</FormError>
            )}
          </div>
        )}
      </SettingsItem>

      <SettingsItem
        icon={user.isTwoFactorEnabled ? HiOutlineShieldCheck : HiOutlineShieldExclamation}
        title="Two-factor Authentication"
        description="Manage your account security"
      >
        <div className="flex items-center justify-between">
          {user.isTwoFactorEnabled ? (
            <span className="text-green-500">Enabled</span>
          ) : (
            <span className="text-gray-500">Disabled</span>
          )}

          <SwitchButton checked={switchState} onCheckedChange={handleCheckedChange} />
        </div>
      </SettingsItem>
      <input type="hidden" name="switchState" value={switchState ? 'true' : 'false'} />
    </form>
  );
};

export default AccountSettingsForm;
