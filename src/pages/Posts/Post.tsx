import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { useAuth } from '../../utils/AuthProvider';
import GetPostById from '../../api/GetPostById';

type Post = {
  title: string;
  status: string;
  id: number;
  link: string;
  userId: string;
  description: string;
  public_url: string;
};

const Post = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [post, setPost] = React.useState<Post>();

  useEffect(() => {
    const fetchPost = async () => {
      const link = `http://localhost:8080/rest/requests/edits/posts/${id}`;

      const response = await GetPostById(link, token);
      if (response?.post) {
        setPost(response.post);
      }
    };
    fetchPost();
  }, [id]);

  return (
    <Layout>
      {post ? (
        <div className="max-w-screen-lg mx-auto p-4 flex flex-col md:flex-row">
          <div className="md:flex-1">
            <div className="relative aspect-w-16 aspect-h-9 mb-6">
              {post.public_url ? (
                <video
                  className="rounded-lg shadow-md object-cover w-full"
                  controls
                >
                  <source src={post.public_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <h2 className="text-lg font-semibold mb-2 text-red-500">
                  No video uploaded/Error
                </h2>
              )}
            </div>
          </div>
          <div className="md:w-1/3 md:ml-8">
            <h2 className="text-2xl font-semibold mb-2 text-red-500">
              {post.title}
            </h2>
            <div className="mb-6">
              <p className="text-gray-800">{post.description}</p>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2 text-red-500">
                  Status:
                </h2>
                <p className="text-gray-800">{post.status}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2 text-red-500">
                  User ID:
                </h2>
                <p className="text-gray-800">{post.userId}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
};

export default Post;
