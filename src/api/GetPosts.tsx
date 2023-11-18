import axios from 'axios';

async function GetPosts(url: string, authToken: string | null) {
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };

  try {
    const response = await axios.get(url, config);

    return {
      response: response.data,
    };
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
}

export default GetPosts;
