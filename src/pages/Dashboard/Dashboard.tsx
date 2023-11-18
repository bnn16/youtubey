import React, { useEffect } from 'react';
import Layout from '../../layout/Layout';
import { useAuth } from '../../utils/AuthProvider';
import EditorView from './EditorView/EditorView';
import YoutuberView from './YoutuberView/YoutuberView';

const DashBoard = () => {
  const [authToken, setAuthToken] = React.useState<string>('');

  const { role, userId, token } = useAuth();

  return (
    <Layout>
      {role === 'user' ? (
        <h1>Please go to your profile and change your role.</h1>
      ) : role === 'Editor' ? (
        <EditorView />
      ) : role === 'YouTuber' ? (
        <YoutuberView />
      ) : (
        <h1>Please log in.</h1>
      )}
    </Layout>
  );
};

export default DashBoard;
