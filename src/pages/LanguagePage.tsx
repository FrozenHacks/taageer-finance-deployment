/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
// import { Button } from "@/components/ui/button";
// import Logo from "@/components/Logo";
// import WelcomeText from "@/components/WelcomeText";
// import RobotAssistant from "@/components/RobotAssistant";
// import { Mic } from "lucide-react";

import Logo from "../components/Logo";

import CentralImage from "../components/CentralImage";
import { useEffect, useState } from "react";
import PoweredBy from "../components/PoweredBy";
import { useRoomContext, useTranscriptions } from "@livekit/components-react";

interface LanguagePageProps {
  transitionTo: (newState: string) => void;
}

const LanguagePage: React.FC<LanguagePageProps> = ({ transitionTo }) => {
  const room = useRoomContext();
  useTranscriptions();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const handleLanguageChange = async (payload: any) => {
    try {
      if (payload) {
        const data = JSON.parse(payload?.payload);
        setSelectedLanguage(data.language);
        //* store call id in session
        sessionStorage.setItem("call_id", data.call_id);
        console.log(data);
      }
      setTimeout(() => {
        transitionTo("getstarted");
      }, 1000);
      return `success`;
    } catch (error) {
      console.error("Error handling language change:", error);
      return "error";
    }
  };
  // console.log("Room in LanguagePage:", room.activeSpeakers);
  useEffect(() => {
    if (room) {
      if (room.localParticipant["rpcHandlers"].has("handleLanguageChange")) {
        room.unregisterRpcMethod("handleLanguageChange");
      }
      room.registerRpcMethod("handleLanguageChange", handleLanguageChange);
    }
  }, [room]);
  // console.log("Selected Language:", selectedLanguage);
  return (
    <div className="flex flex-col w-screen h-screen bg-gradient-background">
      {/* Main content container */}
      <div className="flex flex-col justify-between flex-1 w-full max-w-lg p-8 mx-auto">
        {/* Top section with logo */}
        <div className="pt-8">
          <Logo />
        </div>

        {/* Middle section with welcome text and robot */}
        <div className="flex flex-col justify-center flex-1 text-5xl font-bold font-montserrat ">
          {/* <WelcomeText /> */}
          <div className="mb-10 text-center">
            <h1 className=" text-[#8294B1]  capitalize ">
              Choose your language
            </h1>
          </div>
          <CentralImage image={"/lang.png"} />
        </div>

        {/* Bottom section with button and branding */}
        <div className="pb-8">
          <div className="flex space-x-4">
            <button
              className={`${
                selectedLanguage === "ar"
                  ? "bg-gradient-to-b from-[#067CAC] to-[#09347A] text-[#FBFBFB]"
                  : "bg-[#FFFFFF] text-[#067CAC] border-[#067CAC]"
              } w-full font-montserrat font-bold text-4xl p-4 rounded-lg border  shadow-language-button`}
              onClick={() => {
                setSelectedLanguage("ar");
                handleLanguageChange({
                  payload: JSON.stringify({ language: "ar" }),
                });
              }}
            >
              <p className="text-2xl font-bold">عربي</p>
              <p className="text-lg">Arabic</p>
            </button>
            <button
              className={`${
                selectedLanguage === "en"
                  ? "bg-gradient-to-b from-[#067CAC] to-[#09347A] text-[#FBFBFB] "
                  : "bg-[#FFFFFF] text-[#067CAC] border-[#067CAC]"
              } w-full font-montserrat font-bold text-4xl p-4 rounded-lg border  shadow-language-button`}
              onClick={() => {
                setSelectedLanguage("en");
                handleLanguageChange({
                  payload: JSON.stringify({ language: "en" }),
                });
              }}
            >
              <p className="text-2xl font-bold">E</p>
              <p className="text-lg">English</p>
            </button>
          </div>
        </div>
      </div>
      <PoweredBy />
    </div>
  );
};

export default LanguagePage;
