import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

const Layout = ({ children }: Props) => {
  return <div className="container">{children}</div>;
};

export default Layout;
