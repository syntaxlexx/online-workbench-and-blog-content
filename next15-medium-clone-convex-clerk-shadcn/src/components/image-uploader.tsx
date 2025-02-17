"use client";

import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";
import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { FileIcon, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { api } from "../../convex/_generated/api";

interface Props {
  setImageId: (id: Id<"_storage">) => void;
}

const ImageUploader = ({ setImageId }: Props) => {
  const generateUploadUrl = useMutation(api.posts.generateUploadUrl);

  const [data, setData] = useState<{
    image: string | null;
  }>({
    image: null,
  });

  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const uploadedFile =
        event.currentTarget.files && event.currentTarget.files[0];

      if (uploadedFile) {
        if (uploadedFile.size / 1024 / 1024 > 50) {
          toast.error("File size must be less than 50MB");
        } else {
          setFile(uploadedFile);
          const reader = new FileReader();
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, image: e.target?.result as string }));
          };
          reader.readAsDataURL(uploadedFile);
        }
      }
    },
    [setFile]
  );

  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    setSaving(true);

    if (!file) return;

    try {
      // get a short-lived upload url
      const postUrl = await generateUploadUrl();

      // post the file to the url
      const result = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      const { storageId } = await result.json();

      setImageId(storageId);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-4">
          <h2 className="text-xl font font-semibold">Upload an Image</h2>
          <p className="mt-1 text-sm text-muted-foreground/60">
            Accepted formats: .png, .jpg, .webp
          </p>
        </div>

        <label
          htmlFor="image-upload"
          className="group relative mt-2 flex h-72 cursor-pointer flex-col items-center rounded-md border-2 border-dashed border-gray-300 bg-gray-50 p-4 transition-all duration-300 hover:border-gray-400">
          <div
            className="absolute z-[5] h-full w-full rounded-md"
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragEnter={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);

              const uploadedFile = e.dataTransfer.files[0];

              if (uploadedFile) {
                if (uploadedFile.size / 1024 / 1024 > 50) {
                  toast.error("File size must be less than 50MB");
                } else {
                  setFile(uploadedFile);
                  const reader = new FileReader();
                  reader.onload = (e) => {
                    setData((prev) => ({
                      ...prev,
                      image: e.target?.result as string,
                    }));
                  };
                  reader.readAsDataURL(uploadedFile);
                }
              }
            }}></div>

          <div
            className={cn(
              "absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition",
              {
                "border-2": dragActive,
                "bg-background/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md":
                  data.image,
                "bg-background opacity-100 hover:bg-muted": !data.image,
              }
            )}>
            <FileIcon
              className={cn("size-8", {
                "scale-110": dragActive,
                "scale-100": !dragActive,
              })}
            />
          </div>

          {data.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt="preview"
              className="h-full w-full rounded-md object-cover"
            />
          )}
        </label>

        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            id="image-upload"
            name="image"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onChangePicture}
          />
        </div>
      </div>

      <Button disabled={saving} type="submit">
        {saving ? (
          <p className="flex items-center gap-2 text-sm">
            <Loader2 className="size-4 animate-spin" />
            Uploading...
          </p>
        ) : (
          <p className="text-sm">Upload</p>
        )}
      </Button>
    </form>
  );
};

export default ImageUploader;
