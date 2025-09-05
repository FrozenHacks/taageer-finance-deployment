import React, { useEffect, useState } from "react";

import avatarIcon from "/robo.svg";
import micIcon from "/greenMic.svg";
import micOffIcon from "/redMic.svg";
import speakerIcon from "/pause.svg";
import endCallIcon from "/endCall.svg";

import SpeakingParticipant from "./SpeakingParticipant";
import {
  DisconnectButton,
  // useIsMuted,
  useLocalParticipant,
  useTranscriptions,
} from "@livekit/components-react";
import { calculateCallTime, transformTranscriptionData } from "../utils/utils";
// import useMicrophone from "../hooks/useMicrophone";

const CallSessionTimer: React.FC = () => {
  const transcriptions = useTranscriptions();
  // const { toggleMute, isMuted, isConnected } = useMicrophone();
  const { localParticipant } = useLocalParticipant();
  const [isMuted, setIsMuted] = useState(!localParticipant.isMicrophoneEnabled);

  // console.log(transcriptions.map((t) => t.participantInfo.identity));
  // const [seconds, setSeconds] = useState(120);
  // const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start and clean up timer
  // useEffect(() => {
  // 	intervalRef.current = setInterval(() => {
  // 		setSeconds((prev) => prev + 1);
  // 	}, 1000);

  // 	return () => {
  // 		if (intervalRef.current) clearInterval(intervalRef.current);
  // 	};
  // }, []);
  // const [timer, setTimer] = useState(0);

  const handleDisconnect = () => {
    if (transcriptions) {
      const transcription = transformTranscriptionData(transcriptions);
      calculateCallTime(transcriptions);
      sessionStorage.setItem("transcription", JSON.stringify(transcription));
      console.log(transcriptions);
    }
  };

  // const time = 120;
  // const formatTime = (totalSeconds: number): string => {
  //   const minutes = Math.floor(totalSeconds / 60);
  //   const remainingSeconds = totalSeconds % 60;
  //   return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
  //     .toString()
  //     .padStart(2, "0")} mins`;
  // };

  // const handleMute = () => {
  //   localParticipant.setMicrophoneEnabled(false);
  //   console.log();
  //   console.log(isConnected);
  //   console.log(isMuted);
  //   console.log("mute");
  // };
  useEffect(() => {
    setIsMuted(!localParticipant.isMicrophoneEnabled);
  }, [localParticipant.isMicrophoneEnabled]);

  const handleToggleMute = () => {
    localParticipant.setMicrophoneEnabled(isMuted);
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full max-w-4xl p-4 mx-auto">
      {/* Desktop Layout */}
      <div className="items-center hidden gap-6 md:flex">
        {/* Avatar */}
        {/* <div className="flex items-stretch justify-center">
          <img
            src={avatarIcon}
            alt="AI Assistant Avatar"
            className="w-[324px] h-full object-contain"
          />
        </div> */}

        {/* Call Info Panel */}
        <div className="flex-1 max-w-sm p-6 mx-auto bg-white border border-gray-100 shadow-lg rounded-2xl lg:p-8">
          <div className="mb-6 text-center">
            {/* <div className="mb-2 text-lg font-semibold text-green-600 lg:text-xl">
              {formatTime(time)}
            </div> */}
            <h2 className="mb-1 text-2xl font-bold text-blue-900 lg:text-3xl">
              <SpeakingParticipant />
            </h2>
          </div>

          {/* Control Icons */}
          <div className="flex items-center justify-center gap-6 lg:gap-6">
            <div
              onClick={handleToggleMute}
              className="flex items-center justify-center w-20 h-20 rounded-full cursor-pointer"
            >
              <img
                src={isMuted ? micOffIcon : micIcon}
                alt="Microphone"
                className="object-contain"
              />
              {/* <img
                src={micOffIcon}
                alt="Microphone"
                className="object-contain"
              /> */}
            </div>
            {/* <div className="flex items-center justify-center w-20 h-20 rounded-full cursor-pointer">
              <img src={speakerIcon} alt="Speaker" className="object-contain" />
            </div> */}
            <div className="flex items-center justify-center w-20 h-20 rounded-full cursor-pointer">
              <DisconnectButton onClick={handleDisconnect}>
                <img
                  src={endCallIcon}
                  alt="End Call"
                  className="object-contain"
                />
              </DisconnectButton>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="space-y-6 md:hidden">
        {/* Avatar */}
        <div className="flex justify-center">
          <img
            src={avatarIcon}
            alt="AI Assistant Avatar"
            className="object-contain w-40 h-40"
          />
        </div>

        {/* Call Info Panel */}
        <div className="p-6 bg-white border border-gray-100 shadow-lg rounded-2xl">
          <div className="mb-6 text-center">
            {/* <div className="mb-2 text-lg font-semibold text-green-600">
              {formatTime(time)}
            </div> */}
            <h2 className="mb-1 text-xl font-bold text-blue-900">
              <SpeakingParticipant />
            </h2>
          </div>

          {/* Control Icons */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-full">
              <img src={micIcon} alt="Microphone" className="object-contain" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full">
              <img src={speakerIcon} alt="Speaker" className="object-contain" />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-full">
              <DisconnectButton onClick={handleDisconnect}>
                <img
                  src={endCallIcon}
                  alt="End Call"
                  className="object-contain"
                />
              </DisconnectButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallSessionTimer;
