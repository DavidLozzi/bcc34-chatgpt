require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');
 
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const openai = new OpenAIApi(configuration);
const messages = [];

const doIt = async () => {
  try {
    console.log('sending...');
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages
    });
    console.log(completion.data);
    console.log(completion.data.choices[0].message);
    messages.push(completion.data.choices[0].message);
	  prompt();

  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
    }
  }
}
 
// doIt();

const prompt = async () => { 
  const answer = await new Promise(res => rl.question('What would you like to say? ', ans => res(ans)))
  messages.push({ role: 'user', content: answer})
  doIt();
}

prompt();