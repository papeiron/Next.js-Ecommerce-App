'use client';

import { useState } from 'react';

interface MultiSelectProps {
  attrId: string;
  options: string[];
  value: string;
  onChange: (newValue: string[]) => void;
}

const MultiSelect = ({ attrId, options, value, onChange }: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedValues = value.split(',').filter(Boolean);

  const toggleOption = (option: string) => {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];
    onChange(newSelectedValues);
  };

  return (
    <div className="relative">
      <div
        className="cursor-pointer rounded-md border border-gray-300 p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValues.length > 0 ? selectedValues.join(', ') : 'Select options'}
      </div>
      {isOpen && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white">
          {options.map((option) => (
            <div
              key={option}
              className={`cursor-pointer p-2 hover:bg-gray-100 ${
                selectedValues.includes(option) ? 'bg-blue-100' : ''
              }`}
              onClick={() => toggleOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
