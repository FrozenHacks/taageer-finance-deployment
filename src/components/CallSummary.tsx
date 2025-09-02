import React, { useState } from "react";
import { Clock, FileText, X } from "lucide-react";

// Sample transcription data
// export const sampleTranscription: TranscriptionEntry[] = [
//   {
//     speaker: "agent",
//     message:
//       "Hello! Thank you for calling our support line. My name is Sarah, and I'll be assisting you today. How can I help you?",
//     timestamp: "00:05",
//   },
//   {
//     speaker: "customer",
//     message:
//       "Hi Sarah, I'm having trouble with my recent order. I placed it three days ago but haven't received any shipping confirmation yet.",
//     timestamp: "00:15",
//   },
//   {
//     speaker: "agent",
//     message:
//       "I understand your concern about the shipping confirmation. Let me look up your order details right away. Could you please provide me with your order number or the email address you used for the purchase?",
//     timestamp: "00:28",
//   },
//   {
//     speaker: "customer",
//     message:
//       "Sure, my email is john.doe@email.com and I believe the order number was ORD-12345.",
//     timestamp: "00:45",
//   },
//   {
//     speaker: "agent",
//     message:
//       "Perfect, thank you for that information. I can see your order here in our system. It looks like your order is currently being processed in our fulfillment center and should ship out within the next 24 hours. You'll receive a tracking number via email once it's dispatched.",
//     timestamp: "01:02",
//   },
//   {
//     speaker: "customer",
//     message:
//       "That's great to hear! Is there anything else I need to do on my end?",
//     timestamp: "01:25",
//   },
//   {
//     speaker: "agent",
//     message:
//       "No action needed from your side. Everything is set up correctly. Is there anything else I can help you with today?",
//     timestamp: "01:35",
//   },
//   {
//     speaker: "customer",
//     message:
//       "No, that covers everything. Thank you so much for your help, Sarah!",
//     timestamp: "01:45",
//   },
//   {
//     speaker: "agent",
//     message:
//       "You're very welcome! Have a wonderful day and thank you for choosing our service.",
//     timestamp: "01:52",
//   },
// ];

interface TranscriptionEntry {
  speaker: "agent" | "customer";
  message: string;
  timestamp?: string;
}

interface CallSummaryProps {
  callDurationSeconds: number;
  transcriptionData: TranscriptionEntry[];
}

const CallSummary: React.FC<CallSummaryProps> = ({
  callDurationSeconds,
  transcriptionData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")} mins`;
  };

  // const getSpeakerName = (speaker: "agent" | "customer"): string => {
  //   return speaker === "agent" ? "AI Assistant" : "Customer";
  // };

  // const getSpeakerColor = (speaker: "agent" | "customer"): string => {
  //   return speaker === "agent" ? "text-blue-700" : "text-green-700";
  // };

  const getSpeakerBg = (speaker: "agent" | "customer"): string => {
    return speaker === "agent" ? "bg-blue-50" : "bg-green-50";
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* Call Summary Card */}
      <div className="w-full max-w-md mx-auto overflow-hidden bg-white border border-gray-100 shadow-lg rounded-2xl">
        <div className="px-6 py-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">
              Call duration:
            </span>
            <span className="text-lg font-semibold text-green-600">
              {formatDuration(callDurationSeconds)}
            </span>
          </div>

          <button
            onClick={handleOpenModal}
            className="w-full text-white font-medium py-3 px-6 rounded-lg transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-[#067CAC] focus:ring-offset-2 text-sm sm:text-base
                        bg-[linear-gradient(160.41deg,#067CAC_-5.15%,#09347A_87.35%)] hover:opacity-90 disabled:opacity-60
                        shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
          >
            <FileText className="w-5 h-5" />
            See Call Summary
          </button>
        </div>
      </div>

      {/* Transcription Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="w-[60%] h-[80%] bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden max-w-4xl min-w-[320px]">
            {/* Fixed Header */}
            <div
              className="flex items-center justify-between px-6 py-4 text-white
     bg-[linear-gradient(160.41deg,#067CAC_-5.15%,#09347A_87.35%)]"
            >
              <h2 className="text-xl font-semibold">Meeting transcription</h2>
              <button
                onClick={handleCloseModal}
                className="p-2 transition-colors duration-200 rounded-lg focus:outline-none hover:bg-white/10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 p-6 space-y-4 overflow-y-auto">
              {transcriptionData.map((entry, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${getSpeakerBg(
                    entry.speaker
                  )} border-l-4 ${
                    entry.speaker === "agent"
                      ? "border-blue-500"
                      : "border-green-500"
                  }`}
                >
                  {/* <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`font-semibold ${getSpeakerColor(
                        entry.speaker
                      )}`}
                    >
                      {getSpeakerName(entry.speaker)}:
                    </span>
                    {entry.timestamp && (
                      <span className="text-xs text-gray-500">
                        {entry.timestamp}
                      </span>
                    )}
                  </div> */}
                  <p className="leading-relaxed text-gray-800">
                    {entry.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CallSummary;
export type { TranscriptionEntry, CallSummaryProps };
