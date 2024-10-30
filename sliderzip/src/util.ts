import axios from "axios";

export const fetchImagesWithKeyWord = async (keyWord: string, random: boolean, numberOfImages: number) => {

    const keyWordImages:any =  {
        query: keyWord,
        per_page: numberOfImages,
        page: 1,
    };
    const randomImages:any =  {
        count:numberOfImages
    };

    const keyWordUrl = "https://api.unsplash.com/search/photos"
    const randomUrl =  "https://api.unsplash.com/photos/random"

    const accessKey = 'djABoqn84425wB9tD7hqwvwHti7X6-7sCuhkUpyBzaQ';
    try {
      const response = await axios.get(`${random?randomUrl:keyWordUrl}`, {
        params:random?randomImages:keyWordImages,
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      });
      console.log(response.data.results);
      return response.data.results.map((image:any)=> {
        return {
            image:image.urls.full,
            id:image.id
        }
      });

    } catch (error) {
      console.error("Error fetching images:", error);
      return null;
    }
  };