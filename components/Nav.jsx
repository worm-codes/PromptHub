"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signOut, signIn, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const router = useRouter();

  const handleProviders = async () => {
    const response = await getProviders();
    setProviders(response);
  };
  useEffect(() => {
    handleProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link
        href="/"
        className="flex gap-2 flex-center"
      >
        <Image
          src="/assets/images/logo.svg"
          width={30}
          height={30}
          className="object-contain"
        />{" "}
        <p className="logo_text">PromptHub</p>
      </Link>

      {/* desktop nav */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link
              href="/create-prompt"
              className="black_btn"
            >
              Create Post
            </Link>
            <button
              onClick={async () => {
                try {
                  await signOut();
                } catch (err) {
                  console.log(err);
                }
              }}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href={`/profile/${session?.user?.id}`}>
              <Image
                width={37}
                height={37}
                alt="profile"
                className="rounded-full"
                src={session?.user?.image}
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={async () => {
                    await signIn(provider.id);
                    router.push(`/profile/${session?.user?.id}`);
                  }}
                  className="black_btn"
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
      {/* mobile nav */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex cursor-pointer">
            <Image
              width={37}
              height={37}
              alt="profile"
              className="rounded-full"
              src={session?.user?.image}
              onClick={() => {
                setToggleDropdown((prev) => !prev);
              }}
            />

            {toggleDropdown && (
              <div className="dropdown ">
                <Link
                  href={`/profile/${session?.user?.id}`}
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={async () => {
                    setToggleDropdown(false);
                    try {
                      await signOut();
                    } catch (err) {
                      console.log(err);
                    }
                  }}
                  className="black_btn  w-full text-center mt-5"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={async () => {
                    await signIn(provider.id);
                    router.push(`/profile/${session?.user?.id}`);
                  }}
                  className="black_btn"
                >
                  Sign in with {provider.name}
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
