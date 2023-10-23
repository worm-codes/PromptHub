"use client";
import { useEffect, useState } from "react";

import { PromptCardList } from "./PromptCardList";

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
  const getFilteredPrompts = async () => {
    const response = await fetch(`/api/prompt/filterPrompt/${search}`);
    const real = await response.json();
    console.log(real);
  };
  useEffect(() => {
    if (search.length > 0) {
      const timeOut = setTimeout(() => {
        getFilteredPrompts();
      }, 600);
      return () => clearTimeout(timeOut);
    }
  }, [search]);
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
          placeholder="Search a tag or prompt..."
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
