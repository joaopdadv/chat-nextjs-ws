/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Metadata } from "next";

export const revalidate = 60

export const metadata: Metadata = {
    title: 'Server Component',
    description: 'Teste de server component usando docker container',
};

interface Message{
    id: string,
    message: string,
    from: string,
    to: string,
    createdAt: string
}

async function ServerComponent() {
    
    const messages:Message[] = await fetch('http://chat:3001/messages').then(
        (res) => res.json()
    );
    
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            {
                messages.map((e:Message, index:number) => {
                    return(
                        <div key={index} className="mb-4">
                            <p>{e.message}</p>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default ServerComponent;