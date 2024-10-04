import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { capitalizeOnlyFirstLetter } from '@/lib/utils';

export type SelectItem = {
  id: string;
  name: string;
};

type FormSelectInputProps = {
  selectItems: SelectItem[];
  label: string;
  onSelectChange: (value: string) => void;
  defaultValue?: string;
  value?: string;
  disabled?: boolean;
};

function FormSelectInput({
  selectItems,
  label,
  onSelectChange,
  defaultValue,
  value,
  disabled,
}: FormSelectInputProps) {
  const handleValueChange = (newValue: string) => {
    if (newValue === value) {
      onSelectChange('');
    } else {
      onSelectChange(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <Select
        onValueChange={handleValueChange}
        defaultValue={defaultValue}
        disabled={disabled}
      >
        <SelectTrigger>
          <SelectValue placeholder={`Select a ${label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectGroup>
            {selectItems?.map((item: any) => (
              <SelectItem key={item.id} value={item.id}>
                {capitalizeOnlyFirstLetter(item.name)}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default FormSelectInput;
