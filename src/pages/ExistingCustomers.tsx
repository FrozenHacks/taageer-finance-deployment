/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from "../components/Logo";

import PoweredBy from "../components/PoweredBy";
import ExistingUserForm from "../components/ExistingUserForm";
import CallSessionTimer from "../components/CallSessionTimer";
import { useTranscriptions } from "@livekit/components-react";

const ExistingCustomers = ({ transitionTo }: any) => {
  useTranscriptions();

  const handleDisconnect = () => {
    window.location.reload();
  };
  return (
    <div className="flex flex-col w-screen h-screen bg-gradient-background">
      {/* Main content container */}
      <button
        onClick={handleDisconnect}
        className="bg-[#CF0101] border border-[#D2CEFF] text-white absolute right-5 top-5 px-6 py-3 rounded-lg"
      >
        Exit
      </button>
      <div className="flex flex-col justify-between flex-1 w-full p-8 mx-auto">
        {/* Top section with logo */}
        <div className="max-w-lg pt-8 mx-auto">
          <Logo />
        </div>

        {/* Middle section with welcome text and robot */}
        <div className="flex flex-col justify-center flex-1 mx-auto text-5xl font-bold font-montserrat ">
          <ExistingUserForm transitionTo={transitionTo} />
        </div>

        {/* Bottom section with button and branding */}
        <div className="pb-8">
          <CallSessionTimer />
        </div>
      </div>
      <PoweredBy />
    </div>
  );
};

export default ExistingCustomers;
