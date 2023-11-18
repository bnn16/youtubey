import React from 'react';
import EditorCard from './EditorCard';

const EditorView = () => {
  const posts = [
    {
      title: 'React Tailwind Card with Grid 1',
      img:
        'https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png',
      content:
        'react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content',
      id: '3',
    },
    {
      title: 'React Tailwind Card with Grid 2',
      img:
        'https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png',
      content:
        'react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content',
      id: '0',
    },
    {
      title: 'React Tailwind Card with Grid 3',
      img:
        'https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png',
      content:
        'react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content',
      id: '1',
    },
    {
      title: 'React Tailwind Card with Grid 4',
      img:
        'https://cdn.pixabay.com/photo/2019/12/17/14/43/christmas-4701783__340.png',
      content:
        'react tailwind css card with image It is a long established fact that a reader will be distracted by the readable content',
      id: '2',
    },
  ];

  return (
    <>
      <div className="grid gap-7 pt-12 lg:grid-cols-3">
        {posts.map((items, key) => (
          <EditorCard
            key={key}
            title={items.title}
            img={items.img}
            content={items.content}
            id={items.id}
          />
        ))}
      </div>
    </>
  );
};

export default EditorView;
