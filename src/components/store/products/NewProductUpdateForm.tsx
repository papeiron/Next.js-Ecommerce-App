'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

import { uploadImageProductForm } from '@/lib/services/image';
import * as actions from '@/actions/store';
import {
  Form,
  FormError,
  FormSuccess,
  ImageInput,
  Input,
  SubmitButton,
  TextArea,
} from '@/components/shared/ui';

import { CategoryForSidebar, ProductForTable } from '@/types';
import type { ProductImage } from '@prisma/client';
import AttributeInput from './AttributeInput';
import HierarchicalCategorySelector from './HierarchicalCategorySelector';

type NewProductFormProps = {
  categoriesData: CategoryForSidebar[];
  productToEdit?: ProductForTable;
};

export type SelectedCategories = {
  catId: string;
  catSlug: string;
  catName: string;
};

function attributeFormatter(inputData: any) {
  return Object.entries(inputData).map(([category_id, value]) => ({
    category_attribute_id: category_id as string,
    value: value as string,
  }));
}

function NewProductUpdateForm({ categoriesData, productToEdit }: NewProductFormProps) {
  const [selectedCategories, setSelectedCategories] = useState<SelectedCategories[] | []>(
    [],
  );
  const [uploadedImagesUrls, setUploadedImageUrls] = useState<string[]>([]);
  const [productAttributes, setProductAttributes] = useState<{ [key: string]: string }>(
    {},
  );

  const formRef = useRef<HTMLFormElement>(null);
  const isEditMode = !!productToEdit;

  const mainCategories = useMemo(() => {
    return categoriesData.filter((cat) => cat.parent_id === null);
  }, [categoriesData]);

  useEffect(() => {
    if (isEditMode && productToEdit) {
      const editProductCategories = productToEdit.categories.map((cat) => ({
        catId: cat.category.id,
        catName: cat.category.name,
        catSlug: cat.category.slug,
      }));

      setSelectedCategories(editProductCategories);

      let existsAttributes: { [key: string]: string } = {};
      productToEdit.attributes.forEach(
        (a) => (existsAttributes[a.category_attribute_id] = a.value),
      );

      setProductAttributes(existsAttributes);

      const imageUrls = productToEdit.image.map((img: ProductImage) => img.url);

      setUploadedImageUrls(imageUrls);
    }
  }, [isEditMode, productToEdit]);

  const [formState, action] = useFormState(
    isEditMode
      ? actions.editProduct.bind(null, {
          images: uploadedImagesUrls,
          categories: selectedCategories,
          productId: productToEdit.id,
          attributes: attributeFormatter(productAttributes),
        })
      : actions.createNewProduct.bind(null, {
          images: uploadedImagesUrls,
          categories: selectedCategories,
          attributes: attributeFormatter(productAttributes),
        }),
    {
      errors: {},
    },
  );

  const callbackAddedFn = useCallback(uploadImageProductForm, []);

  const handleUploadedImages = (images: string[]) => {
    setUploadedImageUrls(images);
  };

  // reset form
  const resetForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.reset();

      setUploadedImageUrls([]);
      // setAttributes([{ attributeName: '', attributeValue: '' }]);
    }
  }, []);

  useEffect(() => {
    if (formState.success && !isEditMode) {
      resetForm();
    }

    if (formState.success && formState.success.message && isEditMode) {
      resetForm();
    }
  }, [formState.success, resetForm, isEditMode]);

  const handleCategoryChange = ({ catId, catSlug, catName }: SelectedCategories) => {
    let newCategory = { catId: catId, catSlug: catSlug, catName: catName };
    if (selectedCategories.some((scat) => scat.catId === catId)) {
      const newSelectedCategories = selectedCategories.filter(
        (scat) => scat.catId !== catId,
      );
      setSelectedCategories(newSelectedCategories);
    } else {
      setSelectedCategories([...selectedCategories, newCategory]);
    }
  };

  const handleDeleteCategories = () => {
    setSelectedCategories([]);
  };

  // category lere göre attribute lar
  const handleAttributesChange = (newAttributes: { [key: string]: string }) => {
    setProductAttributes(newAttributes);
  };

  const lastSelectedCategory = selectedCategories[selectedCategories.length - 1];

  const hasSubcategories = () => {
    if (!lastSelectedCategory) return false;
    const categoryData = categoriesData.find(
      (cat) => cat.id === lastSelectedCategory.catId,
    );
    return categoryData?.sub_categories && categoryData.sub_categories.length > 0;
  };

  return (
    <Form ref={formRef} action={action}>
      <Input
        type="text"
        id="name"
        name="name"
        label="Product Name"
        defaultValue={isEditMode ? productToEdit?.name : ''}
        error={formState.errors?.name}
      />

      <div className="flex flex-col gap-2">
        <TextArea
          id="description"
          name="description"
          label="Description"
          defaultValue={isEditMode ? productToEdit?.description : ''}
        />
        {formState.errors?.description && (
          <FormError>{formState.errors?.description}</FormError>
        )}
      </div>

      <Input
        type="text"
        id="summary"
        name="summary"
        label="Summary"
        defaultValue={isEditMode ? productToEdit?.summary : ''}
        error={formState.errors?.summary}
      />

      <Input
        type="number"
        id="price"
        name="price"
        label="Price"
        step={0.01}
        defaultValue={isEditMode ? productToEdit?.price : ''}
        error={formState.errors?.price}
      />

      <Input
        type="number"
        id="stock"
        name="stock"
        label="Stock"
        defaultValue={isEditMode ? productToEdit?.stock : ''}
        error={formState.errors?.stock}
      />

      <Input
        type="string"
        id="brand"
        name="brand"
        label="Brand"
        defaultValue={isEditMode ? productToEdit?.brand : ''}
        error={formState.errors?.brand}
      />

      <div className="flex flex-col gap-2">
        <label>Category</label>
        <HierarchicalCategorySelector
          mainCategories={mainCategories}
          onCategoryChange={handleCategoryChange}
          selectedCategories={selectedCategories}
          onDeleteCategories={handleDeleteCategories}
        />
      </div>

      <div>
        {(!hasSubcategories() || isEditMode) && (
          <AttributeInput
            selectedCategories={selectedCategories}
            categoriesData={categoriesData}
            onAttributesChange={handleAttributesChange}
            productToEdit={productToEdit}
          />
        )}
      </div>

      <div className="flex flex-col gap-2">
        <ImageInput
          setUploadedImages={handleUploadedImages}
          label="Cover Image"
          maxFiles={5}
          fn={callbackAddedFn}
          uploadedImagesUrls={uploadedImagesUrls}
        />
        {formState.errors?.image && <FormError>{formState.errors?.image}</FormError>}
      </div>

      {formState.success?.message && (
        <FormSuccess>{formState.success.message}</FormSuccess>
      )}

      <div className="mx-auto flex w-64 flex-col">
        <SubmitButton>{isEditMode ? 'Edit Product' : 'Create Product'}</SubmitButton>
      </div>
    </Form>
  );
}

export default NewProductUpdateForm;
