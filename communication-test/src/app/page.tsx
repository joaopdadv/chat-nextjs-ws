/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import io, { type Socket } from 'socket.io-client'
import { useRouter } from "next/navigation";
let socket:Socket;

class MessageObject{
  constructor(
    public from:string,
    public message:string
  ){}
}

export default function HomePage() {

  const chatMessageRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [receiverId, setReceiverId] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [messages, setMessages] = useState<MessageObject[]>([]);

  useEffect(() => {
    socket = io('http://localhost:3001', {
      query: { clientId: id },
    });

    socket.on('connect', () => {
      console.log('Connected to websocket');
    });
    
    socket.on('message', (message:MessageObject) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      router.refresh();
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    if (chatMessageRef.current) {
      chatMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages])

  function send():void {
    if(receiverId.trim() == '' || text.trim() == ''){
      return;
    }

    socket.emit('message', { to: receiverId, message: text })
    
    const newMessage = new MessageObject(id, text);
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setText('');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="w-2/4 text-black flex justify-between gap-4 mb-4">
        <Input placeholder="Seu Id" value={id} onChange={(e) => setId(e.target.value)}/>
        <Input placeholder="ID do receptor" value={receiverId} onChange={(e) => setReceiverId(e.target.value)}/>
      </div>

      <div className="w-2/4 h-96 bg-white text-black flex justify-between flex-col p-4 rounded-xl">
          <ScrollArea className="h-full w-full rounded-md p-4">
            {messages.map((e:MessageObject, index:number) => {
              return (
                <div key={index} ref={index === messages.length - 1 ? chatMessageRef : null}>
                  <Message  m={e} id={id}/>
                </div>
              )
            })}
          </ScrollArea>
        <div className="flex gap-4">
          <Input placeholder="Insira sua mensagem aqui" value={text} onChange={(e) => setText(e.target.value)}/>
          <Button onClick={() => send()}>
            Enviar
          </Button>
        </div>
      </div>
    </main>
  );
}

function Message({m, id}:any){
  const {from, message} = m || {};

  return(
    <div className="w-full relative">
      {
        from == id ?
        <div className="bg-green-300 p-4 rounded w-max max-w-96 mb-2">
          {message}
        </div>
        :
        <div className="bg-gray-300 p-4 rounded w-max max-w-96 mb-2">
          {message}
        </div>
      }
    </div>
  )
}