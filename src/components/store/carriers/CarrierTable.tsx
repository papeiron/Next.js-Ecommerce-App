import { Suspense } from 'react';

import { CustomTableHead, Seperator } from '@/components/shared/ui';
import CustomPagination from '@/components/shared/ui/Pagination';
import { TableHeader, TableRow, TableBody, Table } from '@/components/ui/table';
import ProductTableRow from '../products/ProductTableRow';
import CarrierTableRow from './CarrierTableRow';
import { fetchCarriersByStore } from '@/lib/services/carrier';
import { currentStore } from '@/lib/helpers';

const carriersTableHeaders = [
  { value: 'id', label: 'ID' },
  { value: 'image', label: 'Image' },
  { value: 'status', label: 'Status' },
  { value: 'code', label: 'Code' },
  { value: 'rate_name', label: 'Rate Name' },
  { value: 'per_kg_rate', label: 'Price per kg' },
  { value: 'min_weight', label: 'Min Weight' },
  { value: 'max_weight', label: 'Max Weight' },
  { value: 'created_at', label: 'Created', sortable: true },
  { value: 'updated_at', label: 'Updated', sortable: true },
  { value: ' ', label: ' ' },
];

async function CarrierTable() {
  const store = await currentStore();
  const storeCarriers = await fetchCarriersByStore(store?.id as string);

  return (
    <div>
      <Suspense>
        {/* <CustomPagination totalPages={totalPages} countOfProducts={countOfProducts} /> */}
      </Suspense>

      <Table className="overflow-hidden">
        <TableHeader className="bg-gray-50">
          <TableRow className="border-none">
            {carriersTableHeaders.map((head, index) => (
              <Suspense key={index}>
                <CustomTableHead tableHead={head} />
              </Suspense>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {storeCarriers?.map((carrier, index) => (
            <CarrierTableRow
              key={`${carrier.carrier_id}-${carrier.store_id}`}
              storeCarrier={carrier}
              index={index}
            />
          ))}
        </TableBody>
      </Table>
      <Seperator />
      <Suspense>
        {/* <CustomPagination totalPages={totalPages} countOfProducts={countOfProducts} /> */}
      </Suspense>
    </div>
  );
}

export default CarrierTable;
