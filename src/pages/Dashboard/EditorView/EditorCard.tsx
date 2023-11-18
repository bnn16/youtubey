import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  key: number;
  title: string;
  img: string;
  content: string;
  id: string;
};

const EditorCard = (props: Props) => {
  const navigate = useNavigate();
  const clickHandler = (e: any) => {
    e.preventDefault();
    navigate(`/posts/${props.id}`);
  };

  return (
    <div className="w-full rounded-lg shadow-md lg:max-w-sm">
      <img className="object-cover w-full h-48" src={props.img} alt="" />
      <div className="p-4">
        <h4 className="text-xl font-semibold text-blue-600">{props.title}</h4>
        <p className="mb-2 leading-normal">{props.content}</p>
        <button
          onClick={clickHandler}
          className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow"
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default EditorCard;
