import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  return (
    <div className="h-full flex items-center justify-center">{children} </div>
  );
};

export default Layout;
