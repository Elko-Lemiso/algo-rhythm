export const audioRecorder = {
  /** Start recording the audio
   * @returns {Promise} - returns a promise that resolves if audio recording successfully started
   */
  start: function () {
    console.log("here");

    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
      //Feature is not supported in browser
      //return a custom error
      return Promise.reject(
        new Error(
          "mediaDevices API or getUserMedia method is not supported in this browser."
        )
      );
    } else {
      //Feature is supported in browser

      //create an audio stream
      return (
        navigator.mediaDevices
          .getUserMedia({ audio: true } /*of type MediaStreamConstraints*/)
          //returns a promise that resolves to the audio stream
          .then((stream) /*of type MediaStream*/ => {
            console.log(stream);
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
              //Error handling structure
              switch (error.name) {
                case "AbortError": //error from navigator.mediaDevices.getUserMedia
                  console.log("An AbortError has occured.");
                  break;
                case "NotAllowedError": //error from navigator.mediaDevices.getUserMedia
                  console.log(
                    "A NotAllowedError has occured. User might have denied permission."
                  );
                  break;
                case "NotFoundError": //error from navigator.mediaDevices.getUserMedia
                  console.log("A NotFoundError has occured.");
                  break;
                case "NotReadableError": //error from navigator.mediaDevices.getUserMedia
                  console.log("A NotReadableError has occured.");
                  break;
                case "SecurityError": //error from navigator.mediaDevices.getUserMedia or from the MediaRecorder.start
                  console.log("A SecurityError has occured.");
                  break;
                case "TypeError": //error from navigator.mediaDevices.getUserMedia
                  console.log("A TypeError has occured.");
                  break;
                case "InvalidStateError": //error from the MediaRecorder.start
                  console.log("An InvalidStateError has occured.");
                  break;
                case "UnknownError": //error from the MediaRecorder.start
                  console.log("An UnknownError has occured.");
                  break;
                default:
                  console.log(
                    "An error occured with the error name " + error.name
                  );
              }
            }
          })
      );

      /* errors are not handled in the API because if its handled and the promise is chained, the .then after the catch will be executed*/
    }
  },
  /** Stop the started audio recording
   * @returns {Promise} - returns a promise that resolves to the audio as a blob file
   */
  stop: function () {
    //...
  },
  /** Cancel audio recording*/
  cancel: function () {
    //...
  },
};
