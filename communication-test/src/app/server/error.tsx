'use client';
import { useEffect } from "react";

export default function Error({
    error,
    reset,
  }: {
    error: Error;
    reset: () => void;
  }) {
    useEffect(() => {
      console.error(error);
    }, [error]);
  
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <h2>Something went wrong!</h2>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}