import React from 'react';

interface NoMatchProps {
  message: string;
}

function NoMatch({ message }: NoMatchProps) {
  return <div className="text-black text-7xl font-bold">{message}</div>;
}

export default NoMatch;
