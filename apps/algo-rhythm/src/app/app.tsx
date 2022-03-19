import React, { useEffect, useState } from "react";
import { Message } from "@algo-rhythm/api-interfaces";
import { audioRecorder } from "../util/recording";
export const App = () => {
  const [m, setMessage] = useState<Message>({ message: "" });
  const [isRecording, setIsRecording] = useState(false);

  const toggleRecording = () => {
    audioRecorder
      .start()
      .then(() => {
        //on success
        console.log("Recording Audio...");
      })
      .catch((error) => {
        //on error
        //No Browser Support Error
        if (
          error.message.includes(
            "mediaDevices API or getUserMedia method is not supported in this browser."
          )
        ) {
          console.log("To record audio, use browsers like Chrome and Firefox.");
        }
      });
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          position: "absolute",
          backgroundColor: "black",
          height: "100vh",
          width: "100%",
        }}
      >
        <h1>Record something</h1>
        <button
          onClick={() => {
            toggleRecording();
          }}
        >
          RECORD
        </button>
      </div>
      <div>{m.message}</div>
    </>
  );
};

export default App;
