# EchoMoods

EchoMoods is a webapp developed for Hack the North 2024 that focuses providing tailored support for individuals with communication deficits.
EchoMoods enables users to record a video of themselves mouthing a sentence along with a facial expression. The app then analyzes the video to provide feedback on three core aspects:

1. **Speech Recognition:** What words it interprets from input lip movements.
2. **Emotion Detection:** The emotion input facial expressions convey.
3. **Overall Sentiment:** A general impression of how input communication is perceived.

EchoMoods was developed using a combination of cutting-edge technologies:

- **Frontend:** Built with React.js for a smooth, user-friendly interface, integrating the basis of this [React Webcam Demo](https://codesandbox.io/p/sandbox/react-webcam-demo-wrecn?) to access the user's device camera for live in-app recording.
- **Lip Reading:** Integrated through the [Symphonic Labs](https://symphoniclabs.com/) API for accurate speech detection based on lip movements.
- **Facial Emotion Recognition:** Utilized [Face-API](https://justadudewhohacks.github.io/face-api.js/docs/index.html) to interpret the emotional content of facial expressions.
- **Sentiment Analysis:** [Cohere AI](https://github.com/cohere-ai/cohere-typescript) provided the sentiment interpretation functionality, running on an [Express.js](https://expressjs.com/) backend server.

## Usage

Open the terminal and navigate to `echo-moods-backend`. Ensure installations are added, start the script using 
```
npm start
```
and wait until it responds with "Example app listening at [http://localhost:3001](http://localhost:3001)". In another terminal, navigate to `echo-moods`, repeat the script start, and wait for the local host webapp to open. The homepage should be visible at local host 3000.

To ensure that the backend functionality is working as expected, utilize the Thunder Client API Client Extension and verify that a JSON POST request on `localhost:3001/analyse` with the following sample inputs is sufficiently providing a feedback response from Cohere.
```
{
  "transcription": "im so happy for you",
  "emotion": "happy"
}
```


## Demonstrations
This project was developed over 32 hours by a group of students for Hack the North 2024 in Waterloo, Canada.

- [Devpost Project](https://devpost.com/software/echomoods)
- [EchoMoods Demonstration Video](https://youtu.be/sc8HkAJrYH0)

The code developed in this project is preliminary and has potential for improvement post-hackathon. The developers aimed to create a project that had significant community impact and focused on a creative use of Symphonic Labs' API to transcribe silent videos of people speaking (example [here](http://readtheirlips.com/)).
