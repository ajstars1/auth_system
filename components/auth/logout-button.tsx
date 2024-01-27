"use client";

import { logout } from "@/actions/logout";

interface LogoutButtonProps {
    children?: React.ReactNode;
};

export const LogoutButton = ({ children }: LogoutButtonProps) => {

  const onClick = () => {
    logout();
  };
    
  return (
    <span
      className="cursor-pointer"
      onClick={onClick}
    >
      {children}
    </span>
  );
};
