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
import axios from "axios";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FC, useState } from "react";
import { Button } from "../ui/button";

interface Props {}

const DeleteChannelModal: FC<Props> = ({}) => {
  const { isOpen, onClose, type, data } = useModal();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const isModalOpen = isOpen && type === "deleteChannel";
  const { server, channel } = data;

  const onLeave = async () => {
    try {
      setLoading(true);

      const url = queryString.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id,
        },
      });

      await axios.delete(url);

      onClose();
      router.refresh();
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Delete Channel
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Are you sure you want to do this?
              <span className="font-semibold text-indigo-500 px-1">
                {channel?.name}
              </span>
              channel will be permanently deleted?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="bg-gray-100 px-6 py-4">
            <div className="flex items-center justify-between">
              <Button disabled={loading} variant="ghost" onClick={onClose}>
                Cancel
              </Button>
              <Button disabled={loading} variant="primary" onClick={onLeave}>
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteChannelModal;
