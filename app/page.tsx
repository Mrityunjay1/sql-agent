'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';

type AIInput = {
  query: string;
};

type AIOutputput = {
  rows: string[];
};


export default function Chat() {
  const [input, setInput] = useState('');
  const { messages, sendMessage } = useChat();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map(message => (
        <div
          key={message.id}
          className={`mb-4 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className="flex items-end gap-2 max-w-[85%]">
            {message.role !== 'user' && (
              <div className="h-7 w-7 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                AI
              </div>
            )}

            <div
              className={`rounded-2xl px-3 py-2 text-sm leading-relaxed shadow-sm border
                ${message.role === 'user'
                  ? 'bg-black text-white dark:bg-zinc-800 border-transparent'
                  : 'bg-white text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800'}
              `}
            >
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'text':
                    return (
                      <p key={`${message.id}-${i}`} className="whitespace-pre-wrap">
                        {part.text}
                      </p>
                    );
                }
              })}
            </div>

            {message.role === 'user' && (
              <div className="h-7 w-7 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                You
              </div>
            )}
          </div>
        </div>
      ))}

      <form
        onSubmit={e => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput('');
        }}
        className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pb-8"
      >
        <div className="flex items-center gap-2 rounded-2xl border border-zinc-300 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/50 p-2 shadow-xl">
          <input
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700 rounded-xl"
            value={input}
            placeholder="Ask a question…"
            onChange={e => setInput(e.currentTarget.value)}
          />
          <button
            type="submit"
            disabled={input.trim().length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-black text-white dark:bg-zinc-800 px-3 py-2 text-sm font-medium hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}