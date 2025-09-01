/* eslint-disable react-hooks/exhaustive-deps */
import Logo from "../components/Logo";

import CentralImage from "../components/CentralImage";
import React, { useEffect, useState } from "react";
import PoweredBy from "../components/PoweredBy";
import { useRoomContext, useTranscriptions } from "@livekit/components-react";

interface GetStartedProps {
  transitionTo: (newState: string) => void;
}
const GetStarted: React.FC<GetStartedProps> = ({ transitionTo }) => {
  const room = useRoomContext();
  useTranscriptions();
  const [customerType, setCustomerType] = useState<string | null>(null);
  const handleExistingUser = async () => {
    console.log("Existing customer clicked ");
    setCustomerType("existingCustomer");
    // console.log(payload);

    try {
      console.log("Existing customer clicked ");
      setTimeout(() => {
        transitionTo("existingCustomer");
      }, 1000);
      return "success";
    } catch (error) {
      console.error(error);
      return "error";
    }
  };

  const handleNewUser = async () => {
    setCustomerType("newCustomer");
    console.log("New customer clicked ");

    try {
      setTimeout(() => {
        transitionTo("newCustomer");
      }, 1000);
      return "success";
    } catch (error) {
      console.error(error);
      return "error";
    }
  };
  useEffect(() => {
    if (room) {
      if (room.localParticipant["rpcHandlers"].has("handleExistingUser")) {
        room.unregisterRpcMethod("handleExistingUser");
      }
      if (room.localParticipant["rpcHandlers"].has("handleNewUser")) {
        room.unregisterRpcMethod("handleNewUser");
      }
      room.registerRpcMethod("handleExistingUser", handleExistingUser);
      room.registerRpcMethod("handleNewUser", handleNewUser);
    }
  }, [room]);

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
          <div className="mb-20 text-center">
            <h1 className=" text-[#8294B1]  capitalize ">Let's get started</h1>
          </div>
          <CentralImage image={"/customer.png"} />
        </div>

        {/* Bottom section with button and branding */}
        <div className="pb-8">
          <div className="flex space-x-4">
            <button
              className={`flex flex-col justify-center items-center ${
                customerType === "existingCustomer"
                  ? "bg-gradient-to-b from-[#067CAC] to-[#09347A] text-[#FBFBFB]"
                  : "bg-[#FFFFFF] text-[#067CAC] border-[#067CAC]"
              } w-full font-montserrat font-bold text-4xl p-4 rounded-lg border  shadow-language-button`}
              onClick={handleExistingUser}
            >
              <img
                src="/existing-user-logo.svg"
                className="w-14 h-14 "
                alt="existing-user-logo"
              />
              <p className="text-lg leading-none">
                Existing <br /> Customer
              </p>
            </button>
            <button
              className={`flex flex-col justify-center items-center ${
                customerType === "newCustomer"
                  ? "bg-gradient-to-b from-[#067CAC] to-[#09347A] text-[#FBFBFB] "
                  : "bg-[#FFFFFF] text-[#067CAC] border-[#067CAC]"
              } w-full font-montserrat font-bold text-4xl p-4 rounded-lg border  shadow-language-button`}
              onClick={handleNewUser}
            >
              <img
                src="/new-user-logo.svg"
                className="w-14 h-14 "
                alt="new-user-logo"
              />
              <p className="text-lg leading-none ">
                New <br /> Customer
              </p>
            </button>
          </div>
        </div>
      </div>
      <PoweredBy />
    </div>
  );
};

export default GetStarted;
