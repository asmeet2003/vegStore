import React, { useState } from 'react';
import axios from 'axios';

const ChatWithAi = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [copied, setCopied] = useState(false);

  const generateAnswer = async () => {
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_GEMINAI_SK}`,
        {
          contents: [{ parts: [{ text: question }] }]
        }
      );
      setQuestion("");
      const generatedAnswer = response.data.candidates[0].content.parts[0].text;
      setAnswer(generatedAnswer);
      setCopied(false);
    } catch (error) {
      console.error('Error generating answer:', error);
    }
  };

  const copyGeneratedAnswer = () => {
    navigator.clipboard.writeText(answer)
      .then(() => setCopied(true))
      .catch((error) => console.error('Error copying text:', error));
  };

  return (
    <div className="min-h-96 bg-teal-100 py-4 px-4 lg:px-0">
      <div className="max-w-lg mx-auto">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-4 w-full min-h-20 p-2 border border-gray-300 rounded-md"
          placeholder="Enter your question here..."
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={generateAnswer}
        >
          Generate Answer
        </button>
        <div className="mt-4 w-full border border-gray-300 rounded-md overflow-x-auto max-h-40">
          <p className="p-2">{answer}</p>
        </div>
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={copyGeneratedAnswer}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

export default ChatWithAi;
