import { PromptCardList } from "@components/PromptCardList";
import { useState } from "react";

const Profile = ({ name, desc, data, handleDelete, handleEdit }) => {
  const [copied, setCopied] = useState("");
  const handleCopiedPrompt = (prompt) => {
    setCopied(prompt);
  };
  return (
    <section className="w-full ">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name}</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <PromptCardList
        copied={copied}
        handleCopiedPrompt={handleCopiedPrompt}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        prompts={data}
        handleTagClick={() => {}}
      />
    </section>
  );
};

export default Profile;
