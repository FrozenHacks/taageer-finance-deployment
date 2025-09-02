// import { Button } from "@/components/ui/button";
// import Logo from "@/components/Logo";
// import WelcomeText from "@/components/WelcomeText";
// import RobotAssistant from "@/components/RobotAssistant";
// import { Mic } from "lucide-react";
import Logo from "../components/Logo";

import CentralImage from "../components/CentralImage";
import PoweredBy from "../components/PoweredBy";
import { useState } from "react";
import axios from "axios";
import { MicDisabledIcon } from "@livekit/components-react";
import { MicIcon } from "lucide-react";

interface WelcomeProps {
  transitionTo: (newState: string) => void;
  setTokenn: (token: string) => void;
  setIsInCall: (inCall: boolean) => void;
  isInCall: boolean;
}
const Welcome: React.FC<WelcomeProps> = ({
  // transitionTo,
  setTokenn,
  setIsInCall,
  isInCall,
}) => {
  const [token, setToken] = useState<string | null>(null);

  const startVoiceCall = async () => {
    if (isInCall || token) return;
    // transitionTo("userCheck");
    try {
      setIsInCall(true);
      const response = await axios.post(
        `${import.meta.env.VITE_FASTAPI_URL}/create_room_and_start_agent`
      );
      const data = response.data;
      console.log(data);
      console.log("Token received:", data.client.token);

      setToken(data.client.token);
      setTokenn(data.client.token);
    } catch (error) {
      setIsInCall(false);
      console.error("Error starting voice call:", error);
    }
  };
  const endVoiceCall = () => {
    console.log("Disconnecting from LiveKit room");
    setToken(null);
    setIsInCall(false);
  };
  return (
    <div className="flex flex-col w-screen h-screen ">
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
            <h1 className=" text-[#8294B1]  ">Welcome to</h1>
            <h2 className="text-[#067CAC] mb-4">AI ASSISTANT</h2>
            {/* <div className="flex justify-center">
              <div className="w-16 h-1 rounded-full bg-gradient-primary"></div>
            </div> */}
          </div>
          <CentralImage image={"/robot-assistant.png"} />
        </div>

        {/* Bottom section with button and branding */}
        <div className="pb-8">
          {/* <Button
            variant="voice"
            size="lg"
            onClick={handleVoiceCall}
            className="w-full mb-6 h-14"
          >
            <Mic className="w-6 h-6 mr-2" />
            Start Voice Call
          </Button> */}
          <button
            className={`bg-gradient-to-b w-full font-montserrat from-[#067CAC] to-[#09347A] font-bold text-[#FBFBFB] text-4xl p-4 rounded-lg ${
              isInCall ? "from-[#FF3737] to-[#8B0000]" : ""
            }`}
            onClick={isInCall ? endVoiceCall : startVoiceCall}
          >
            {isInCall ? (
              <div className="flex items-center justify-center">
                <MicDisabledIcon className="w-6 h-6 mr-3" />
                End Voice Call
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <MicIcon className="w-6 h-6 mr-3" />
                Start Voice Call
              </div>
            )}
          </button>
        </div>
      </div>
      <PoweredBy />
    </div>
  );
};

export default Welcome;
