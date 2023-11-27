
//api key
const api_key = process.env.API_URL;

// image generation for all panel inputs
const generateComic = async (texts, setComicImages) => {
  try {
    const imageArray = [];

    for (const text of texts) {
      const response = await fetch(api_key, {
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
