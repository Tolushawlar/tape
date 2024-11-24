"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  thumbnail?: string | null;
  onFilesDropped: (acceptedFiles: File[]) => void;
}

export function Dropzone({
  className,
  thumbnail,
  onFilesDropped,
  ...props
}: DropzoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      onFilesDropped(acceptedFiles);
    },
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex flex-col items-center justify-center w-full h-full min-h-[200px] rounded-md border border-dashed border-gray-300 transition-colors duration-200 ease-in-out bg-gray-50",
        isDragActive ? "border-blue-500 bg-blue-50" : "hover:bg-gray-100",
        className
      )}
      {...props}
    >
      <input {...getInputProps()} />

      {thumbnail ? (
        <div className="relative w-full h-full min-h-[200px]">
          <Image
            src={thumbnail}
            alt="Thumbnail"
            width={200}
            height={200}
            className="w-full h-full object-cover rounded-md"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 hover:opacity-100 transition-opacity rounded-md">
            <p className="text-sm">Change Image</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-gray-500">
          <ImageIcon className="h-10 w-10 mb-2" />
          <p className="text-sm text-center">
            Drag and drop image here, or click add image
          </p>
        </div>
      )}
    </div>
  );
}
