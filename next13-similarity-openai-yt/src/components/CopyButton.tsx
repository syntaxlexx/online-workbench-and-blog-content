'use client'

import { ButtonHTMLAttributes, FC } from 'react'
import Button from "@/ui/Button";
import { toast } from "@/ui/Toast";
import { Copy } from 'lucide-react';

interface CopyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    valueToCopy: string,
}

const CopyButton: FC<CopyButtonProps> = ({
    valueToCopy,
    className,
    ...props
}) => {
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(valueToCopy);

        toast({
            title: 'Copied!',
            message: 'API key copied to clipboard',
            type: 'success'
        })
    }

    return <Button
        {...props}
        variant='ghost'
        className={className}
        onClick={copyToClipboard}>
        <Copy className='h-5 w-5' />
    </Button>
}

export default CopyButton