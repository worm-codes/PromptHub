"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePrompt = () => {
  const { data: session } = useSession();
  const [post, setPost] = useState({
    prompt: "",
    header: "",
    tags: [],
    userId: "",
  });
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          header: post.header,
          tags: post.tags,
          userId: session?.user?.id,
        }),
      });
      console.log(response);
      setIsSubmitting(false);
      if (response.ok) {
        router.push(`/profile/${post.userId}`);
      } else {
        console.log("Error");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default CreatePrompt;
