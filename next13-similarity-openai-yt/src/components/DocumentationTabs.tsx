'use client'

import { FC } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/Tabs";
import SimpleBar from "simplebar-react";
import Code from "@/components/Code";
import { nodejs, python } from "@/helpers/documentation-code";

const DocumentationTabs: FC = () => {
    return <Tabs defaultValue='nodejs' className='max-w-2xl w-full'>
        <TabsList>
            <TabsTrigger value='nodejs'>NodeJS</TabsTrigger>
            <TabsTrigger value='python'>Python</TabsTrigger>
        </TabsList>
        <TabsContent value='nodejs'>
            <SimpleBar>
            <Code code={nodejs} show animated language='javascript' />
            </SimpleBar>
        </TabsContent>
        <TabsContent value='python'>
            <SimpleBar>
            <Code code={python} show animated language='python' />
            </SimpleBar>
        </TabsContent>
    </Tabs>
}

export default DocumentationTabs