'use client'

import { FC, FormEvent, useState } from 'react'
import Input from "@/ui/Input";
import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import { ZodError } from "zod";
import Paragraph from "@/ui/Paragraph";

interface CheckSimilarityFormProps {
}

const CheckSimilarityForm: FC<CheckSimilarityFormProps> = ({}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [textOne, setTextOne] = useState<string>('')
    const [textTwo, setTextTwo] = useState<string>('')
    const [apiKey, setApiKey] = useState<string>('')
    const [results, setResults] = useState<string | null>(null)

    const checkSimilarity = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(textOne.length < 1 ||textTwo.length < 1 ||apiKey.length < 1) {
            toast({
                title: 'Error',
                message: "Fill out the entire form",
                type: 'error'
            })
            return
        }

        setIsLoading(true)
        setResults(null)

        try {
            const res = await fetch('/api/v1/similarity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': apiKey,
                },
                body: JSON.stringify({
                    text1: textOne,
                    text2: textTwo,
                })
            })

            const data = await res.json()
            if (data.error) {
                throw new Error(data.error)
            }

            if (!data.similarity) {
                throw new Error(data.error)
            }

            console.log('data', data)
            let resultMessage = 'Similarity between '
            resultMessage += `"${data.text1}"`;
            resultMessage += ' and ';
            resultMessage += `"${data.text2}"`;
            resultMessage += ' is: ';
            resultMessage += data.similarity + '%';

            setResults(resultMessage)
            setTextOne('')
            setTextTwo('')
            setApiKey('')
        } catch (err) {
            if (err instanceof Array) {
                toast({
                    title: 'Error',
                    message: err.join(' '),
                    type: 'error'
                })

                return
            }
            toast({
                title: 'Error',
                message: err?.toString() || 'An error occurred',
                type: 'error'
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Paragraph>Mimic Our API</Paragraph>
            <form onSubmit={checkSimilarity}>
                <div className='flex gap-6 items-center justify-center'>
                    <Input
                        value={textOne}
                        placeholder='Text 1'
                        onChange={e => setTextOne(e.target.value)}
                    />
                    <Input
                        value={textTwo}
                        placeholder='Text 2'
                        onChange={e => setTextTwo(e.target.value)}
                    />
                </div>
                <div className='flex gap-6 items-center justify-center mt-5'>
                    <Input
                        value={apiKey}
                        placeholder='apiKey to use'
                        onChange={e => setApiKey(e.target.value)}
                    />

                    <Button isLoading={isLoading}>Check</Button>
                </div>
            </form>

            {results && (
                <div className='mt-5 flex flex-col gap-2 items-center justify-center text-center'>
                    <Paragraph>Results:</Paragraph>
                    <Paragraph>{results}</Paragraph>
                </div>
            )}
        </>
    )

}

export default CheckSimilarityForm