import { ExtendedTweet } from "@/types/db"
import { db, pool } from "../db"
import { Like, Profile, Tweet, likes, profiles, tweets } from "../db/schema"
import { and, desc, eq, exists } from "drizzle-orm";

// const tweetsQueryWithCurrentUserId = `
// SELECT tweets.*, profiles.username, profiles.full_name, COUNT(likes.id) AS likes_count,
//     EXISTS(
//         SELECT 1
//         FROM likes
//         WHERE likes.tweet_id = tweets.id
//         AND likes.user_id = $1
//     ) AS user_has_liked
// FROM tweets
// LEFT JOIN likes ON tweets.id = likes.tweet_id
// JOIN profiles ON tweets.user_id = profiles.id
// GROUP BY tweets.id, profiles.username, profiles.full_name
// ORDER BY tweets.created_at DESC
// `

// const tweetsQueryWithoutCurrentUserId = `
// SELECT tweets.*, profiles.username, profiles.full_name, COUNT(likes.id) AS likes_count
// FROM tweets
// LEFT JOIN likes ON tweets.id = likes.tweet_id
// JOIN profiles ON tweets.user_id = profiles.id
// GROUP BY tweets.id, profiles.username, profiles.full_name
// ORDER BY tweets.created_at DESC
// `

export const getTweets = async (currentUserId?: string): Promise<{ data?: ExtendedTweet[], error?: string }> => {
    try {
        let isLikeExists = db.select().from(likes)

        if (currentUserId) {
            isLikeExists = db.select().from(likes).where(eq(likes.userId, currentUserId))
        }

        const query = db
            .select({
                tweets,
                profiles,
                ...(currentUserId ? {
                    hasLiked: exists(db
                        .select()
                        .from(likes)
                        .where(
                            and(
                                eq(likes.tweetId, tweets.id),
                                eq(likes.userId, currentUserId)
                            )
                        )
                    )
                } : {}),
                likes,
            })
            .from(tweets)
            .leftJoin(likes, eq(tweets.id, likes.tweetId))
            .innerJoin(profiles, eq(tweets.userId, profiles.id))
            .orderBy(desc(tweets.createdAt))
            .limit(10);

        const rows = await query;

        if (rows) {
            const result = rows.reduce<
                Record<
                    string,
                    {
                        tweet: Tweet;
                        likes: Like[];
                        profile: Profile;
                        hasLiked: boolean;
                        // replies: Tweet[];
                    }
                >
            >((acc, row) => {
                const tweet = row.tweets;
                const like = row.likes;
                const profile = row.profiles;
                const hasLiked = Boolean(row.hasLiked);
                // const reply = row.tweetsReplies;

                if (!acc[tweet.id]) {
                    acc[tweet.id] = {
                        tweet,
                        likes: [],
                        profile,
                        hasLiked,
                        // replies: [],
                    };
                }

                if (like) {
                    acc[tweet.id].likes.push(like);
                    const ids = acc[tweet.id].likes.map(({ id }) => id);
                    const filteredLikesArr = acc[tweet.id].likes.filter(
                        ({ id }, index) => !ids.includes(id, index + 1)
                    );
                    acc[tweet.id].likes = filteredLikesArr;
                }

                // if (reply) {
                //     acc[tweet.id].replies.push(reply);
                //     const ids = acc[tweet.id].replies.map(({ id }) => id);
                //     const filteredRepliesArr = acc[tweet.id].replies.filter(
                //         ({ id }, index) => !ids.includes(id, index + 1)
                //     );
                //     acc[tweet.id].replies = filteredRepliesArr;
                // }

                return acc;
            }, {});

            const data = Object.values(result);
            // console.log("data", data);

            return { data };
        }

        throw new Error("Could not complete query")
        // return { data: res }
    } catch (error) {
        console.log("error executing query", error);
        return { error: 'db querying failed!' }
    }
}

export const getTweet = async (tweetId?: string, currentUserId?: string): Promise<{ data?: ExtendedTweet[], error?: string }> => {
    try {
        let isLikeExists = db.select().from(likes)

        if (currentUserId) {
            isLikeExists = db.select().from(likes).where(eq(likes.userId, currentUserId))
        }

        const query = db
            .select({
                tweets,
                profiles,
                ...(currentUserId ? {
                    hasLiked: exists(db
                        .select()
                        .from(likes)
                        .where(
                            and(
                                eq(likes.tweetId, tweets.id),
                                eq(likes.userId, currentUserId)
                            )
                        )
                    )
                } : {}),
                likes,
            })
            .from(tweets)
            .where(eq(tweets.id, tweetId))
            .leftJoin(likes, eq(tweets.id, likes.tweetId))
            .innerJoin(profiles, eq(tweets.userId, profiles.id))

        const rows = await query;

        if (rows) {
            const result = rows.reduce<
                Record<
                    string,
                    {
                        tweet: Tweet;
                        likes: Like[];
                        profile: Profile;
                        hasLiked: boolean;
                        // replies: Tweet[];
                    }
                >
            >((acc, row) => {
                const tweet = row.tweets;
                const like = row.likes;
                const profile = row.profiles;
                const hasLiked = Boolean(row.hasLiked);
                // const reply = row.tweetsReplies;

                if (!acc[tweet.id]) {
                    acc[tweet.id] = {
                        tweet,
                        likes: [],
                        profile,
                        hasLiked,
                        // replies: [],
                    };
                }

                if (like) {
                    acc[tweet.id].likes.push(like);
                    const ids = acc[tweet.id].likes.map(({ id }) => id);
                    const filteredLikesArr = acc[tweet.id].likes.filter(
                        ({ id }, index) => !ids.includes(id, index + 1)
                    );
                    acc[tweet.id].likes = filteredLikesArr;
                }

                // if (reply) {
                //     acc[tweet.id].replies.push(reply);
                //     const ids = acc[tweet.id].replies.map(({ id }) => id);
                //     const filteredRepliesArr = acc[tweet.id].replies.filter(
                //         ({ id }, index) => !ids.includes(id, index + 1)
                //     );
                //     acc[tweet.id].replies = filteredRepliesArr;
                // }

                return acc;
            }, {});

            const data = Object.values(result);
            // console.log("data", data);

            return { data };
        }

        throw new Error("Could not complete query")
        // return { data: res }
    } catch (error) {
        console.log("error executing query", error);
        return { error: 'db querying failed!' }
    }
}
