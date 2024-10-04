import { MdGppBad } from 'react-icons/md';

function FormError({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-md bg-red-100 p-2 text-sm text-red-500">
      <MdGppBad className="min-h-[20px] min-w-[20px] text-red-400" />
      {children}
    </div>
  );
}

export default FormError;
