import { useState } from "react";
import type { ContentProps } from "@/types/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tweet } from "react-tweet";
import { Trash2 } from "lucide-react";

const ContentCard = ({
  content,
  onDelete,
}: {
  content: ContentProps;
  onDelete: ({ contentId }: { contentId: string }) => void;
}) => {
  const GRADIENTS = [
    "from-sky-300 to-blue-400",
    "from-yellow-300 to-amber-400",
    "from-emerald-300 to-green-400",
    "from-violet-300 to-purple-400",
    "from-fuchsia-300 to-pink-400",
  ];

  const [gradient] = useState(
    GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)]
  );

  return (
    <Card
      key={content.id}
      className={`overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br ${gradient}`}
    >
      <CardHeader className="p-4">
        <CardTitle className="flex justify-between items-center">
          <div className="flex flex-col text-xl font-bold justify-start truncate">
            <div>{content.title}</div>
            <span className="text-sm font-sans text-black">
              stored on: {new Date(content.createdAt).toLocaleDateString()}
            </span>
          </div>
          <Trash2
            onClick={() => onDelete({ contentId: content.id })}
            className="transition-all duration-300 size-7 cursor-pointer text-red-500 rounded-xl"
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-auto flex items-center justify-center overflow-hidden bg-white bg-opacity-20 backdrop-blur-sm">
          {content.contentType === "IMAGE" && (
            <img
              src={content.link || "/placeholder.svg"}
              alt={content.title}
              className="object-cover w-full h-full p-4"
            />
          )}
          {content.contentType === "YOUTUBE" && (
            <iframe
              src={`https://youtube.com/embed/${content.link.slice(
                content.link.indexOf(".be/") + 3,
                content.link.indexOf("?")
              )}`}
              className="w-full h-full border-0 p-4"
              allowFullScreen
            />
          )}
          {content.contentType === "TWEET" && (
            <div className="h-full w-full overflow-auto p-4">
              <Tweet
                id={content.link.slice(content.link.indexOf("status/") + 7)}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
