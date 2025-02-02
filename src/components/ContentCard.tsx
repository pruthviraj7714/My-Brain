import { useState } from "react"
import type { ContentProps } from "@/types/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tweet } from "react-tweet"
import { Loader2, Trash2 } from "lucide-react"

const ContentCard = ({
  content,
  onDelete,
  isPending,
}: {
  content: ContentProps
  onDelete: ({ contentId }: { contentId: string }) => void
  isPending: boolean
}) => {
  const GRADIENTS = [
    "from-sky-400 to-blue-500",
    "from-rose-400 to-red-500",
    "from-yellow-400 to-amber-500",
    "from-emerald-400 to-green-500",
    "from-violet-400 to-purple-500",
    "from-fuchsia-400 to-pink-500",
  ]

  const [gradient] = useState(GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)])

  return (
    <Card
      key={content.id}
      className={`overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 bg-gradient-to-br ${gradient}`}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold text-center text-white truncate">{content.title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-auto flex items-center justify-center overflow-hidden bg-white bg-opacity-20 backdrop-blur-sm">
          {content.contentType === "IMAGE" && (
            <img src={content.link || "/placeholder.svg"} alt={content.title} className="object-cover w-full h-full" />
          )}
          {content.contentType === "YOUTUBE" && (
            <iframe
              src={`https://youtube.com/embed/${content.link.slice(
                content.link.indexOf(".be/") + 3,
                content.link.indexOf("?"),
              )}`}
              className="w-full h-full border-0"
              allowFullScreen
            />
          )}
          {content.contentType === "TWEET" && (
            <div className="h-full w-full overflow-auto p-4">
              <Tweet id={content.link.slice(content.link.indexOf("status/") + 7)} />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Button
          onClick={() => onDelete({ contentId: content.id })}
          variant="destructive"
          className="w-full transition-all duration-300 hover:bg-red-600 hover:scale-105 focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Trash2 className="w-5 h-5 mr-2" />}
          Delete
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ContentCard

