"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FileUpload from "../file-upload";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";

const CreateChatAttachmentSchema = z.object({
  content: z.string(),
  fileUrl: z.string().min(1, {
    message: "Attachment is required",
  }),
});

type CreateChatAttachmentRequest = z.infer<typeof CreateChatAttachmentSchema>;

interface Props {}

const MessageFileModal: FC<Props> = ({}) => {
  const router = useRouter();
  const { isOpen, type, onClose, data } = useModal();

  const { apiUrl, query } = data;

  const isModalOpen = isOpen && type === "messageFile";

  const form = useForm<CreateChatAttachmentRequest>({
    resolver: zodResolver(CreateChatAttachmentSchema),
    defaultValues: {
      content: "",
      fileUrl: undefined,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: CreateChatAttachmentRequest) => {
    try {
      const url = queryString.stringifyUrl({
        url: apiUrl || "",
        query,
      });

      const { data } = await axios.post(url, {
        ...values,
        content: values.fileUrl,
      });
      form.reset();
      router.refresh();
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Add an Attachment
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Send a file as a message
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-8 px-6">
                <div className="flex items-center justify-center">
                  <FormField
                    control={form.control}
                    name="fileUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FileUpload
                            endpoint="messageFile"
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <DialogFooter className="bg-gray-100 px-6 py-4">
                <Button
                  disabled={isLoading}
                  variant="primary"
                  type="submit"
                  className="w-full"
                >
                  Send
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MessageFileModal;
