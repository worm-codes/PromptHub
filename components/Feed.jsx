"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PromptCard from "@components/PromptCard";

const PromptCardList = ({
  prompts,
  handleTagClick,
  copied,
  handleCopiedPrompt,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {prompts?.map((prompt) => (
        <PromptCard
          handleCopiedPrompt={handleCopiedPrompt}
          copied={copied}
          key={prompt?._id}
          prompt={prompt}
          handleTagClick={handleTagClick}
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [search, setSearch] = useState("");
  const [prompts, setPrompts] = useState([]);
  const [copied, setCopied] = useState("");

  const handleCopiedPrompt = (prompt) => {
    setCopied(prompt);
  };

  const getPrompts = async () => {
    const response = await fetch("/api/prompt/getAllPrompts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { prompts } = await response.json();

    setPrompts(prompts);
  };
  useEffect(() => {
    getPrompts();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <section className="feed">
      <form
        className="relative w-full
      flex-center"
      >
        <input
          value={search}
          onChange={handleSearchChange}
          type="text"
          placeholder="Search a tag or username..."
          required
          className="search_input peer"
        />
      </form>
      {prompts?.length > 0 && (
        <PromptCardList
          copied={copied}
          handleCopiedPrompt={handleCopiedPrompt}
          prompts={prompts}
          handleTagClick={() => {}}
        />
      )}
    </section>
  );
};

export default Feed;
