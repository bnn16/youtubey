/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';

async function fetchUserInfo(
  url: string,
  authToken: string,
  setData: React.Dispatch<React.SetStateAction<any>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const config = {
    headers: { Authorization: `Bearer ${authToken}` },
  };
  try {
    setLoading(true);
    const response = await axios.get(url, config);
    setData(response.data);
    localStorage.setItem('role', response.data.role);
  } catch (err) {
    setData(null);
  } finally {
    setTimeout(() => setLoading(false), 2000);
  }
}
export default fetchUserInfo;
