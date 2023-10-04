import React from 'react';

interface NoMatchProps {
  message: string;
}

function NoMatch({ message }: NoMatchProps) {
  return <p>{message}</p>;
}

export default NoMatch;
