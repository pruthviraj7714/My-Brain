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
import axios from 'axios';
import { useRouter } from "next/navigation";
const signUpformSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "The email must be valid." }),
  password: z
    .string()
    .min(6, { message: "The password must be at least of 6 characters" }),
});

export default function SignUpForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpformSchema>>({
    resolver: zodResolver(signUpformSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });


  async function onSubmit(values: z.infer<typeof signUpformSchema>) {
    try {
      await axios.post('/api/auth/signup', values);
      toast.success("Successfully Signed Up", {description : "Now Login with your credentials"})
      router.push('/login');
    } catch (error : any) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <Card className="max-w-lg w-full">
      <CardHeader>
        <CardTitle className="text-center text-3xl font-bold text-purple-500">
          Welcome, to Second Brain
        </CardTitle>
        <CardDescription className="text-center text-lg">
          Join Second Brain, Today
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email here" {...field} />
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
            <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] font-bold w-full" type="submit">
              Sign up
            </Button>
          </form>
        </Form>
        <div className="flex flex-col mt-5 gap-y-4 font-serif text-sm text-center max-w-md leading-tight">
          <span>
            By signing-up, you are agreeing to our{" "}
            <span className="underline text-blue-500 cursor-pointer">Terms of Service</span> and{" "}
            <span className="underline text-blue-500 cursor-pointer">Privacy Policy.</span>
          </span>
          <Link href={'/login'} className="underline text-pretty">Already have an account? Log in</Link>
        </div>
      </CardContent>
    </Card>
  );
}
