"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { PlusIcon, Share2Icon, LogOutIcon } from "lucide-react";
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
import { logOut } from "@/actions/logout";

const addContentSchema = z.object({
  title: z
    .string()
    .min(3, { message: "The Title Should be at least of 3 characters" }),
  link: z.string().url({ message: "The Link should be valid URL" }),
  contentType: z.enum(["TWEET", "IMAGE", "NOTION", "YOUTUBE"], {
    message: "Content Type Must Be Selected",
  }),
});

const contentTypes = ["TWEET", "IMAGE", "NOTION", "YOUTUBE"];

export default function Navbar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

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
    <nav className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-3">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold">Second Brain</span>
          </div>
          <div className="flex items-center space-x-4">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-violet-600 hover:bg-violet-100 transition-colors duration-200 flex items-center gap-2">
                  <PlusIcon size={18} />
                  <span>Add Content</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Content</DialogTitle>
                  <DialogDescription>
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
                                <SelectTrigger className="w-[180px]">
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
                        className="bg-violet-600 hover:bg-violet-700 text-white transition-colors duration-200"
                      >
                        Add Content
                      </Button>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>

            <Button className="bg-white text-violet-600 hover:bg-violet-100 transition-colors duration-200 flex items-center gap-2">
              <Share2Icon size={18} />
              <span>Share Brain</span>
            </Button>
            <form
             action={() => logOut()}
            >
              <Button
                variant="ghost"
                className="hover:bg-violet-700 transition-colors duration-200 flex items-center gap-2"
              >
                <LogOutIcon size={18} />
                <span>Logout</span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}
