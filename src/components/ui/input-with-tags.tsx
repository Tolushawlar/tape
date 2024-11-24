/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tag, TagInput } from "emblor";
import { useState } from "react";
import { useController, Control } from "react-hook-form";

interface TagInputFieldProps {
  id: string;
  name: string;
  control: Control<any>;
  label?: string;
  defaultValue?: Tag[];
}

export const TagInputField = ({
  id,
  name,
  control,
  label,
  defaultValue = [],
}: TagInputFieldProps) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <TagInput
        id={id}
        tags={value || []}
        setTags={onChange}
        placeholder="Add a tag"
        styleClasses={{
          inlineTagsContainer:
            "border-input rounded-lg bg-background shadow-sm shadow-black/5 transition-shadow focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 p-1 gap-1",
          input:
            "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
          tag: {
            body: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
    </div>
  );
};
