import React, { useState } from 'react';
import "./home.css";

const ComicForm = ({ startIndex, endIndex }) => {
  const [texts, setTexts] = useState(Array(10).fill(''));

  const handleTextChange = (index, text) => {
    const newTexts = [...texts];
    newTexts[index] = text;
    setTexts(newTexts);
  };

  return (
    <form className="max-w-xl mx-auto mt-8">
      {texts.slice(startIndex, endIndex + 1).map((text, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 normal">{`Panel ${startIndex + index + 1}:`}</label>
          <input
            className="mt-1 p-2 w-full border rounded-md"
            type="text"
            value={text}
            onChange={(e) => handleTextChange(startIndex + index, e.target.value)}
          />
        </div>
      ))}
    </form>
  );
};

export default ComicForm;
