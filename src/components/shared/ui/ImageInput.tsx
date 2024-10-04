'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { useDropzone } from 'react-dropzone';

import { FaImages } from 'react-icons/fa6';
import MiniSpinner from './MiniSpinner';

type FileInputProps = {
  setUploadedImages: (images: string[]) => void;
  label: string;
  fn: (image: File[]) => Promise<string[]>;
  maxFiles?: number;
  uploadedImagesUrls: string[];
};

const ImageInput = ({
  setUploadedImages,
  label,
  fn,
  maxFiles = 1,
  uploadedImagesUrls,
}: FileInputProps) => {
  const { pending } = useFormStatus();
  const [selectedImages, setselectedImages] = useState<File[]>([]);
  const [isPending, setIsPending] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (selectedImages.length + acceptedFiles.length > maxFiles) {
        if (
          selectedImages.length === acceptedFiles.length &&
          selectedImages.length === maxFiles
        ) {
          setselectedImages(acceptedFiles);
        } else {
          return;
        }
      } else {
        setselectedImages([...selectedImages, ...acceptedFiles]);
      }
    },
  });

  useEffect(() => {
    async function handleUploadImage() {
      setIsPending(true);

      const imagePaths = await fn(selectedImages);

      setUploadedImages([...uploadedImagesUrls, ...imagePaths]);
      setselectedImages([]);
      setIsPending(false);
    }
    if (
      selectedImages.length > 0 &&
      selectedImages.length + uploadedImagesUrls.length <= maxFiles
    ) {
      handleUploadImage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImages]);

  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <div
        {...getRootProps()}
        className={`flex h-60 w-full cursor-pointer items-center justify-center rounded-md border bg-gray-50 focus:border-gray-300 focus:bg-gray-100 ${pending ? 'opacity-60' : ''}`}
      >
        <input {...getInputProps()} className={`outline-none`} />

        <div className="flex flex-col gap-2">
          <FaImages className="mx-auto h-[50px] w-[50px] fill-orange-1" />
          <p className="w-44 text-center text-[18px] font-semibold text-gray-800">
            Drag & Drop or browse
          </p>
          <p className="text-center text-[10px] text-gray-400">Supports JPEG, JPG, PNG</p>
          <p className="text-center text-[10px] text-gray-400">
            {selectedImages.length || uploadedImagesUrls.length
              ? `${uploadedImagesUrls.length}/${maxFiles} files uploaded`
              : `0/${maxFiles} files uploaded`}
          </p>
        </div>
      </div>
      <ul className="flex max-w-full flex-wrap justify-center gap-3">
        {isPending ? (
          <MiniSpinner />
        ) : (
          uploadedImagesUrls?.map((image, index) => (
            <li className="relative mt-3 h-[150px] w-[150px]" key={index}>
              <Image className="rounded-md border" src={image} alt="product image" fill />
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
export default ImageInput;
