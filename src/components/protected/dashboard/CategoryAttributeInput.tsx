'use client';

import { MouseEvent, useState } from 'react';

import { Button, Heading, Input } from '@/components/shared/ui';
import { Attribute } from './NewCategoryUpdateForm';

type CategoryAttributeInputProps = {
  onCategoryAttributesChange: (s: Attribute) => void;
  selectedCategoryAttributes: Attribute[];
};

function CategoryAttributeInput({
  onCategoryAttributesChange,
  selectedCategoryAttributes,
}: CategoryAttributeInputProps) {
  const [formData, setFormData] = useState<Attribute>({
    name: '',
    type: '',
    required: '',
    options: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    let newAttribute: Attribute = {
      name: formData.name,
      type: formData.type,
      required: formData.required,
      options: formData.options,
    };

    onCategoryAttributesChange(newAttribute);
  };

  return (
    <div className="flex flex-col">
      <Heading type="heading-5" className="text-orange-500">
        Add Category Attributes
      </Heading>
      <div className="flex">
        <div className="flex w-full flex-1 flex-wrap items-start gap-1 py-8">
          {selectedCategoryAttributes.map((a, index) => (
            <p key={index} className="rounded-md border p-1">
              {a.name}
            </p>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <Input
            type="text"
            name="name"
            label="Attribute Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="type"
            label="Type"
            placeholder="number, string or multi-select"
            value={formData.type}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="required"
            label="Required"
            value={formData.required}
            placeholder="yes,no"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="options"
            label="Options?"
            placeholder="ex: 'XS,S,M,L' (multi-select should be selected)"
            value={formData.options}
            onChange={handleInputChange}
          />
          <Button type="button" onClick={handleSubmit} el="button" color="transparent">
            Create attribute
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CategoryAttributeInput;
