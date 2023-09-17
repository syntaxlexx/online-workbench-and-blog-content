"use client";

import { FC, ReactNode } from "react";
import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
}

const SessionProvider: FC<Props> = ({ children }) => {
  return <NextAuthSessionProvider>{children} </NextAuthSessionProvider>;
};

export default SessionProvider;
