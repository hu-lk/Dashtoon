
// const api_key = process.env.API_URL;
const API_URL = 'https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud';

// image generation for all panel inputs
const generateComic = async (texts, setComicImages) => {
  try {
    const imageArray = [];

    for (const text of texts) {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Accept: 'image/png',
          Authorization: 'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      });
      if (!response.ok) {
        throw new Error(`Failed to generate comic. Status: ${response.status}`);
      }

      const imageBlob = await response.blob();
      const imageURL = URL.createObjectURL(imageBlob);

      imageArray.push(imageURL);
    }

    setComicImages(imageArray);
  } catch (error) {
    console.error('Error generating comic:', error);
    
    setComicImages([]); 
  }
};

export default generateComic;
