'use client';

import { addDays } from 'date-fns';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useFormState } from 'react-dom';

import * as actions from '@/actions/store';

import {
  Form,
  FormError,
  FormSelectInput,
  FormSuccess,
  Input,
  SubmitButton,
} from '@/components/shared/ui';
import DatePicker from '@/components/shared/ui/DatePicker';
import { ProductForTable } from '@/types';
import { ProductCategoryWith } from '@/types/Product';

type NewDiscountFormProps = {
  products: ProductForTable[];
};

function NewDiscountForm({ products }: NewDiscountFormProps) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: addDays(new Date(), 1),
    to: addDays(new Date(), 15),
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [formState, action] = useFormState(
    actions.createNewDiscount.bind(null, {
      category: selectedCategory,
      product: selectedProduct,
      date: date as DateRange,
    }),
    { errors: {} },
  );

  const handleSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate);
  };

  const selectItemsProducts = [
    ...products.map((product) => ({ id: product.id, name: product.name })),
  ];

  const selectItemsCategories = Array.from(
    new Set(
      products.flatMap((product) =>
        product.categories.map((cat: ProductCategoryWith<'category'>) => cat.category.id),
      ),
    ),
  )
    .map((id) => {
      const category = products.flatMap((product) =>
        product.categories.find(
          (cat: ProductCategoryWith<'category'>) => cat.category.id === id,
        ),
      );

      return {
        id: id,
        name: category[0]?.category.name || '',
      };
    })
    .filter((category) => category.name.trim() !== '');

  const handleProductChange = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === selectedCategory) setSelectedCategory('');
    setSelectedCategory(categoryId);
  };

  return (
    <Form action={action}>
      <Input
        type="text"
        name="name"
        id="name"
        label="Discount name"
        error={formState.errors?.name}
      />

      <Input
        type="text"
        name="description"
        id="description"
        label="Description"
        error={formState.errors?.description}
      />

      <Input
        type="number"
        name="discount_percent"
        id="discount_percent"
        label="Discount Percent"
        error={formState.errors?.discount_percent}
      />

      <div className="flex flex-col gap-2">
        <label>Date</label>
        <DatePicker dateRange={date} setDateRange={handleSelect} />
        {formState.errors?.date && <FormError>{formState.errors?.date}</FormError>}
      </div>

      <div className="flex flex-col gap-2">
        <FormSelectInput
          selectItems={selectItemsCategories || []}
          label="Category"
          onSelectChange={handleCategoryChange}
          value={selectedCategory || ''}
          disabled={!!selectedProduct}
        />
        {formState.errors?.categories && (
          <FormError>{formState.errors?.categories}</FormError>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <FormSelectInput
          selectItems={selectItemsProducts || []}
          label="Products"
          onSelectChange={handleProductChange}
          value={selectedProduct || ''}
          disabled={!!selectedCategory}
        />

        {formState.errors?.product && <FormError>{formState.errors?.product}</FormError>}
      </div>

      {formState.success?.message && (
        <FormSuccess>{formState.success.message}</FormSuccess>
      )}

      <SubmitButton>Add</SubmitButton>
    </Form>
  );
}

export default NewDiscountForm;
