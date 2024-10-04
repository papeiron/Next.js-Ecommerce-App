import AddNewAddressForm from '@/components/protected/account/AddNewAddressForm';
import { Heading } from '@/components/shared/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { currentUser } from '@/lib/helpers';
import { fetchAddressesByUser } from '@/lib/services/address';
import { HiOutlinePlusSmall } from 'react-icons/hi2';

async function AddressPage() {
  const user = await currentUser();
  const addresses = await fetchAddressesByUser(user?.id as string);

  return (
    <div>
      <Heading type="heading-3" className="mb-4">
        Addresses
      </Heading>
      <div className="flex gap-3">
        {addresses.map((a) => (
          <div
            key={a.id}
            className="w-72 overflow-hidden rounded-md border hover:shadow-sm"
          >
            <div className="bg-gray-50">
              <p className="p-3">{a.title}</p>
            </div>
            <div className="p-3 text-xs">
              <p className="font-semibold">{user?.name}</p>
              <p>{a.address_line_1}</p>
              <p>{a.address_line_2}</p>
              <p>
                {a.city} / {a.country}
              </p>
              <p>{a.phone_number}</p>
            </div>
          </div>
        ))}
        <div className="group flex w-72 items-center justify-center overflow-hidden rounded-md border hover:shadow-sm">
          <Dialog>
            <DialogTrigger className="flex h-full min-h-[107px] w-full items-center justify-center">
              <HiOutlinePlusSmall className="h-8 w-8 text-gray-200 transition-colors group-hover:text-gray-300" />
            </DialogTrigger>
            <DialogContent className="max-h-[80vh] max-w-[700px] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add new address</DialogTitle>
                <DialogDescription className="w-full">
                  <AddNewAddressForm />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default AddressPage;
