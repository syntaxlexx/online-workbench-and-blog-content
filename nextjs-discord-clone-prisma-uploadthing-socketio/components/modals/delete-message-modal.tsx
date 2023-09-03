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
import queryString from "query-string";
import { FC, useState } from "react";
import { Button } from "../ui/button";

interface Props {}

const DeleteMessageModal: FC<Props> = ({}) => {
  const { isOpen, onClose, type, data } = useModal();
  const [loading, setLoading] = useState<boolean>(false);

  const isModalOpen = isOpen && type === "deleteMessage";
  const { apiUrl, query } = data;

  const onLeave = async () => {
    try {
      setLoading(true);

      const url = queryString.stringifyUrl({
        url: String(apiUrl),
        query,
      });

      await axios.delete(url);

      onClose();
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
              Delete Message
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Are you sure you want to do this?
              <br />
              The message will be permanently deleted.
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

export default DeleteMessageModal;
