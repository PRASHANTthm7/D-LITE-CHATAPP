"use client";

import React, { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

export default function CallPage() {
  const { roomId } = useParams() as { roomId: string };
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !roomId) return;

    let zp: any = null;

    const initZego = async () => {
      // In a real production app, you should fetch a token from your backend.
      // For quick integration, if you have an app ID and Server Secret, you can generate a kit token here.
      // Warning: Hardcoding ServerSecret in frontend is NOT secure for production.
      const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID || 0);
      const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET || "";
      
      const userID = "user_" + Math.floor(Math.random() * 10000);
      const userName = "User " + userID.slice(-4);

      if (!appID || !serverSecret) {
        console.warn("Zego APP ID or Server Secret is missing. Call UI won't initialize correctly.");
      }

      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomId,
        userID,
        userName
      );

      zp = ZegoUIKitPrebuilt.create(kitToken);

      zp.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
        showScreenSharingButton: true,
        onLeaveRoom: () => {
          router.push("/dashboard");
        },
      });
    };

    initZego();

    return () => {
      if (zp) {
        zp.destroy();
      }
    };
  }, [roomId, router]);

  return (
    <div className="flex h-screen w-full themed-canvas overflow-hidden">
      <div 
        className="w-full h-full"
        ref={containerRef} 
      />
    </div>
  );
}
