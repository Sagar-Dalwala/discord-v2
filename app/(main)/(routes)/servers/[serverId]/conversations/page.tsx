"use client";
import React, { useState } from "react";
import { ChatHeader } from "@/components/chat/chat-header";
import { ChatWelcome } from "@/components/chat/chat-welcome";
import { UserButton } from "@clerk/nextjs";
import imageUrl from "../../../../../../public/Discord neon icon.jpeg";
import Image from "next/image";
import axios from "axios";
import { v4 as uuid } from "uuid"; // Import the new component
import LanguageSelector from "@/components/translation/LanguageSelector";
import {
  SendHorizonalIcon,
  ClipboardIcon,
  ClipboardCheckIcon,
} from "lucide-react"; // Import ClipboardIcon
import { ActionTooltip } from "@/components/action-tooltip";

type messageData =
  | Array<{ message: string; sent: boolean; messageId: string }>
  | [];

function Page() {
  const [message, setMessage] = useState<string>("");
  const [messageList, setMessageList] = useState<messageData>([]);
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en"); // Default language
  const [isLoading, setIsLoading] = useState<boolean>(false); // State for loading

  const formHandler = async () => {
    if (!message.trim()) return; // Don't send empty messages
    setIsDisable(true);
    setMessageList((prev) => {
      return [...prev, { message, sent: true, messageId: uuid() }];
    });

    // Call the translation API
    let translatedMessage = message; // Default to original message
    try {
      const translationResponse = await axios.post("/api/translate", {
        message,
        targetLang: selectedLanguage, // Use the selected language
      });

      if (translationResponse.data && translationResponse.data.translatedText) {
        translatedMessage = translationResponse.data.translatedText; // Use the translated message
      }
    } catch (error) {
      console.error("Translation error:", error);
      // Optionally handle error (e.g., set an error message)
    }

    // Prepare data for the AI model
    const data = {
      contents: [{ parts: [{ text: translatedMessage }] }],
    };

    setMessage("");
    setIsLoading(true); // Start loading

    // Call the AI model
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBp34TguXuOFSSIqW9v0cuZQkigpI1PV5Y",
        data,
        {
          headers: {
            "Content-Type": "application/json", // Fixed content type
          },
        }
      );

      if (response.data) {
        let aiMessage = response?.data?.candidates[0]?.content.parts[0]?.text;
        aiMessage = aiMessage.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        aiMessage = aiMessage.replace(/\n/g, "<br/>");

        setMessageList((prev) => {
          return [
            ...prev,
            { message: aiMessage, sent: false, messageId: uuid() },
          ];
        });
      }
    } catch (error) {
      console.error("AI response error:", error);
      // Optionally handle error (e.g., set an error message)
    } finally {
      setIsLoading(false); // Stop loading
    }

    setIsDisable(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formHandler(); // Send message on "Enter"
    }
  };

  const [isCopied, setIsCopied] = useState(false);

  // Function to copy message to clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text.replace(/<br\/>/g, "\n"));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 5000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-screen">
      <ChatHeader
        name={"Discord Nitro"}
        serverId={"dhhdhd"}
        type="conversation"
      />

      <div className="flex-1 flex flex-col py-4 overflow-y-auto scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-600 scrollbar-w-[7px]">
        <div className="flex flex-col-reverse mt-auto ">
          <ChatWelcome type={"conversation"} name={"Discord Nitro"} />
        </div>

        <div>
          {messageList.length > 0 &&
            messageList.map((messageDetails) => {
              if (messageDetails.sent) {
                return (
                  <div
                    key={messageDetails.messageId}
                    className="relative group flex items-center hover:bg-black/5 p-4 transition w-full"
                  >
                    <div className="group flex gap-x-2 justify-end w-full ">
                      <div className="flex flex-col justify-center items-center">
                        <div className="flex items-center gap-x-2">
                          <span className="text-md items-center text-zinc-500 bg-zinc-200/65 dark:text-zinc-400 dark:bg-zinc-700 px-2 py-3 rounded-md">
                            {messageDetails.message}
                          </span>
                        </div>
                      </div>

                      <div className="cursor-pointer hover:drop-shadow-md transition">
                        <UserButton
                          afterSignOutUrl="/"
                          appearance={{
                            elements: {
                              avatarBox: "h-[48px] w-[48px] rounded-full",
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div
                    key={messageDetails.messageId}
                    className="relative group flex items-center flex-col hover:bg-black/5 p-4 transition w-full"
                  >
                    <div className="group flex gap-x-2 items-start w-full ">
                      <div className="cursor-pointer hover:drop-shadow-md transition">
                        <Image
                          src={imageUrl}
                          alt="Discord Nitro"
                          width={40}
                          height={40}
                          className="rounded-md"
                        />
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="flex items-center gap-x-2">
                          <div className="flex items-center">
                            <p className="font-semibold text-sm hover:underline cursor-pointer">
                              Discord Nitro
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="group flex gap-x-2 items-start w-full">
                      <span
                        className="text-md text-zinc-500 bg-zinc-200/65 dark:text-zinc-400 ms-9 dark:bg-zinc-700 px-2  py-3 rounded-md mt-2"
                        dangerouslySetInnerHTML={{
                          __html: messageDetails.message,
                        }}
                      ></span>
                      <button
                        onClick={() => copyToClipboard(messageDetails.message)} // Add click handler
                        className="ml-2 mt-2 p-1 rounded hover:bg-gray-200 dark:hover:bg-black/30 transition"
                      >
                        <ActionTooltip label="Copy">
                          {!isCopied && (
                            <ClipboardIcon className="w-5 h-5 text-gray-500 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400" />
                          )}
                        </ActionTooltip>

                        {isCopied && (
                          <ActionTooltip label="Copied">
                            <ClipboardCheckIcon className="w-5 h-5 text-gray-500 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400" />
                          </ActionTooltip>
                        )}
                      </button>
                    </div>
                  </div>
                );
              }
            })}
        </div>

        {isLoading && ( // Show loading spinner if loading
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-900 ring-2 ring-indigo-500 shadow-xl shadow-indigo-500/50"></div>
          </div>
        )}
      </div>

      <div className="flex w-full p-4 rounded">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage} // Handle language change
        />
        <textarea
          disabled={isDisable}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex h-10 w-full rounded-md bg-gray-200/60 px-3 py-2 text-md text-gray-500 placeholder:text-gray-500 dark:text-gray-300 dark:placeholder:text-gray-300 focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 resize-none"
          rows={2}
        />
        <div
          onClick={formHandler}
          className={`${
            isDisable ? "cursor-not-allowed" : "cursor-pointer"
          } p-2 rounded backdrop-blur-xl flex items-center justify-center`}
        >
          <SendHorizonalIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-gray-600 transition-all" />
        </div>
      </div>
    </div>
  );
}

export default Page;
