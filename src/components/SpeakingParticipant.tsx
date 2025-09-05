import { useParticipants } from "@livekit/components-react";
import { useEffect, useState } from "react";

const SpeakingParticipant = () => {
  const allParticipants = useParticipants();
  const [speakingRole, setSpeakingRole] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const speakingParticipants = allParticipants.filter((p) => p.isSpeaking);
    const firstSpeaker = speakingParticipants[0];

    const timer = setTimeout(() => {
      const role = firstSpeaker?.identity?.startsWith("agent")
        ? "Agent speaking"
        : //  { : firstSpeaker?.identity?.startsWith("client")
          //   ? "Client speaking"}
          "Listening";
      setSpeakingRole(role);
      setIsSpeaking(speakingParticipants.length > 0);
    }, 0);

    return () => clearTimeout(timer);
  }, [allParticipants]);

  return (
    <div>
      <p
        className={`transition duration-500 ${
          isSpeaking ? "text-green-700 animate-pulse" : "text-gray-400"
        }`}
      >
        {speakingRole} <span className="animate-pulse">...</span>
      </p>
    </div>
  );
};

export default SpeakingParticipant;
