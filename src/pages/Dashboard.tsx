/* eslint-disable @typescript-eslint/no-explicit-any */
import PoweredBy from "../components/PoweredBy";
import Logo from "../components/Logo";
import FinancialDashboard from "../components/FinnancialDashboard";
import { useEffect, useState } from "react";
import {
  DisconnectButton,
  useRoomContext,
  useTranscriptions,
} from "@livekit/components-react";
import { reformatData, transformTranscriptionData } from "../utils/utils";
import type { DashboardData } from "../types/types";
import { Loader } from "lucide-react";
// import { DisconnectButton } from "@livekit/components-react";

const Dashboard = () => {
  const room = useRoomContext();
  const transcriptions = useTranscriptions();

  const [show, setShow] = useState(false);
  const [data, setData] = useState<DashboardData>();
  // const handleLogout = async () => {
  //   try {
  //     return "success";
  //   } catch (error) {
  //     console.log("Logout error", error);
  //     return "error";
  //   }
  // };

  const handleDetails = async (payload: any) => {
    try {
      const p = JSON.parse(payload.payload);
      console.log(payload);
      console.log("payload", p);
      const reformattedData = reformatData(p);
      console.log(reformattedData);
      setData(reformattedData);
      // setLoanData(reformattedData.loanData);
      // setUserData(reformattedData.userData);
      setShow(true);

      return "success";
    } catch (error) {
      console.log(error);
      return "error";
    }
  };
  useEffect(() => {
    if (room) {
      if (room.localParticipant["rpcHandlers"].has("getDetails")) {
        room.unregisterRpcMethod("getDetails");
      }
      room.registerRpcMethod("getDetails", handleDetails);
    }
  }, [room]);
  console.log(data);

  const handleDisconnect = () => {
    if (transcriptions) {
      const transcription = transformTranscriptionData(transcriptions);

      sessionStorage.setItem("transcription", JSON.stringify(transcription));
      console.log(transcriptions);
    }
  };
  return (
    <>
      {show ? (
        <div className="flex flex-col w-screen h-screen bg-gradient-background">
          {/* Main content container */}
          <div>
            <DisconnectButton
              onClick={handleDisconnect}
              className="bg-[#CF0101] border border-[#D2CEFF] text-white absolute right-5 top-5 px-6 py-3 rounded-lg"
            >
              Exit
            </DisconnectButton>
            {/* <button
            onClick={handleLogout}
            className="bg-[#CF0101] border border-[#D2CEFF] absolute right-5 top-5 px-4 py-2 rounded-lg"
          >
            Exit
          </button> */}
          </div>
          <div className="flex flex-col justify-between flex-1 w-full p-8 mx-auto">
            {/* Top section with logo */}
            <div className="max-w-lg pt-2 mx-auto">
              <Logo />
            </div>
            {/* Middle section with welcome text and robot */}
            {data && <FinancialDashboard data={data} />}
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
            </div>
          </div>
          <PoweredBy />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Loader className="animate-spin" size={48} />
        </div>
      )}
    </>
  );
};

export default Dashboard;
