import React, { useEffect, useState } from "react";

import avatarIcon from "/robo.svg";
import micIcon from "/greenMic.svg";
import micOffIcon from "/redMic.svg";
import speakerIcon from "/pause.svg";
import endCallIcon from "/endCall.svg";
import SpeakingParticipant from "./SpeakingParticipant";
import {
  DisconnectButton,
  useLocalParticipant,
  useTranscriptions,
} from "@livekit/components-react";
import { calculateCallTime, transformTranscriptionData } from "../utils/utils";

const CallSessionTimer: React.FC = () => {
  const transcriptions = useTranscriptions();
  const { localParticipant } = useLocalParticipant();
  const [isMuted, setIsMuted] = useState(!localParticipant.isMicrophoneEnabled);

  const handleDisconnect = () => {
    if (transcriptions) {
      const transcription = transformTranscriptionData(transcriptions);
      calculateCallTime(transcriptions);
      sessionStorage.setItem("transcription", JSON.stringify(transcription));
      console.log(transcriptions);
    }
  };

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
              />{" "}
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
