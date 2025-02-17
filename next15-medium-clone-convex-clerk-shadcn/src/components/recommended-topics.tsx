import Link from "next/link";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const tags: string[] = [
  "React",
  "Next.js",
  "Tailwind CSS",
  "TypeScript",
  "JavaScript",
  "Docker",
];

interface Props {}

const RecommendedTopics = ({}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href="#">
              <Badge variant={"secondary"} className="font-light">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/`} className="text-xs font-light text-emerald-500">
          See more topics
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecommendedTopics;
