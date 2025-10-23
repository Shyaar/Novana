"use client";

import { Header } from "../components/header";
import { BottomNavigation } from "../components/bottom-navigation";
import RoomCard from "../components/cards/room-card";
import { useReadMyRooms } from "../../hooks/usePlatformHook";
import { useEffect } from "react";

export default function UserRoomsPage() {
  const { rooms, isLoading, isError, refetch } = useReadMyRooms();
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 pb-24">
      <Header title="My rooms" />

      <div className="px-4 py-6">
        {/* Room List */}
        <div className="space-y-3">
          {rooms.map((room) => (
            <RoomCard
              key={room.id}
              title={room.topic}
              members={room.memberCount}
              onClick={() => console.log(`Clicked room: ${room.topic}`)}
            />
          ))}
        </div>
      </div>
      {isLoading && <p>Fetching your rooms...</p>}

      <BottomNavigation />
    </div>
  );
}
