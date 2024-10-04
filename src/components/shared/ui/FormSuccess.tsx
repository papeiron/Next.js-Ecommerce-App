import { MdGppGood } from 'react-icons/md';

function FormSuccess({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex gap-2 items-center bg-green-100 text-green-500 p-2 rounded-md'>
      <MdGppGood className='text-green-400 min-w-[20px] min-h-[20px]' />
      {children}
    </div>
  );
}

export default FormSuccess;
