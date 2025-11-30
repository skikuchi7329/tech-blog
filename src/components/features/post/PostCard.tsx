import Link from "next/link";
import { Post } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Props = {
  post: Post;
};

export const PostCard = ({ post }: Props) => {
  return (
    <Link
      href={`/posts/${post.id}`}
      className="block transition-transform hover:scale-[1.01] duration-200"
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <Badge variant="secondary" className="mb-2">
              {post.category?.name || "Uncategorized"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
          <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3">
            {post.content}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};
