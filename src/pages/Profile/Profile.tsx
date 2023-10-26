import React, { useEffect, useState } from 'react';
import Layout from '../../layout/Layout';
import fetchUserInfo from '../../api/UserInfo';
import { Config } from '../../constants/config';
import Loading from '../../components/Loading';
import NoMatch from '../NoMatch';
import ProfileWindow from './ProfileWindow';

type UserInfo = {
  username: string | undefined;
  id: string;
  role: string;
  description: string;
  image: any;
  ytLink: string;
  location: string;
};

function Profile() {
  const [userId, setUserId] = useState<string>('');
  const [authToken, setAuthToken] = useState<string>('');
  const [data, setData] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setUserId(localStorage.getItem('userID') || '');
    setAuthToken(localStorage.getItem('token') || '');

    const url = Config.apiUrl + '/rest/auth/profile/' + userId;

    fetchUserInfo(url, authToken, setData, setLoading);
    setData(data);
    console.log(data);
    setLoading(loading);
  }, [userId, authToken]);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : data === null ? (
        <NoMatch message="Error 404, not Found" />
      ) : (
        <ProfileWindow data={data} userId={userId} token={authToken} />
      )}
    </Layout>
  );
}

export default Profile;
