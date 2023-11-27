import React, { useState } from 'react';
import ComicForm from './ComicForm';
import generateComic from './GenerateComic';
import "./home.css";

const Home = () => {
  const [comicImages, setComicImages] = useState([]);
  const [texts, setTexts] = useState(Array(10).fill(''));
  const [isLoading, setIsLoading] = useState(false);

  // function call to generate the images 
  const handleGenerateComic = async (texts) => {
    setIsLoading(true);
    try {
      await generateComic(texts, setComicImages);
    } finally {
      setIsLoading(false);
    }
  };

// function will combines the user input panels and send generator function
  const handleSubmit = async () => {

    const texts1 = getPanelTexts(0, 4);
    const texts2 = getPanelTexts(5, 9);
    const allTexts = [...texts1, ...texts2];

    await handleGenerateComic(allTexts);
  };

//  function will joins the inputs
  const getPanelTexts = (startIndex, endIndex) => {
    return Array.from({ length: endIndex - startIndex + 1 }, (_, index) => texts[startIndex + index]);
  };

  // render the home page
  return (
    <div className='home'>
    <div className="title">
       Comic Weave
       <div className='subtitle'>
        There is no limitations for your imagination..
       </div>
    </div>
    <div className="flex items-center justify-center min-h-screen">
      <div className='flex flex-col '>
        <div className="mr-8 flex flex-row">
          <div className="mr-2 flex-1">
            <ComicForm onSubmit={handleGenerateComic} startIndex={0} endIndex={4} />
          </div>
          <div className="flex-1">
            <ComicForm onSubmit={handleGenerateComic} startIndex={5} endIndex={9} />
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-900" type="button" onClick={handleSubmit}>
            Generate Comic
          </button>
          
        </div>
      </div>
      <div className="border border-dashed border-gray-500 p-4 w-[512px] h-[512px] flex items-center justify-center">
        {comicImages.length > 0 ? (
          <div className="flex flex-1">
            {comicImages.map((image, index) => (
              <div key={index} className=" overflow-hidden border border-solid border-black">
                <img src={image} alt={`Generated Comic ${index + 1}`} className="object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 normal">{isLoading ? 'Generating images...' : 'Generate images'}
          
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Home;

