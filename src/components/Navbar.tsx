"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon, Share2Icon, LogOutIcon, Brain } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addContent } from "@/api/mutations/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const addContentSchema = z.object({
  title: z
    .string()
    .min(3, { message: "The Title Should be at least of 3 characters" }),
  link: z.string().url({ message: "The Link should be valid URL" }),
  contentType: z.enum(["TWEET", "IMAGE", "YOUTUBE"], {
    message: "Content Type Must Be Selected",
  }),
});

const contentTypes = ["TWEET", "IMAGE", "YOUTUBE"];

export default function Navbar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const queryClient = useQueryClient();
  const session = useSession();

  const form = useForm<z.infer<typeof addContentSchema>>({
    resolver: zodResolver(addContentSchema),
    defaultValues: {
      contentType: "IMAGE",
      link: "",
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof addContentSchema>) {
    await mutateAsync(values);
  }

  const { mutateAsync } = useMutation({
    mutationFn: addContent,
    mutationKey: ["content"],
    onSuccess: () => {
      toast.success("Content Successfully added");
      queryClient.invalidateQueries({ queryKey: ["contents"] });
      form.reset();
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  return (
    <nav className="bg-gradient-to-r from-gray-700 via-blue-750 to-cyan-700 text-white shadow-lg">
      <div className="mx-auto px-4 sm:px-2 lg:px-3">
        <div className="flex justify-between items-center h-16">
          <Link
            href={`${session?.data?.user ? "/home" : "/"}`}
            className="flex-shrink-0 flex items-center cursor-pointer"
          >
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Brain className="mr-2 h-8 w-8" />
              Brain Gallery
            </h1>
          </Link>
          {session && session?.data?.user && (
            <div className="flex items-center space-x-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-500 text-white text-md font-medium transition-colors duration-200 flex items-center gap-2">
                    <PlusIcon size={18} />
                    <span>Add Content</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gradient-to-b from-gray-900 via-blue-950 to-black text-white sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Content</DialogTitle>
                    <DialogDescription className="text-white">
                      Add new content to your Second Brain. Fill in the details
                      below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                <Input
                                  className="text-black"
                                  placeholder="Enter Title for content"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="link"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Link</FormLabel>
                              <FormControl>
                                <Input
                                  className="text-black"
                                  placeholder="Enter URL of content"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="contentType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Content Type</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger className="w-[180px] text-black">
                                    <SelectValue placeholder="Select Content Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {contentTypes.map((t) => (
                                      <SelectItem key={t} value={t}>
                                        {t.toWellFormed()}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          className="text-white bg-purple-900 hover:bg-purple-950 transition-colors duration-200"
                        >
                          Add Content
                        </Button>
                      </form>
                    </Form>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog
                open={isShareDialogOpen}
                onOpenChange={setIsShareDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-500 text-md font-medium transition-colors duration-200 flex items-center gap-2">
                    <Share2Icon size={18} />
                    <span>Share Brain</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gradient-to-b from-gray-900 via-blue-950 to-black text-white sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      Share your second brain with your friends!
                    </DialogTitle>
                    <DialogDescription className="text-white">
                      Copy the below URL and share to your friends
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-between items-center gap-2">
                    <Input
                      value={`http://localhost:3000/brain/${session?.data?.user?.id}`}
                      className="p-4 text-black font-semibold"
                      readOnly
                    />
                    <Button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `http://localhost:3000/brain/${session?.data?.user?.id}`
                        );
                        toast.success("Copied to clipboard");
                      }}
                      className="bg-purple-600 hover:bg-purple-500 text-md font-medium"
                    >
                      Copy
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button
                onClick={() => signOut({redirectTo : '/'})}
                variant={"destructive"}
                className=" transition-colors duration-200 flex items-center gap-2"
              >
                <LogOutIcon size={18} />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
