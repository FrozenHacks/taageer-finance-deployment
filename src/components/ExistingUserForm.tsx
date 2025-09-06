/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRoomContext } from "@livekit/components-react";
import { useEffect, useState } from "react";

const ExistingUserForm = ({ transitionTo }: any) => {
  const room = useRoomContext();
  const [residentlId, setResidentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");

  const handleNext = async () => {
    try {
      setTimeout(() => {
        transitionTo("dashboard");
      }, 1000);
      console.log("Form Submitted:", { residentlId, phoneNumber });
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
  const handlePhoneNumber = async (payload: any) => {
    const data = JSON.parse(payload.payload);
    setResidentId(data.resident_id);
    setPhoneNumber(data.phone_number);
    // setDateOfBirth(data.date_of_birth);
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
    if (room.localParticipant["rpcHandlers"].has("handlePhoneNumber")) {
      room.unregisterRpcMethod("handlePhoneNumber");
    }
    if (room.localParticipant["rpcHandlers"].has("handleSubmitDetails")) {
      room.unregisterRpcMethod("handleSubmitDetails");
    }

    if (room) {
      room.registerRpcMethod("handlePhoneNumber", handlePhoneNumber);
      room.registerRpcMethod("handleSubmitDetails", handleNext);
      // room.registerRpcMethod("handleBack", handleBack);
    }
  }, [room]);
  return (
    <div className="bg-white b rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-sm border-1 border-[#F1F2F9] ">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#09347A] text-center mb-8">
        May I know you ?
      </h1>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* Resident ID Field */}
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Resident ID
          </label>
          <input
            type="text"
            value={residentlId}
            placeholder="HY1450367"
            onChange={(e) => setResidentId(e.target.value)}
            className="w-full p-3 text-lg font-bold tracking-widest text-center text-gray-800 transition-colors duration-200 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Resident ID"
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
        <button
          disabled
          onClick={handleNext}
          className="flex items-center justify-center space-x-2  font-bold py-3 px-6 rounded-lg shadow-lg  transition-colors duration-200 flex-1  bg-gradient-to-b from-[#067CAC] to-[#09347A] text-[#FBFBFB] "
        >
          <span className="text-sm sm:text-base">Next</span>
          <span className="text-xl -translate-y-1 sm:text-2xl">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default ExistingUserForm;
