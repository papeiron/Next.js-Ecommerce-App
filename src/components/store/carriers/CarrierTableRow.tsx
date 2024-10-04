import { TableCell, TableRow } from '@/components/ui/table';
import { formatDate } from '@/lib/utils';
import { StoreCarrierForTable } from '@/types/Carrier';

// { value: 'id', label: 'ID' },
// { value: 'image', label: 'Image' },
// { value: 'status', label: 'Status'},
// { value: 'code', label: 'Code' },
// { value: 'rate name', label: 'Rate Name' },
// { value: 'per_kg_rate', label: 'Per Kg Rate', sortable: false },
// { value: 'min_weight', label: 'Min Weight', sortable: false },
// { value: 'max_weight', label: 'Max Weight', sortable: true },
// { value: 'created_at', label: 'Created', sortable: true },
// { value: 'updated_at', label: 'Updated', sortable: true },
// { value: ' ', label: ' ' },

type CarrierTableRowProps = {
  storeCarrier: StoreCarrierForTable;
  index: number;
};

function CarrierTableRow({ storeCarrier, index }: CarrierTableRowProps) {
  const { carrier } = storeCarrier;

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{}</TableCell>
      <TableCell>
        {' '}
        <span
          className={`inline-flex cursor-pointer items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            carrier.is_active ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-800'
          }`}
        >
          {carrier.is_active ? 'Active' : 'Inactive'}
        </span>
      </TableCell>
      <TableCell className="font-semibold">{carrier.code}</TableCell>
      <TableCell className="font-medium text-orange-1">
        {carrier.shipping_rates[0].base_rate}$
      </TableCell>
      <TableCell className="font-medium text-orange-1">
        {carrier.shipping_rates[0].per_kg_rate}$
      </TableCell>
      <TableCell>{carrier.shipping_rates[0].min_weight}kg</TableCell>
      <TableCell>{carrier.shipping_rates[0].max_weight}kg</TableCell>
      <TableCell className="soft-text">{formatDate(carrier.created_at)}</TableCell>
      <TableCell className="soft-text">{formatDate(carrier.updated_at)}</TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}

export default CarrierTableRow;
