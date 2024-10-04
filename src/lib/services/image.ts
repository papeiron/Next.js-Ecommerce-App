import { supabase } from '../supabase';
import { generateImagePath } from '../utils';

export async function uploadImageAppForm(image: File[]): Promise<string[]> {
  const uploadedImagePaths: string[] = [];

  const { imageName, imagePath } = generateImagePath(image[0], 'store-images');

  if (imageName && imagePath) {
    const { error } = await supabase.storage
      .from('store-images')
      .upload(imageName, image[0]);

    if (error) {
      console.log(error);
      throw new Error('An error occurred while uploading an image.');
    }
  }

  uploadedImagePaths.push(imagePath);

  return uploadedImagePaths;
}

export async function uploadImageProductForm(images: File[]): Promise<string[]> {
  const uploadedImagePaths: string[] = [];

  for (const image of images) {
    const { imageName, imagePath } = generateImagePath(image, 'product-images');

    if (imageName && imagePath) {
      const { error } = await supabase.storage
        .from('product-images')
        .upload(imageName, image);

      if (error) {
        console.log(error);
        throw new Error('An error occurred while uploading an image.');
      }

      uploadedImagePaths.push(imagePath);
    }
  }

  return uploadedImagePaths;
}
