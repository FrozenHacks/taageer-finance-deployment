/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useRoomContext,
  // useTranscriptions,
} from "@livekit/components-react";
import { useEffect, useState } from "react";
// import { calculateCallTime, transformTranscriptionData } from "../utils/utils";

const NewUserForm = ({ transitionTo }: any) => {
  const room = useRoomContext();
  // const transcriptions = useTranscriptions();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  // const [loanType, setLoanType] = useState("");

  // useEffect(() => {
  //   console.log(transcriptions);
  //   if (transcriptions && transcriptions.length > 0) {
  //     const transcription = transformTranscriptionData(transcriptions);
  //     calculateCallTime(transcriptions); // calculate call time and store in session
  //     sessionStorage.setItem("transcription", JSON.stringify(transcription));
  //     console.log(transcriptions);
  //   }
  // }, [transcriptions]);
  const handleNext = async () => {
    try {
      // room.disconnect();
      setTimeout(() => {
        transitionTo("thankYou");
      }, 200);
      console.log("Form Submitted:", { name, phoneNumber });
      return "success";
    } catch (error) {
      console.error("Error submitting form:", error);
      return "error";
    }
  };

  const handleBack = async () => {
    try {
      setTimeout(() => {
        transitionTo("getstarted");
      }, 1000);
      console.log("Navigating back to the previous step");

      return "success";
    } catch (error) {
      console.error("Error submitting form:", error);
      return "error";
    }
  };
  const handleUpdateDetails = async (payload: any) => {
    const data = JSON.parse(payload.payload);
    setName(data.name);
    setPhoneNumber(data.phone_number);
    // setDateOfBirth(data.date_of_birth);
    // setLoanType(data.loan_type);
    console.log(data);
    try {
      // setPhoneNumber(payload.data);
      return "success";
    } catch (error) {
      console.error(error);
      return "error";
    }
  };

  useEffect(() => {
    // const unregisterRpcMethods = () => {
    //   if (
    //     room.localParticipant["rpcHandlers"].has("handleCustomerDataReceived")
    //   ) {
    //     room.unregisterRpcMethod("handleCustomerDataReceived");
    //   }
    //   if (room.localParticipant["rpcHandlers"].has("handleFormSubmission")) {
    //     room.unregisterRpcMethod("handleFormSubmission");
    //   }
    // };

    if (room) {
      room.registerRpcMethod("handleCustomerDataReceived", handleUpdateDetails);
      room.registerRpcMethod("handleFormSubmission", handleNext);
      // room.registerRpcMethod("handleBack", handleBack);
    }
    return () => {
      if (room) {
        room.unregisterRpcMethod("handleCustomerDataReceived");
        room.unregisterRpcMethod("handleFormSubmission");
      }
      // unregisterRpcMethods();
    };
  }, [room]);
  return (
    <div className="bg-white b rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-sm border-1 border-[#F1F2F9] ">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09347A] text-center mb-8">
        Tell Me Your Details
      </h1>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Resident ID Field */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={name}
            placeholder="John"
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 text-lg font-bold tracking-widest text-center text-gray-800 transition-colors duration-200 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Name"
          />
        </div>

        {/* Phone Number Field */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Phone Number
          </label>
          <input
            type="text"
            value={phoneNumber}
            placeholder="7985206205"
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-3 text-lg font-bold tracking-widest text-center text-gray-800 transition-colors duration-200 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Phone Number"
          />
        </div>

        {/* Date of Birth Field */}
        {/* <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Date Of Birth
          </label>
          <input
            type="text"
            value={dateOfBirth}
            placeholder="08-Sep-2000"
            onChange={(e) => setDateOfBirth(e.target.value)}
            className="w-full p-3 text-lg font-bold tracking-widest text-center text-gray-800 transition-colors duration-200 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Date of Birth"
          />
        </div> */}

        {/* Loan type Field */}
        {/* <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Loan Type
          </label>
          <input
            type="text"
            value={loanType}
            placeholder="Car loan"
            onChange={(e) => setLoanType(e.target.value)}
            className="w-full p-3 text-lg font-bold tracking-widest text-center text-gray-800 transition-colors duration-200 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Loan Type"
          />
        </div> */}
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between mt-8 space-x-4">
        <button
          disabled
          onClick={handleBack}
          className="flex items-center shadow-inner justify-center space-x-2 text-[#09347A] font-bold py-3 px-6 rounded-lg border-2 border-[#D9DBE9] hover:bg-blue-100 transition-colors duration-200 flex-1"
        >
          <span className="text-xl -translate-y-1 sm:text-2xl">&larr;</span>
          <span className="text-sm sm:text-base ">Back</span>
        </button>
        {/* <DisconnectButton> */}
        <button
          disabled
          onClick={handleNext}
          className="flex items-center justify-center space-x-2  font-bold py-3 px-6 rounded-lg shadow-lg  transition-colors duration-200 flex-1  bg-gradient-to-b from-[#067CAC] to-[#09347A] text-[#FBFBFB] "
        >
          <span className="text-sm sm:text-base">Next</span>
          <span className="text-xl -translate-y-1 sm:text-2xl">&rarr;</span>
        </button>
        {/* </DisconnectButton> */}
      </div>
    </div>
  );
};

export default NewUserForm;
