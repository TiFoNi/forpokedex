import axios from "axios";
import React, { useState } from "react";

export const Test = () => {
  const [message, setMessage] = useState<string>("");

  const SendMessage = () => {
    axios
      .post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
          temperature: 1.0,
          top_p: 1.0,
          n: 1,
          streams: false,
          presence_penalty: 0,
          frequency_penalty: 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
        }
      )
      .then((res) => console.log(res));
  };

  return (
    <>
      <input onChange={(e) => setMessage(e.target.value)} />
      <button onClick={SendMessage}>Send</button>
      <div></div>
    </>
  );
};
