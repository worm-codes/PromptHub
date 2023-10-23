"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import Link from "next/link";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const getProfilePrompts = async () => {
    setLoading(true);
    const response = await fetch(`/api/users/${id}/posts`);

    const { prompts } = await response.json();
    setPrompts(prompts);
    setLoading(false);
  };
  useEffect(() => {
    if (id && id !== "undefined") {
      getProfilePrompts();
    } else {
      router.push("/");
    }
  }, [id]);

  const handleEdit = (promptId) => {
    router.push(`/update-prompt?id=${promptId}`);
  };
  const handleDelete = async (promptId) => {
    const response = await fetch(`/api/prompt/${promptId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      getProfilePrompts();
    }
  };

  return (
    !loading &&
    (prompts?.length > 0 ? (
      <Profile
        name="Profile"
        desc="Every prompt you will ever need."
        data={prompts}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    ) : (
      <h1 className="head_text text-left">
        <div className="blue_gradient">This user has no prompts yet.</div>
        {session?.user?.id === id && (
          <div
            className="flex justify-center items-center gap-3
           flex-col"
          >
            <div className="blue_gradient">Why not create one?</div>
            <Link
              href="/create-prompt"
              className="black_btn w-1/4 text-center"
            >
              Create Now !
            </Link>
          </div>
        )}
      </h1>
    ))
  );
};

export default ProfilePage;
