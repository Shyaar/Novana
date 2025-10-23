"use client";

import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAccount, useConnect } from "wagmi";
import { useRouter } from "next/navigation";
import useUserStore from "../../../store/userUserStore";
import { useReadUsers, useRegisterUser } from "../../../hooks/useUserHooks";
import ConnectButton from "../ui/buttons/connetWallet";
import generateRandomNameFromAddress from "@/genUserData/genUserName";
import generateAvatarFromAddress from "@/genUserData/genUserAvatar";

export default function Nav() {
  const router = useRouter();
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { register } = useRegisterUser();

  const { name, avatar, setUser } = useUserStore();

  const { userData, isLoading, isRegistered } = useReadUsers();

  const hasRegistered = useRef(false);
  useEffect(() => {
    async function initializeUser() {
      if (name && avatar) return;
      if (isLoading) return;

      if (!isConnected || !address) {
        try {
          toast.info("Connecting your wallet...");
          const injectedConnector = connectors.find((c) => c.id === "injected");
          if (!injectedConnector) throw new Error("No injected wallet found");

          const { accounts } = await connectAsync({
            connector: injectedConnector,
          });
          const userAddress = accounts[0];
          console.log("Connected wallet:", userAddress);
          toast.success(`Connected: ${userAddress}`);
          return;
        } catch (error) {
          console.error("Wallet connection failed:", error);
          toast.error("Failed to connect wallet");
          return;
        }
      }

      if (isRegistered && userData) {
        const { name, avatar } = userData;
        console.log("User fetched from chain:", { name, avatar });
        setUser(name, avatar);
        toast.success(`Welcome back, ${name}!`);
        router.push("/discover");
        return;
      }

      if (!isRegistered && !hasRegistered.current) {
        hasRegistered.current = true;
        const name = generateRandomNameFromAddress(address);
        const avatar = generateAvatarFromAddress(address);
        console.log("name:", name);
        console.log("avatar:", avatar);
        toast.info("New user detected, registering...");
        await register(name, avatar);
        toast.success(`Welcome, ${name}!`);
        setUser(name, avatar);
        const { name: updatedName, avatar: updatedAvatar } =
          useUserStore.getState();
        console.log("newUser @", updatedName, updatedAvatar);
        router.push("/userRegistered");
        return;
      }
    }

    initializeUser();
  }, [
    isConnected,
    address,
    isRegistered,
    isLoading,
    name,
    avatar,
    userData,
    connectAsync,
    connectors,
    register,
    setUser,
    router,
  ]);

  return (
    <header className="border-b border-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg">
              <img
                className="w-[50px] h-[50px]"
                src="/logo.png"
                alt="Novana Logo"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">Novana</h1>
              <p className="text-xs">You should never walk alone</p>
            </div>
          </div>

          <div>
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}
