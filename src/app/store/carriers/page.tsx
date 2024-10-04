import { Suspense } from 'react';

import { Box, EmptyTableBody, Heading, Search, Seperator } from '@/components/shared/ui';
import NewProductUpdateForm from '@/components/store/products/NewProductUpdateForm';
import ProductTable from '@/components/store/products/ProductTable';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddNewCarrierForm from '@/components/store/carriers/AddNewCarrierForm';
import CarrierTable from '@/components/store/carriers/CarrierTable';

type PageProps = {
  searchParams?: {
    search?: string;
  };
};

const carriersTableHeaders = [
  'ID',
  'Image',
  'Status',
  'Code',
  'Rate name',
  'Base Rate',
  'Per Kg Rate',
  'Min Weight',
  'Max Weight',
  '',
];

function CarriersPage({ searchParams }: PageProps) {
  return (
    <Box className="px-4 py-8">
      <div className="flex flex-col gap-3">
        <Heading type="heading-3">Carriers</Heading>
        <div className="flex justify-between">
          <div className="w-[250px]">
            <Suspense>
              <Search placeholder="Search anything" />
            </Suspense>
          </div>
          <div className="flex items-center">
            <div>
              <Dialog>
                <DialogTrigger className="ml-2 rounded-xl bg-orange-1 px-4 py-2 text-white active:bg-orange-400">
                  Add new carrier
                </DialogTrigger>
                <DialogContent
                  className="max-h-[80vh] max-w-[60rem] overflow-y-auto"
                  aria-describedby="create-carrier-description"
                >
                  <DialogTitle>New Carrier Form</DialogTitle>
                  <div className="max-w-full">
                    <AddNewCarrierForm />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <Seperator />

        <Suspense
          key={searchParams?.search}
          fallback={
            <EmptyTableBody cols={10} rows={12} tableHeaders={carriersTableHeaders} />
          }
        >
          <CarrierTable />
        </Suspense>
      </div>
    </Box>
  );
}

export default CarriersPage;
