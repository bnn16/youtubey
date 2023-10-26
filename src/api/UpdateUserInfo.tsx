import axios from 'axios';

async function updateUserInfo(
  url1: string,
  url2: string,
  authToken: string,
  jsonData: any,
  formData: FormData
) {
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };

  try {
    let response2;

    if (formData && !!formData.entries().next().value) {
      response2 = axios.post(url2, formData, config);
    }

    const response1 = axios.patch(url1, jsonData, config);

    const [updateResponse, anotherResponse] = await Promise.all([
      response1,
      response2,
    ]);

    return {
      updateResponse: updateResponse.data,
      anotherResponse: anotherResponse?.data,
    };
  } catch (err) {
    console.log(err);
  }
}

export default updateUserInfo;
