"use client";

import { Database } from "@/types/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { ChevronRight } from "lucide-react";
import { FC, FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { toast } from "./ui/use-toast";

interface Props {}

const AuthModal: FC<Props> = ({}) => {
  const [open, setOpen] = useState<boolean>(true);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    // first check if username exists
    if (isRegister) {
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("username", username.trim());

      if (data && data?.length > 0) {
        setLoading(false);
        return toast({
          title: "Username already exists!",
          variant: "destructive",
        });
      }

      const resp = await supabase.auth.signUp({
        password: password.trim(),
        email: email.trim(),
        options: {
          data: {
            username: username.trim(),
          },
        },
      });

      setLoading(false);

      console.log("resp", resp);

      toast({
        title: "Registration Complete.",
      });

      setIsRegister(false);
      return;
    }

    const resp = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        data: {
          username: username.trim(),
        },
      },
    });

    setLoading(false);

    console.log("resp", resp);

    toast({
      title: "Check mail for a login link",
    });

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-black p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg my-1">
            Sign {isRegister ? "up" : "in"} to continue
          </h3>
          {isRegister && (
            <>
              <Input
                type="text"
                placeholder="Username"
                id="username"
                min="3"
                max="255"
                onChange={(e) => setUsername(e.target.value)}
              />

              <Input
                type="password"
                placeholder="Password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
          )}
          <Input
            type="email"
            id="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-sm text-gray-200">
            You will receive a login magic link here.
          </p>
          <div className="flex w-full justify-between">
            <Button
              isLoading={loading}
              type="button"
              variant="subtle"
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Login Here" : "Register Here"}
            </Button>

            <Button
              isLoading={loading}
              type="submit"
              iconSuffix={<ChevronRight className="w-4 h-4" />}
            >
              {isRegister ? "Register" : "Login"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
