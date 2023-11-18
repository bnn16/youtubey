import axios from 'axios';

async function PostVideo(url: string, formData: FormData) {
  try {
    let response;

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    if (formData && !!formData.entries().next().value) {
      response = axios.post(url, formData, config);
    }

    const [updateResponse] = await Promise.all([response]);

    return {
      updateResponse: updateResponse?.data,
    };
  } catch (err) {
    console.log(err);
  }
}

export default PostVideo;
