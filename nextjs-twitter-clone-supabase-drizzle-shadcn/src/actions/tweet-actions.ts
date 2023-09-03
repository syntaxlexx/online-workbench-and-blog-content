'use server'

import { db } from '@/lib/db';
import { likes, replies, tweets } from '@/lib/db/schema';
import { supabaseServer } from '@/lib/supabase/index'
import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache';

/**
 * like a single tweet
 */
export async function likeTweet(
    { id, userId }: { id: string, userId: string }) {
    const resp = await db.insert(likes).values({
        id: randomUUID(),
        tweetId: id,
        userId: userId
    })
    // TODO: handle error on fail
    console.log("liked", resp);
    revalidatePath('/')
};

/**
 * unlike a single tweet
 */
export async function unlikeTweet(
    { id, userId }: { id: string, userId: string }) {
    const resp = await supabaseServer
        .from('likes')
        .delete()
        .eq('tweet_id', id)
        .eq('user_id', userId)
    console.log("unliked", resp);
    revalidatePath('/')
};

/**
 * get the likes counter
 */
export async function getLikesCount({
    id,
}: { id: string }) {
    const res = await supabaseServer
        .from('likes')
        .select('*', {
            count: 'exact'
        })
        .eq('tweet_id', id)

    return res;
}

/**
 * get if user has liked tweet
 */
export async function hasLiked({
    id,
    userId,
}: { id: string, userId: string, }) {
    const res = await supabaseServer
        .from('likes')
        .select('id')
        .eq('tweet_id', id)
        .eq('user_id', userId)


    return Boolean(res?.data?.length > 0);
}


/**
 * reply to a single tweet
 */
export async function replyToTweet(
    { id, userId, reply }: { id: string, userId: string, reply: string }) {

    if (reply === "") return;

    const resp = await db.insert(replies).values({
        id: randomUUID(),
        tweetId: id,
        userId,
        text: reply,
    })
    // TODO: handle error on fail
    console.log("replied to", resp);
    revalidatePath('/')
};