/* eslint-disable @typescript-eslint/no-explicit-any */
import PoweredBy from "../components/PoweredBy";
import Logo from "../components/Logo";
import SessionFeedbackCard from "../components/SessionFeedbackCard";
import CallSummary from "../components/CallSummary";
import axios from "axios";
import { alternateSpeakerLabels } from "../utils/utils";

const Feedback = () => {
  // const transcription = useTranscriptions();
  // console.log(transcription);
  let transcription = sessionStorage.getItem("transcription")
    ? JSON.parse(sessionStorage.getItem("transcription") as string)
    : null;
  // // sessionStorage.removeItem("data");
  console.log(transcription);
  transcription = alternateSpeakerLabels(transcription);
  const callTime = sessionStorage.getItem("callTime");
  console.log(callTime);
  const handleSubmitFeedback = async (data: any) => {
    const call_id = sessionStorage.getItem("call_id");
    try {
      console.log(data);
      axios.post(`${import.meta.env.VITE_FASTAPI_URL}/submit_feedback`, {
        call_id: call_id,
        star_rating: data.rating,
        feedback: data.feedback,
      });
    } catch (error) {
      console.error(`Form Submit Error: ${error}`);
    }
  };
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
        <div className="max-w-lg pt-2 mx-auto">
          <Logo />
        </div>

        {/* Middle section with welcome text and robot */}

        <SessionFeedbackCard onSubmit={handleSubmitFeedback} />
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
          <CallSummary
            callDurationSeconds={Number(callTime)}
            transcriptionData={transcription}
          />
        </div>
      </div>
      <PoweredBy />
    </div>
  );
};

export default Feedback;
