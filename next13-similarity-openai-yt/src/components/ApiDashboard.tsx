import { FC } from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import {formatDistance} from 'date-fns'
import LargeHeading from "@/ui/LargeHeading";
import Paragraph from "@/ui/Paragraph";
import Input from "@/ui/Input";
import Table from "@/components/Table";
import ApiKeyOptions from "@/components/ApiKeyOptions";
import CheckSimilarityForm from "@/components/CheckSimilarityForm";

const ApiDashboard = async () => {
    const session = await getServerSession(authOptions);

    if(! session) return notFound();

    const apiKeys = await db.apiKey.findMany({
        where: {
            userId: session.user.id
        }
    })

    const activeApiKey = apiKeys.find(apiKey => apiKey.enabled)

    if(!activeApiKey) return notFound();

    const userRequests = await db.apiRequest.findMany({
        where: {
            apiKeyId: {
                in: apiKeys.map(key => key.id)
            }
        }
    })

    const serializableRequests = userRequests.map(req => ({
        ...req,
        timestamp: formatDistance(new Date(req.timestamp), new Date())
    }))

    return <div className='container flex flex-col gap-6 '>
        <LargeHeading>Welcome back, {session.user.name}</LargeHeading>
        <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
            <Paragraph>Your API key:</Paragraph>
            <Input className='w-fit truncate' readOnly value={activeApiKey.key}/>
            <ApiKeyOptions apiKeyId={activeApiKey.id} apiKeyKey={activeApiKey.key} />
        </div>

        <div className="my-5 bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
            <CheckSimilarityForm />
        </div>

        <Paragraph className='text-center md:text-left mt-4 -mb-4'>Your API history:</Paragraph>

        <Table userRequests={serializableRequests} />
    </div>
}

export default ApiDashboard