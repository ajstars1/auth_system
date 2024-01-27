"use client";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"; 

import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from "@/components/ui/avatar"

import { LogoutButton } from "@/components/auth/logout-button";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";



export const UserButton = () => {
    const user = useCurrentUser();
  

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.image || "undefined"} alt="User avatar" />
            <AvatarFallback className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-700 to-gray-800 ">
              <FaUser className="text-white hover:scale-125 transform transition duration-500" />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <span className="ml-2">My Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <span className="ml-2">Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogoutButton>
              <span className="ml-2">Logout</span>
            </LogoutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
}