import { getBrain } from "@/actions/getBrain";
import ContentCard from "@/components/ContentCard";
import type { ContentProps } from "@/types/types";
import { Image } from "lucide-react";

export default async function BrainPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const contents = await getBrain((await params).userId);

  return (
    <div className="bg-gradient-to-b from-gray-900 via-blue-950 to-black min-h-screen">
      <main className="container mx-auto p-6 px-4">
        {contents && contents.length > 0 ? (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 space-y-6 gap-6">
            {contents.map((content: ContentProps) => (
              <ContentCard content={content} key={content.id} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-12 rounded-lg p-8 max-w-md mx-auto">
            <Image className="w-24 h-24 mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-semibold mb-2">
              No Content Added Yet
            </h2>
            <p className="text-lg mb-4">
              This brain is waiting for its first thought!
            </p>
            <p className="text-sm">
              Content added to this brain will appear here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
