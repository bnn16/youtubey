import React from 'react';
import Layout from '../layout/Layout';

interface NoMatchProps {
  message: string;
}

function NoMatch({ message }: NoMatchProps) {
  return <Layout>{message}</Layout>;
}

export default NoMatch;
