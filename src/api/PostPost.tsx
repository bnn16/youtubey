import axios from 'axios';

type Post = {
  title: string;
  description: string;
  link: string;
  userId: string | null;
  status: string;
};

async function PostPost(url: string, authToken: string | null, json: Post) {
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };

  try {
    const response = await axios.post(url, json, config);

    return {
      posts: response.data,
    };
  } catch (err) {
    console.log(err);
  }
}

export default PostPost;
