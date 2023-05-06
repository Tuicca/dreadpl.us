import React, { useState, useEffect } from 'react';
import './NextPage.css';

const NextPage = () => {
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiResponse = await fetch("http://localhost:5000/api/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });
  
      if (apiResponse.ok) {
        const data = await apiResponse.json();
        console.log("Data:", data.message);
        setResponse(data.message);
      } else {
        console.error("Error fetching completion:", apiResponse.status, apiResponse.statusText);
      }
    } catch (err) {
      console.error("Error making request:", err);
      console.log("Error details:", JSON.stringify(err, null, 2));
    }
  };
  
    return (
      <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
      
        <div className="response-message">
          {response}
        </div>
      </div>
    );
  };
  export default NextPage