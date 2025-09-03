import { useEffect, useState } from "react";
import "./App.css";

import GetStarted from "./pages/GetStarted";
import LanguagePage from "./pages/LanguagePage";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import ExistingCustomers from "./pages/ExistingCustomers";
// import SpeakingParticipant from "./components/SpeakingParticipant";
import Dashboard from "./pages/Dashboard";
import Feedback from "./pages/Feedback";
import NewCustomer from "./pages/NewCustomer";
import ThankYou from "./pages/ThankYou";

function App() {
  const [currentState, setCurrentState] = useState<string | null>("welcome"); // Default state
  const url = new URL(window.location.href);
  const id = url.pathname.split("/").pop();
  // console.log(!id ? "no id " : "id");
  const [isInCall, setIsInCall] = useState(false);
  const [token, setToken] = useState("");
  const setupToken = (t: string) => {
    setToken(t);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.location.href = "/";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  useEffect(() => {
    // if (id == "feedback") {
    //   return setCurrentState("feedback");
    // }
    if (id) {
      return setCurrentState(null);
    }
  }, [id]);
  const transitionTo = (newState: string) => {
    setCurrentState(newState);
    console.log("Transitioning to:", newState);
  };

  // const token = localStorage.getItem("token");

  const renderComponent = () => {
    switch (currentState) {
      // case "welcome":
      //   return (
      //     <Welcome
      //       transitionTo={transitionTo}
      //       setTokenn={setupToken}
      //       setIsInCall={setIsInCall}
      //       isInCall={isInCall}
      //     />
      //   );
      case "language":
        return <LanguagePage transitionTo={transitionTo} />;
      case "getstarted":
        return <GetStarted transitionTo={transitionTo} />;

      case "existingCustomer":
        return (
          <ExistingCustomers
            transitionTo={transitionTo}
            setIsInCall={setIsInCall}
          />
        );
      case "dashboard":
        return <Dashboard />;
      case "newCustomer":
        return <NewCustomer transitionTo={transitionTo} />;
      case "thankYou":
        return <ThankYou />;
      // case "enquiry":
      //   return <Enquiry />;

      // case "feedback":
      //   return <Feedback />;
      // default:
      //   return <NotFound />;
    }
  };
  console.log("currecntState", currentState);

  return (
    <div className="h-screen bg-white ">
      {currentState == null && <NotFound />}
      {/* <Dashboard /> */}
      {currentState === "welcome" && (
        <Welcome
          transitionTo={transitionTo}
          setTokenn={setupToken}
          setIsInCall={setIsInCall}
          isInCall={isInCall}
        />
      )}
      {currentState === "feedback" && <Feedback />}
      {/* <ExistingCustomers /> */}
      {token && isInCall && (
        <LiveKitRoom
          serverUrl={import.meta.env.VITE_LIVEKIT_SERVER_URL}
          token={token}
          audio={true}
          video={false}
          connect={true}
          onConnected={() => {
            console.log("Connected to LiveKit room");
            setIsInCall(true);

            setTimeout(() => {
              transitionTo("language");
            }, 200);
          }}
          onDisconnected={() => {
            console.log("Disconnected from LiveKit room");
            setIsInCall(false);
            setToken("");

            setTimeout(() => {
              transitionTo("feedback");
            }, 1000);
          }}
          onError={(error) => {
            console.error("LiveKitRoom error:", error);
          }}
        >
          {/* <SpeakingParticipant /> */}
          <RoomAudioRenderer />

          {renderComponent()}
        </LiveKitRoom>
      )}
    </div>
  );
}

export default App;
