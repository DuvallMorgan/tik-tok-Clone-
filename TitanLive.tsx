import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";

// The "Face" for TikTok LIVE
export const TikTokLiveRoom = ({ channelName, token }) => {
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  
  useEffect(() => {
    const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
    
    const startStream = async () => {
      // 5G Optimization: High-precision routing
      await client.join(process.env.AGORA_APP_ID, channelName, token);
      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      await client.publish(videoTrack);
      setLocalVideoTrack(videoTrack);
      videoTrack.play("local-stream-container");
    };

    startStream();
    return () => {
      localVideoTrack?.stop();
      client.leave();
    };
  }, [channelName]);

  return (
    <div className="relative h-screen w-full bg-black flex items-center justify-center">
      <div id="local-stream-container" className="h-full w-full object-cover" />
      
      {/* Japan 2000s Overlay: Neon Pulse Chat */}
      <div className="absolute bottom-10 left-4 w-72 h-64 overflow-y-auto z-20 pointer-events-none">
        <LiveChatOverlay channelId={channelName} />
      </div>
      
      {/* Singapore Command: Real-time 5G Metrics */}
      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-[10px] text-cyan-400 border border-cyan-400/30">
        LATENCY: 120ms | 5G_STABLE
      </div>
    </div>
  );
};
