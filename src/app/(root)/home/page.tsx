"use client";

import { deleteContent } from "@/api/mutations/content";
import { fetchContent } from "@/api/queries/content";
import ContentCard from "@/components/ContentCard";
import type { ContentProps } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2, Image } from "lucide-react";
import { toast } from "sonner";

export default function Home() {
  const queryClient = useQueryClient();

  const { data: contents, isLoading } = useQuery({
    queryKey: ["contents"],
    queryFn: fetchContent,
  });

  const { mutateAsync, isPending } = useMutation({
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
      <div className="flex items-center justify-center bg-gradient-to-b from-gray-900 via-blue-950 to-black min-h-screen">
        <Loader2 className="animate-spin w-12 h-12 text-white" />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-blue-950 to-black p-6 min-h-screen">
      {contents && contents.length > 0 ? (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 space-y-6 gap-6">
          {contents.map((content: ContentProps) => (
            <ContentCard
              content={content}
              onDelete={mutateAsync}
              key={content.id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-12">
          <Image className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <p className="text-xl font-semibold">No Content Added Yet</p>
          <p className="mt-2">Start by adding some content to your gallery!</p>
        </div>
      )}
    </div>
  );
}
