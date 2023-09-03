import { Like, Profile, Tweet } from "@/lib/db/schema";

export type ExtendedTweet = {
    tweet: Tweet,
    profile: Profile
    likes: Like[],
    hasLiked?: boolean,
}
