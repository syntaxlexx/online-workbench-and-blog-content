"use client";

import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  onClick?: () => void;
}

const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <button
      className="px-4 py-2 rounded-full bg-sky-500 text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
