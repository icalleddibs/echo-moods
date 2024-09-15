
import express from 'express';
import cors from 'cors'; // Import the CORS package to allow POST requests
import { CohereClient } from "cohere-ai";

var app = express();
app.use(cors());
app.use( express.json() );
app.get('/', (req, res) => {
  res.send('module online')
})

const cohere = new CohereClient({
  token: process.env.REACT_APP_COHERE_API_KEY,
});

const analyzeWithCohere = async (transcription, emotion) => {
  try {
    // Construct the prompt based on the transcription and emotion
    const prompt = `Analyze the following transcribed speech with the context of the detected emotion "${emotion}". Address the person directly and consider their emotional state:\n"${transcription}. Limit your reponse to 4 sentences."`;

    // Make the API call to Cohere
    const response = await cohere.generate({
      model: `command-xlarge-nightly`, 
      prompt: prompt,
      maxTokens: 150,
      temperature: 0.7,
    });

    // Return the analyzed feedback
    return response.generations[0].text.trim();
  } catch (error) {
    console.error('Cohere API Error:', error);
    return 'Error during Cohere analysis';
  }
};

app.post("/analyse", async function(req, res) {

  console.log(req.body)
  var transcription = req.body.transcription;
  var emotion = req.body.emotion;
  const analysis  = await analyzeWithCohere(transcription, emotion);
  res.send(analysis)
  
});


app.listen(3001, () => {
  console.log('Example app listening at http://localhost:3001')
})
