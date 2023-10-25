"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams?.get("id");
  const [post, setPost] = useState({
    prompt: "",
    header: "",
    tags: [],
    userId: "",
  });
  const getPrompt = async () => {
    const response = await fetch(`/api/prompt/${promptId}`);
    const { prompt } = await response.json();
    setPost({
      prompt: prompt.prompt,
      header: prompt.header,
      tags: prompt.tags,
      userId: prompt.userId,
    });
  };
  useEffect(() => {
    if (promptId) getPrompt();
  }, [promptId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          header: post.header,
          tags: post.tags,
          userId: post.userId,
        }),
      });

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
      type="Edit"
      post={post}
      setPost={setPost}
      isSubmitting={isSubmitting}
      setIsSubmitting={setIsSubmitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditPrompt;
