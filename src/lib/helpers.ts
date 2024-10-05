import * as ExcelJS from 'exceljs';

import { ProductForTable } from '@/types/Product';
import { auth } from './auth';

export async function currentUser() {
  const session = await auth();

  return session?.user;
}

export async function currentRole() {
  const session = await auth();

  return session?.user?.role;
}

export async function currentStore() {
  const session = await auth();

  return session?.user.store;
}

export const downloadAsExcelProductTable = async () => {
  try {
    const response = await fetch('/api/products');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('API did not return JSON');
    }

    const data = await response.json();

    const products = data.products.products;

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Products');

    worksheet.addRow([
      'Brand',
      'Category',
      'Description',
      'Name',
      'Price',
      'Status',
      'Stock',
      'Summary',
    ]);

    products.forEach((product: Partial<ProductForTable>) => {
      const categories = product.categories?.map((c) => c.category.name).join(',');

      worksheet.addRow([
        product.name || '',
        product.price || '',
        product.brand || '',
        categories || '',
        product.description || '',
        product.status ? 'Active' : 'Inactive',
        product.stock || '',
        product.summary || '',
      ]);
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return buffer;
  } catch (error) {
    console.error('Error in downloadAsExcelProductTable:', error);
    throw error;
  }
};

export const handleExportExcel = async () => {
  try {
    const excelBuffer = await downloadAsExcelProductTable();

    if (!excelBuffer) {
      console.error('Excel buffer is empty');
      return;
    }

    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'products.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting Excel:', error);
  }
};

export const getUniqueStoreIds = (cart: any): string[] => {
  const storeIds = cart?.cart_items.map((item: any) => item.product.store_id);
  return Array.from(new Set(storeIds));
};

export function getUrl() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://www.priashop.com/';
  } else {
    return 'http://localhost:3000';
  }
}
