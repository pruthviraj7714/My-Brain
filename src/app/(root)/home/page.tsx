"use client";
import { deleteContent } from "@/api/mutations/content";
import { fetchContent } from "@/api/queries/content";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LucideLoader2 } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const queryClient = useQueryClient();

  const { data: contents, isLoading } = useQuery({
    queryKey: ["contents"],
    queryFn: fetchContent,
  });

  const { mutateAsync, isError, error, isPending } = useMutation({
    mutationKey: ["content-delete"],
    mutationFn: deleteContent,
    onSuccess: () => {
      toast.success("Content Successfully Removed");
      queryClient.invalidateQueries({ queryKey: ["contents"] });
    },
    onError: (e) => {
      toast.error(e.message);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LucideLoader2 className="animate-spin size-7" />
      </div>
    );
  }

  if (isError) {
    return <div>Error while fetching content</div>;
  }

  return (
    <div>
      {contents && contents.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {contents.map((c) => (
            <div key={c.id} className="flex flex-col">
              <div className="h-60 w-30">
                <img
                  src={c.link}
                  alt={c.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <Button
                onClick={() => mutateAsync({ contentId: c.id })}
                variant={"destructive"}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div>No Content Added yet</div>
      )}
    </div>
  );
}
