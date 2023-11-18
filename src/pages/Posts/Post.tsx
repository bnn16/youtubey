import React from 'react';
import { useParams } from 'react-router-dom';

type Props = {};

const Post = (props: Props) => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default Post;
