"use client";

import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import Head from "next/head";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "./back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerlabel: string;
    label: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerlabel,
    label,
    backButtonLabel,
    backButtonHref,
    showSocial
 }: CardWrapperProps) => {
    return (
      <Card className="w-[400px] shadow-md">
        <CardHeader>
          <Header headerLabel={headerlabel} label={label} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        {showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
        <CardFooter>
          <BackButton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      </Card>
    );
};