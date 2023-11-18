import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetPosts from '../../../api/GetPosts';
import { useAuth } from '../../../utils/AuthProvider';
import PostPost from '../../../api/PostPost';
import { MdCancel } from 'react-icons/md';
import PostVideo from '../../../api/PostVideo';
import PatchPost from '../../../api/PatchPost';

type Post = {
  title: string;
  status: string;
  id: number;
  link: string;
};

const YoutuberView = () => {
  const navigate = useNavigate();
  const { token, userId } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    userId: userId,
    status: 'Created',
  });

  const [posts, setPosts] = useState<Post[]>([]);

  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const link = `http://localhost:8080/rest/requests/edits/posts/user/${userId}`;

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

  const closeModal = () => {
    formData.title = '';
    formData.description = '';
    formData.link = '';
    setIsModalOpen(false);
    setIsFilePicked(false);
    setSelectedFile(null);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleVideoChange = (e: any) => {
    setIsFilePicked(true);
    setSelectedFile(e.target.files[0]);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const post = await PostPost(
        'http://localhost:8080/rest/requests/edits/posts',
        token,
        formData
      );

      if (post?.posts?.id) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('role', 'YouTuber');

        const response = await PostVideo(
          `http://localhost:8000/upload/${post.posts.id}}`,
          formData
        );

        if (response) {
          post.posts.public_url = response.updateResponse.file_url;
        }

        console.log(post.posts);

        const updatePost = await PatchPost(
          `http://localhost:8080/rest/requests/edits/posts/${post.posts.id}`,
          token,
          post.posts
        );
        console.log(updatePost);
      }

      const link = `http://localhost:8080/rest/requests/edits/posts/user/${userId}`;
      const updatedPosts = await GetPosts(link, token);

      if (updatedPosts?.response) {
        setPosts(updatedPosts.response);
      }

      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pb-4">
      <div className="relative">
        <button
          onClick={openModal}
          className="linear rounded-lg bg-red-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-red-700 absolute top-0 right-4"
        >
          Add Post
        </button>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 mt-12">Your Posts</h1>

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
                Video Title:
              </p>
              <p className="text-lg font-semibold text-navy-700">
                {post.title}
              </p>
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => {
                    navigate(`/post/${post.id}}`);
                  }}
                  className="linear rounded-lg bg-red-500 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-red-700 active:bg-red-700"
                >
                  Check Status
                </button>
                <div className="flex items-center">
                  Status: <span className="text-green-500"> {post.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full h-24 resize-none"
              ></textarea>
              <input
                type="text"
                name="link"
                placeholder="Link or Image URL"
                value={formData.link}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              <input
                className="text-sm text-grey-500
              file:mr-5 file:py-2 file:px-6
              file:rounded-full file:border-0
              file:text-sm file:font-medium
              file:bg-black-50 file:text-black-700
              hover:file:cursor-pointer hover:file:bg-red-50
              hover:file:text-red-700
            "
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
              />
              {isFilePicked ? (
                <div>
                  <p>Filename: {selectedFile.name}</p>
                  <p>Filetype: {selectedFile.type}</p>
                  <p>
                    Size in bytes:{' '}
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>

                  <MdCancel
                    onClick={() => {
                      setIsFilePicked(false);
                      setSelectedFile(null);
                    }}
                    className="text-red-500 hover:cursor-pointer"
                  ></MdCancel>
                </div>
              ) : (
                <p>Select a file to show details</p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-500 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-red-700"
                >
                  Submit
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default YoutuberView;
