import { DisconnectButton, useTranscriptions } from "@livekit/components-react";
import Logo from "../components/Logo";
import PoweredBy from "../components/PoweredBy";
import { calculateCallTime, transformTranscriptionData } from "../utils/utils";

const ThankYou = () => {
  const transcriptions = useTranscriptions();

  const handleDisconnect = () => {
    if (transcriptions) {
      const transcription = transformTranscriptionData(transcriptions);
      calculateCallTime(transcriptions); // calculate call time and store in session
      sessionStorage.setItem("transcription", JSON.stringify(transcription));
      console.log(transcriptions);
    }
  };
  const loanTypes = [
    "Auto Loan",
    "Consumer Durable Loan",
    "Business Loan",
    "Corporate Deposit",
  ];

  return (
    <div className="flex flex-col w-screen h-screen bg-gradient-background">
      {/* Main content container */}
      <DisconnectButton
        onClick={handleDisconnect}
        className="bg-[#CF0101] border border-[#D2CEFF] text-white absolute right-5 top-5 px-6 py-3 rounded-lg"
      >
        Exit
      </DisconnectButton>
      <div className="flex flex-col justify-between flex-1 w-full p-8 mx-auto">
        {/* Top section with logo */}
        <div className="max-w-lg pt-8 mx-auto">
          <Logo />
        </div>

        {/* Middle section with welcome text and robot */}
        <div className="flex flex-col justify-center flex-1 max-w-lg mx-auto text-5xl font-bold font-montserrat ">
          <div className="w-full max-w-md p-4 mx-auto transition-transform transform bg-white shadow-2xl sm:p-6 md:p-8 rounded-2xl hover:scale-105">
            {/* Animated checkmark icon */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-[#09347A] sm:w-12 sm:h-12 md:w-16 md:h-16 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Main heading and message */}
            <h1 className="mb-2 text-xl font-bold text-center sm:text-2xl md:text-3xl sm:font-extrabold text-slate-800">
              Thank you for connecting!
            </h1>
            <p className="mb-4 text-sm leading-snug text-center sm:text-base md:text-lg sm:mb-8 text-slate-600">
              We're here to assist with any general inquiries.
            </p>

            <div className="flex flex-wrap items-center justify-center text-center">
              {loanTypes.map((loan, index) => (
                <div
                  key={index}
                  className="w-40 flex items-center justify-center h-20 m-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white transition duration-300 transform bg-gradient-to-t from-[#067CAC] to-[#09347A] shadow-md rounded-xl hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {loan}
                </div>
              ))}
            </div>
            {/* Call-to-action button */}
            {/* <button
              disabled
              className="w-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base font-semibold text-white transition duration-300 transform bg-gradient-to-t from-[#067CAC] to-[#09347A] shadow-md rounded-xl hover:bg-indigo-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() =>
                alert(
                  "Button clicked! You can link this to your chat or contact page."
                )
              }
            >
              Ask a Question
            </button> */}
          </div>
        </div>

        {/* Bottom section with button and branding */}
        <div className="pb-8">{/* <CallSessionTimer /> */}</div>
      </div>
      <PoweredBy />
    </div>
  );
};
export default ThankYou;
