'use client';

import { useState } from 'react';
import { useFormState } from 'react-dom';

import createNewCategory from '@/actions/dashboard/create-new-category';
import { Form, FormSuccess, Input, SubmitButton } from '@/components/shared/ui';
import HierarchicalCategorySelector from '@/components/store/products/HierarchicalCategorySelector';
import { SelectedCategories } from '@/components/store/products/NewProductUpdateForm';
import { CategoryForSidebar } from '@/types';
import CategoryAttributeInput from './CategoryAttributeInput';

type NewCategoryUpdateFormProps = {
  categoriesData: CategoryForSidebar[];
};

export type Attribute = {
  name: string;
  type: string;
  required: string;
  options: string;
};

function NewCategoryUpdateForm({ categoriesData }: NewCategoryUpdateFormProps) {
  const [selectedParentCategories, setSelectedParentCategories] = useState<
    SelectedCategories[] | []
  >([]);
  const [selectedCategoryAttributes, setSelectedCategoryAttributes] = useState<
    Attribute[]
  >([]);
  const mainCategories = categoriesData.filter((cat) => cat.parent_id === null);

  const [formState, action] = useFormState(
    createNewCategory.bind(null, {
      categories: selectedParentCategories,
      attributes: selectedCategoryAttributes,
    }),
    { errors: {} },
  );

  const handleCategoryAttributes = (newAttribute: Attribute) => {
    setSelectedCategoryAttributes([...selectedCategoryAttributes, newAttribute]);
  };

  const handleCategoryChange = ({ catId, catSlug, catName }: SelectedCategories) => {
    let newCategory = { catId: catId, catSlug: catSlug, catName: catName };
    if (selectedParentCategories.some((scat) => scat.catId === catId)) {
      const newselectedParentCategories = selectedParentCategories.filter(
        (scat) => scat.catId !== catId,
      );
      setSelectedParentCategories(newselectedParentCategories);
    } else {
      setSelectedParentCategories([...selectedParentCategories, newCategory]);
    }
  };

  const handleDeleteCategories = () => {
    setSelectedParentCategories([]);
  };

  return (
    <Form action={action}>
      <Input
        type="text"
        name="name"
        label="Category Name"
        error={formState.errors?.name}
      />
      <Input
        type="text"
        name="description"
        label="Description"
        error={formState.errors?.description}
      />
      <HierarchicalCategorySelector
        mainCategories={mainCategories}
        onCategoryChange={handleCategoryChange}
        selectedCategories={selectedParentCategories}
        onDeleteCategories={handleDeleteCategories}
      />

      <CategoryAttributeInput
        selectedCategoryAttributes={selectedCategoryAttributes}
        onCategoryAttributesChange={handleCategoryAttributes}
      />
      {formState.success?.message && (
        <FormSuccess>{formState.success?.message}</FormSuccess>
      )}

      <SubmitButton>Create</SubmitButton>
    </Form>
  );
}

export default NewCategoryUpdateForm;
