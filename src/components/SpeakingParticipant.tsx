import { useParticipants } from "@livekit/components-react";
import { useEffect, useState } from "react";

const SpeakingParticipant = () => {
  const allParticipants = useParticipants();
  const [speakingRole, setSpeakingRole] = useState("");

  useEffect(() => {
    const speakingParticipants = allParticipants.filter((p) => p.isSpeaking);
    const firstSpeaker = speakingParticipants[0];

    console.log(firstSpeaker);
    const timer = setTimeout(() => {
      const role = firstSpeaker?.identity?.startsWith("agent")
        ? "Agent speaking ..."
        : firstSpeaker?.identity?.startsWith("client")
        ? "You speaking ..."
        : "...";
      setSpeakingRole(role);
    }, 0);

    return () => clearTimeout(timer);
  }, [allParticipants]);

  // console.log("speaker", speakingRole);
  return (
    <div>
      <p>{speakingRole}</p>
    </div>
  );
};

export default SpeakingParticipant;
