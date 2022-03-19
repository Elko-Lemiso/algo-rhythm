import React, { useEffect, useRef, useState } from "react";
import { Message } from "@algo-rhythm/api-interfaces";
import { audioRecorder, playAudio } from "../util/recording";

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: "" });
  const [isRecording, setIsRecording] = useState(false);
  const audio = useRef(null);

  const toggleRecording = () => {
    if (!isRecording) {
      audioRecorder
        .start()
        .then(() => {
          console.log("started");
          setIsRecording(true);
        })
        .catch((error) => {
          if (
            error.message.includes(
              "mediaDevices API or getUserMedia method is not supported in this browser."
            )
          ) {
            console.log(
              "To record audio, use browsers like Chrome and Firefox."
            );
          }
        });
    } else {
      audioRecorder
        .stop()
        .then((audioAsblob) => {
          console.log("stoppped");
          playAudio(audioAsblob, audio.current);
          setIsRecording(false);
        })
        .catch((error) => {
          if (
            error.message.includes(
              "mediaDevices API or getUserMedia method is not supported in this browser."
            )
          ) {
            console.log(
              "To record audio, use browsers like Chrome and Firefox."
            );
          }
        });
    }
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
          position: "absolute",
          backgroundColor: "#444444",
          height: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <button
          style={{
            backgroundColor: isRecording ? "red" : "white",
            border: "none",
            borderRadius: "100px",
            width: "100px",
            height: "100px",
            padding: "10px"
          }}
          onClick={() => {
            toggleRecording();
          }}
        >
          CLICK ME
        </button>
        <audio ref={audio} hidden controls></audio>
      </div>
      <div>{m.message}</div>
    </>
  );
};

export default App;
