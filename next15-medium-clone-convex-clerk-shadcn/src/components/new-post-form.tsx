"use client";

import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewPostRequest, NewPostSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { JSONContent } from "novel";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { slugify } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import ImageUploader from "./image-uploader";
import Editor from "./editor/editor";
import { Loader } from "lucide-react";

interface Props {}

const NewPostForm = ({}: Props) => {
  const createPost = useMutation(api.posts.createPost);

  const router = useRouter();
  const [filePickerIsOpen, setFilePickerIsOpen] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<NewPostRequest>({
    resolver: zodResolver(NewPostSchema),
    defaultValues: {},
  });

  function setCoverImageId(url: string) {
    setValue("coverImageId", url);
    setFilePickerIsOpen(false);
  }

  function setContent(content: JSONContent) {
    setValue("content", content, {
      shouldValidate: true,
    });
  }

  const title = watch("title");
  useEffect(() => {
    if (title) {
      setValue("slug", slugify(title), {
        shouldValidate: true,
      });
    }
  }, [title]);

  const processForm: SubmitHandler<NewPostRequest> = async (data) => {
    const contentJson = data.content;
    const hasContent = contentJson.content?.some(
      (c) => (c.content?.length || 0) > 0
    );

    if (!hasContent) {
      toast.error("Post must have content");
      return;
    }
    try {
      const postSlug = await createPost({
        ...data,
        coverImageId: data.coverImageId as Id<"_storage"> | undefined,
        content: JSON.stringify(contentJson),
      });

      if (!postSlug) {
        throw new Error("Failed to create post");
      }

      router.push(`/posts/${postSlug}`);
      toast.success("Post created successfully");
    } catch (error) {}
  };

  return (
    <form
      onSubmit={handleSubmit(processForm)}
      className="mt-6 max-w-2xl space-y-4">
      <div className="flex flex-col gap-4">
        {/* cover image */}
        <div className="flex justify-between gap-4">
          <div className="w-full">
            <Input
              disabled
              type="text"
              className="w-full"
              placeholder="Select a cover image"
              {...register("coverImageId")}
            />

            {errors.coverImageId?.message && (
              <p className="mt-1 px-2 text-xs text-red-400">
                {errors.coverImageId.message}
              </p>
            )}
          </div>

          <Dialog open={filePickerIsOpen} onOpenChange={setFilePickerIsOpen}>
            <DialogTrigger asChild>
              <Button size={"sm"}>Select file</Button>
            </DialogTrigger>
            <DialogContent>
              <ImageUploader setImageId={setCoverImageId} />
            </DialogContent>
          </Dialog>
        </div>

        {/* title and slug */}
        <div className="flex justify-between gap-4">
          <div className="flex-1">
            {/* title */}

            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="My great post"
                {...register("title")}
              />
              {errors.title?.message && (
                <p className="mt-1 px-2 text-xs text-red-400">
                  {errors.title.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex-1">
            {/* slug */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                placeholder="my-great-post"
                {...register("slug")}
              />
              {errors.slug?.message && (
                <p className="mt-1 px-2 text-xs text-red-400">
                  {errors.slug.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* excerpt */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            placeholder="My great post"
            {...register("excerpt")}
          />
          {errors.excerpt?.message && (
            <p className="mt-1 px-2 text-xs text-red-400">
              {errors.excerpt.message}
            </p>
          )}
        </div>

        {/* content */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="content">Content</Label>
          <Editor editable={true} onChange={setContent} />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
          {isSubmitting && <Loader className="ml-2 size-4 inline-block" />}
        </Button>
      </div>
    </form>
  );
};

export default NewPostForm;
