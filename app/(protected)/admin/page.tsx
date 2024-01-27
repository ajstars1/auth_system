/* eslint-disable @next/next/no-img-element */
"use client";

import { admin } from "@/actions/admin";
import { Header } from "@/components/auth/header";
import { RoleGate } from "@/components/auth/role-gate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onApiRouteClick = async () => {
    const response = await fetch("/api/admin");
    if (response.ok) {
      toast.success("Allowed to access admin API route");
    }
    else {
      toast.error("Forbidden to access admin API route");
    }
  }
  const onServerActionClick = async () => {
    const data = await admin();
    if (data.success) {
      toast.success("Allowed to access admin server action");
    }
    else {
      toast.error("Forbidden to access admin server action");
    }
  }
    return (
      <Card className="w-[600px]">
        <CardHeader>
          <Header headerLabel="🔎Admin" label="This is private admin page" />
        </CardHeader>
        <CardContent>
          <RoleGate allowedRole={UserRole.ADMIN}>
            <p className="text-xl  text-center text-gray-500">
              This is an admin page. Only admins can see this.
            </p>
            <img
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGI2enVoZHZvYnIwMXE4Y25sOHZneXBrYzU3d21iYnU0emk0a3l3biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Rsp9jLIy0VZOKlZziw/giphy.gif"
              alt="admin"
              className="w-full"
            />
          </RoleGate>
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">Admin only API ROUTE</p>
            <Button onClick={onApiRouteClick}>Click to test</Button>
          </div>
          <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
            <p className="text-sm font-medium">Admin only Server Action</p>
            <Button onClick={onServerActionClick}>Click to test</Button>
          </div>
        </CardContent>
      </Card>
    );
}
 
export default AdminPage;