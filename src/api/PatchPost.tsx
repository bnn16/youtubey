import axios from 'axios';

type Post = {
  title: string;
  description: string;
  link: string;
  userId: string | null;
  status: string;
};

async function PatchPost(url: string, authToken: string | null, json: Post) {
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };

  try {
    const response = await axios.patch(url, json, config);

    return {
      posts: response.status,
    };
  } catch (err) {
    console.log(err);
  }
}

export default PatchPost;
