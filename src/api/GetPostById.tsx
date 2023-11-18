import axios from 'axios';

async function GetPostById(url: string, token: string | null) {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  try {
    const response = await axios.get(url, config);

    return {
      post: response.data,
    };
  } catch (err) {
    console.log(err);
  }
}
export default GetPostById;
