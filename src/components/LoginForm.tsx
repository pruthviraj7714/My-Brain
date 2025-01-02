"use client";

import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "@/lib/auth";
import { useRouter } from "next/navigation";

const loginFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z
    .string()
    .min(6, { message: "The password must be at least of 6 characters" }),
});
export default function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    try {
      const res = await signIn('credentials', {
        username : values.username,
        password : values.password,
        redirect : false
      });
      console.log(res);
      if(res?.ok) {
        router.push('/home');
      }
    } catch (error : any) {
      console.log(error);
      toast.error(error.message);
    }
  }
  
  return (
    <Card className="max-w-lg w-full">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold text-purple-500">
        Welcome back
        </CardTitle>
        <CardDescription className="text-center text-lg">
        Enter your email to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username here" {...field} />
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
                      placeholder="Enter password here"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="bg-[#8b5cf6] hover:bg-[#7c3aed] font-bold w-full"
              type="submit"
            >
              Log in
            </Button>
          </form>
        </Form>
        <div className="flex flex-col mt-5 gap-y-4 font-serif text-sm text-center max-w-md leading-tight">
          <Link href={"/signup"} className="underline text-pretty">
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
