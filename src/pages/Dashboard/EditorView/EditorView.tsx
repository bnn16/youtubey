import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetPosts from '../../../api/GetPosts';
import { useAuth } from '../../../utils/AuthProvider';
import PostPost from '../../../api/PostPost';
import { MdCancel } from 'react-icons/md';
import PostVideo from '../../../api/PostVideo';
import PatchPost from '../../../api/PatchPost';
import Layout from '../../../layout/Layout';

type Post = {
  title: string;
  status: string;
  id: number;
  link: string;
  userId: string;
};
type Colors = {
  [key: string]: string;
};

const EditorView = () => {
  const navigate = useNavigate();
  const { token, userId } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);

  const colors: Colors = {
    Created: 'text-yellow-500',
    Pending: 'text-blue-500',
    Approved: 'text-green-500',
    Rejected: 'text-red-500',
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const link = `http://localhost:8080/rest/requests/edits/posts`;

      try {
        const response = await GetPosts(link, token);
        if (response?.response) {
          setPosts(response.response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="pb-4">
      <div className="relative">
        <h1 className="text-4xl font-bold text-gray-900 mt-12">All Posts</h1>
        <h2 className="text-xl font-semibold text-gray-700 mt-2">
          All posts where the status is Created from all users.
        </h2>
        <button
          onClick={() => {
            navigate(`/posts/editorView/${userId}`);
          }}
          className="absolute linear top-0 right-4 rounded-lg bg-red-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-red-700 active:bg-red-700"
        >
          See posts where you're the editor
        </button>
      </div>

      <div className="my-10 grid gap-4 grid-cols-1">
        {posts?.map((post, index) => (
          <div key={index} className="max-w-xsm bg-white shadow-md rounded-lg">
            <div className="relative h-40">
              <img
                src={post.link}
                className="object-cover w-full h-full rounded-t-lg"
                alt={`img`}
              />
            </div>
            <div className="p-4">
              <p className="mt-4 text-xs font-small opacity-50 text-gray-600">
                Post Youtuber : {post.userId}
              </p>
              <p className="text-lg font-semibold text-navy-700">
                {post.title}
              </p>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => {
                    navigate(`/posts/${post.id} `);
                  }}
                  className="linear rounded-lg bg-red-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-red-700 active:bg-red-700"
                >
                  Check Status
                </button>
                <div className="flex items-center">
                  Status:{' '}
                  <span className={colors[post.status]}> {post.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditorView;
