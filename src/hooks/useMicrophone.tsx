import { useState, useEffect, useCallback } from "react";

interface UseMicrophoneReturn {
  getMicrophoneAccess: () => Promise<void>;
  disconnect: () => void;
  mute: () => void;
  unmute: () => void;
  toggleMute: () => void;
  isMuted: boolean;
  isConnected: boolean;
}

const useMicrophone = (): UseMicrophoneReturn => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioTrack, setAudioTrack] = useState<MediaStreamTrack | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  // console.log(audioTrack, isMuted, isConnected);
  const disconnect = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setAudioTrack(null);
      setIsConnected(false);
      setIsMuted(true);
    }
  }, [stream]);

  const getMicrophoneAccess = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("getUserMedia() not supported");
      return;
    }

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
      const newAudioTrack = newStream.getAudioTracks()[0];
      setStream(newStream);
      setAudioTrack(newAudioTrack);
      setIsConnected(true);
      setIsMuted(false);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const mute = () => {
    if (audioTrack) {
      audioTrack.enabled = false;
      setIsMuted(true);
    }
  };

  const unmute = () => {
    if (audioTrack) {
      audioTrack.enabled = true;
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
    console.log(audioTrack);
  };

  /** Ensure track.enabled matches state */
  useEffect(() => {
    if (audioTrack) {
      audioTrack.enabled = !isMuted;
    }
  }, [audioTrack, isMuted]);

  useEffect(() => {
    return () => {
      disconnect();
    };
  }, [disconnect]);

  return {
    getMicrophoneAccess,
    disconnect,
    mute,
    unmute,
    toggleMute,
    isMuted,
    isConnected,
  };
};

export default useMicrophone;
