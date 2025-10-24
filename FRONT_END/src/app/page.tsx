"use client";

import Image from "next/image";
import { toast } from "react-toastify";
import generateRandomNameFromAddress from "@/genUserData/genUserName";
import generateAvatarFromAddress from "@/genUserData/genUserAvatar";
import { useReadUsers, useRegisterUser } from "@/hooks/useUserHooks";
import useUserStore from "@/store/userUserStore";
import { useEffect, useRef, useState } from "react";
import UiButton from "./components/ui/modals/uiButton";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    fc?: {
      user?: {
        fid?: string;
      };
    };
  }
}

export default function Home() {
  const router = useRouter();
  const { setUser } = useUserStore();
  const { userData, isLoading, isRegistered } = useReadUsers();
  const {
    register,
    isPending,
    isConfirming,
    isConfirmed,
    error: writeError,
  } = useRegisterUser();
  const hasRegistered = useRef(false);
  const farcasterId = window.fc?.user?.fid;

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {}, [
    isLoading,
    isPending,
    isConfirming,
    isConfirmed,
    writeError,
    farcasterId,
  ]);

  async function initializeUser() {
    if (isLoading || hasRegistered.current) return;

    if (!farcasterId) {
      toast.error("Farcaster ID not detected. Please log in.");
      return;
    }

    if (isRegistered && userData) {
      const { name, avatar } = userData;
      setUser(name, avatar);
      toast.success(`Welcome back, ${name}!`);
      setShowModal(false);
      router.push("/discover");
      return;
    }

    if (!isRegistered && !hasRegistered.current) {
      hasRegistered.current = true;
      const name = generateRandomNameFromAddress(farcasterId);
      const avatar = generateAvatarFromAddress(farcasterId);

      setUser(name, avatar);
      toast.info("New user detected, registering...");
      setShowModal(true);
      setModalMessage("Please wait while we create your account...");

      try {
        await register(name, avatar);
        router.push("/userRegistered");
      } catch (err) {
        toast.error("Registration failed");
      } finally {
        setShowModal(false);
      }
    }
  }

  return (
    <main className="bg-white w-full h-screen relative flex flex-col items-center justify-center mt-6">
      <Image
        className="w-full p-6 h-auto md:max-w-md"
        src="/hero.png"
        alt="Group"
        width={458}
        height={446}
      />

      <div className="my-4">
        <UiButton text="Get Started" onClick={() => initializeUser()} />
      </div>

      <section className="flex flex-col w-[200px] items-center justify-center">
        <h1 className="text-[#071133] font-semibold text-2xl">
          Talk. Heal. Grow.
        </h1>
      </section>
    </main>
  );
}
