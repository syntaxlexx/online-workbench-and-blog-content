import Paragraph from "@/components/ui/Paragraph";

import type { Metadata } from "next";
import LargeHeading from "@/ui/LargeHeading";
import Link from "next/link";
import Image from "next/image";

import 'simplebar-react/dist/simplebar.min.css'

export const metadata: Metadata = {
    title: 'Similarity API | Home',
    description: 'Free and Open-source text similarity'
}

export default function Home() {
    return (
        <main className="relative h-screen flex items-center justify-center overflow-x-hidden">
            <div className="container pt-32 max-7xl mx-auto w-full h-full">
                <div className="h-full gap-6 flex flex-col justify-start lg:justify-center items-center lg:items-start">
                    <LargeHeading size="lg" className="three-d text-black dark:text-light-gold">
                        Easily determine <br/> text similarity
                    </LargeHeading>
                    <Paragraph className="max-w-xl lg:text-left">
                        With the text similarity API, you can easily determine the similarity between two pieces of text
                        with a free {' '}
                        <Link href='/login' className='underline underline-offset-2 text-black dark:text-light-gold'>
                            API Key
                        </Link>
                    </Paragraph>
                    <div className="relative w-full max-w-lg lg:max-w-3xl lg:left-1/2 aspect-square lg:absolute">
                        <Image
                            priority
                            className="img-shadow"
                            fill
                            quality={100}
                            style={{ objectFit: 'contain' }}
                            src='/typewriter.png'
                            alt='typewriter'
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
