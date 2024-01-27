"use client";

import * as z from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { UserRole } from "@prisma/client";

import { SettingsSchema } from "@/schemas";
import { settings } from "@/actions/settings";
import { Header } from "@/components/auth/header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
    Form,
    FormField,
    FormControl,
    FormLabel,
    FormItem,
    FormDescription,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
    Select,
    SelectContent,
    SelectValue,
    SelectTrigger,
    SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";


const SettingsPage = () => {
    const [error, setError] = useState<string| undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const { update } = useSession();
    const [isPending, startTransition] = useTransition();
    
    const user = useCurrentUser();

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: user?.name || undefined,
            email: user?.email || undefined,
            password: undefined,
            newPassword: undefined,
            role: user?.role || undefined,
            isTwoFactorEnabled: user?.isTwoFactorEnabled || false,

        },
      });
    const onSubmit = (values:z.infer<typeof SettingsSchema>) => {
      startTransition(() => {
          settings(values)
              .then((data) => {
                  if(data.error) {
                      setError(data.error)
                  }
                  if (data.success) {
                      update();
                      setSuccess(data.success)
                  }
              })
        .catch(()=> setError("Something went wrong"))
      });
    };

    return (
      <Card className="w-[600px]">
        <CardHeader>
          <Header
            headerLabel="⚙️ Settings"
            label="Iski Bhi Setting hai teri kha hai?"
          />
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Rahul Sharma"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="***sharma@example.com"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="*******"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="*******"
                              disabled={isPending}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={UserRole.ADMIN}>Admin</SelectItem>
                          <SelectItem value={UserRole.USER}>User</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {user?.isOAuth === false && (
                    <FormField
                      control={form.control}
                      name="isTwoFactorEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel>Two Factor Authentication</FormLabel>
                            <FormDescription>
                              Enable two factor authentication for your account
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              disabled={isPending}
                              checked={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                )}
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit" disabled={isPending}>
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );
}
 
export default SettingsPage;