/* eslint-disable @typescript-eslint/no-explicit-any */
import PoweredBy from "../components/PoweredBy";
import Logo from "../components/Logo";
import SessionFeedbackCard from "../components/SessionFeedbackCard";
import CallSummary from "../components/CallSummary";

const Feedback = () => {
  // const transcription = useTranscriptions();
  // console.log(transcription);
  const transcription = sessionStorage.getItem("transcription")
    ? JSON.parse(sessionStorage.getItem("transcription") as string)
    : null;
  // // sessionStorage.removeItem("data");
  console.log(transcription);
  const handleSubmitFeedback = (data: any) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col w-screen h-screen bg-gradient-background">
      {/* Main content container */}
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
            callDurationSeconds={176}
            transcriptionData={transcription}
          />
        </div>
      </div>
      <PoweredBy />
    </div>
  );
};

export default Feedback;
