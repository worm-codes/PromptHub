"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
const PromptCard = ({
  prompt,
  handleTagClick,
  handleEdit,
  handleDelete,
  handleCopiedPrompt,
  copied,
}) => {
  return (
    <div
      onClick={() => {
        handleCopiedPrompt(prompt?.prompt);
        navigator.clipboard.writeText(prompt?.prompt);
        setTimeout(() => {
          handleCopiedPrompt("");
        }, 3000);
      }}
      className="prompt_card cursor-pointer"
    >
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 ">
          <Image
            src={prompt?.creator?.image}
            alt="profile picture"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {prompt?.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {prompt?.creator?.email}
            </p>
          </div>
        </div>
        <div className="copy_btn">
          <Image
            src={
              copied === prompt?.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 ml-1 font-satoshi text-sm text-gray-700">
        {prompt?.prompt}
      </p>
      <div className="font-satoshi font-semibold text-base flex flex-wrap justify-start gap-2 mb-3">
        {prompt?.tags?.map((tag) => (
          <span
            onClick={() => {
              handleTagClick(tag);
            }}
            className="tag-span"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PromptCard;
