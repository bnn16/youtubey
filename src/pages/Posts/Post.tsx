import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../../layout/Layout';
import { useAuth } from '../../utils/AuthProvider';
import GetPostById from '../../api/GetPostById';
import PatchPost from '../../api/PatchPost';
import { MdCancel } from 'react-icons/md';
import PostVideo from '../../api/PostVideo';

type Post = {
  title: string;
  status: string;
  id: number;
  link: string;
  userId: string;
  description: string;
  public_url: string;
  editedVideo: string | null;
  editorId: string | null;
};

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, role, userId } = useAuth();
  const [post, setPost] = React.useState<Post>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [isFilePicked, setIsFilePicked] = useState(false);

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

  const closeModal = () => {
    setIsModalOpen(false);
    setIsFilePicked(false);
    setSelectedFile(null);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleVideoChange = (e: any) => {
    setIsFilePicked(true);
    setSelectedFile(e.target.files[0]);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();

    if (post?.status === 'Created' || post?.status === 'Rejected') {
      const link = `http://localhost:8080/rest/requests/edits/posts/${id}`;
      post.status = 'Pending';
      post.editorId = userId;
      const response = await PatchPost(link, token, post);
      if (response?.posts) {
        const post = await GetPostById(link, token);
        setPost(post?.post);
      }
    }
  };
  const approveVideo = async (e: any) => {
    e.preventDefault();

    if (post?.status === 'Pending') {
      const link = `http://localhost:8080/rest/requests/edits/posts/${id}`;
      post.status = 'Approved';
      const response = await PatchPost(link, token, post);
      if (response?.posts) {
        const post = await GetPostById(link, token);
        setPost(post?.post);
      }
    }
  };

  const rejectVideo = async (e: any) => {
    e.preventDefault();

    if (post?.status === 'Pending') {
      const link = `http://localhost:8080/rest/requests/edits/posts/${id}`;
      post.status = 'Rejected';
      const response = await PatchPost(link, token, post);
      if (response?.posts) {
        const post = await GetPostById(link, token);
        setPost(post?.post);
      }
    }
  };

  const videoUploadHandler = async (e: any) => {
    e.preventDefault();
    if (post) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('role', 'Editor');

      const response = await PostVideo(
        `http://localhost:8000/upload/${id}`,
        formData
      );

      if (response) {
        post.editedVideo = response.updateResponse.file_url;
        post.status = 'Pending';
        console.log(response);

        const updatePost = await PatchPost(
          `http://localhost:8080/rest/requests/edits/posts/${post.id}`,
          token,
          post
        );
        console.log(updatePost);
      }

      closeModal();
    }
  };

  const handleChat = () => {
    navigate(`/chat`);
  };

  return (
    <Layout>
      {role === 'YouTuber' ? (
        post ? (
          <div className="max-w-screen-lg mx-auto p-4 flex flex-col md:flex-row">
            <div className="md:flex-1 divide-y-2 divide-black">
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
              <div className="relative aspect-w-16 aspect-h-9 mb-6 pt-4">
                <h2 className="text-lg font-semibold mb-2 text-red-500">
                  Edited Video
                </h2>
                {post?.editedVideo ? (
                  <video
                    className="rounded-lg shadow-md object-cover w-10/12"
                    controls
                  >
                    <source src={post.editedVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <h3 className="font-semibold opacity-70 mb-2 text-red-500">
                    Waiting for video editor to edit it...
                  </h3>
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
                {post.editorId ? (
                  <div>
                    <h2 className="text-lg font-semibold mb-2 text-red-500">
                      Editor ID:
                    </h2>
                    <p className="text-gray-800">{post?.editorId}</p>
                  </div>
                ) : null}

                <div>
                  {post.status === 'Pending' ? (
                    <div className="flex flex-col py-4 px-4 w-52 h-full justify-center items-center">
                      <button
                        onClick={approveVideo}
                        className="bg-green-500 mt-2 text-white p-2 rounded-lg hover:bg-green-700 basis-1/4"
                      >
                        Approve Changes
                      </button>
                      <button
                        onClick={rejectVideo}
                        className="bg-red-500 mt-2 text-white p-2 rounded-lg hover:bg-red-700  basis-1/4"
                      >
                        Reject Changes
                      </button>
                    </div>
                  ) : null}
                </div>
                <div>
                  <button
                    onClick={handleChat}
                    className="bg-red-500 mt-10 text-white p-2 rounded-lg"
                  >
                    Chat with Editor!
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )
      ) : (
        <div className="max-w-screen-lg mx-auto p-4 flex flex-col md:flex-row">
          <div className="flex-1 flex-col divide-y-2 divide-black">
            <div className="relative aspect-w-12 aspect-h-9 mb-6">
              {post?.public_url ? (
                <video
                  className="rounded-lg shadow-md object-cover w-10/12"
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

            <div className="relative aspect-w-16 aspect-h-9 mb-6 pt-4">
              {post?.editedVideo ? (
                <video
                  className="rounded-lg shadow-md object-cover w-10/12"
                  controls
                >
                  <source src={post.editedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : post?.editedVideo && post?.editorId === userId ? (
                <h2 className="text-lg font-semibold mb-2 text-red-500">
                  Please upload the edited version of the video!
                </h2>
              ) : null}
            </div>
          </div>

          <div className="md:w-1/3 md:ml-8">
            <h2 className="text-2xl font-semibold mb-2 text-red-500">
              {post?.title}
            </h2>
            <div className="mb-6">
              <p className="text-gray-800">{post?.description}</p>
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2 text-red-500">
                  Status:
                </h2>
                <p className="text-gray-800">{post?.status}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2 text-red-500">
                  User ID:
                </h2>
                <p className="text-gray-800">{post?.userId}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2 text-red-500">
                  Editor ID:
                </h2>
                <p className="text-gray-800">{post?.editorId}</p>
              </div>
              <div>
                {post?.status === 'Created' ? (
                  <button
                    onClick={submitHandler}
                    className="bg-red-500 mt-10 text-white p-2 rounded-lg"
                  >
                    Get Video
                  </button>
                ) : !post?.editedVideo || post?.status === 'Rejected' ? (
                  <button
                    onClick={openModal}
                    className="bg-red-500 mt-10 text-white p-2 rounded-lg"
                  >
                    {' '}
                    Upload Video
                  </button>
                ) : post.status === 'Pending' ? (
                  <h1 className="text-lg text-red-500 py-10 underline">
                    Waiting for Response...
                  </h1>
                ) : post.status === 'Approved' ? (
                  <h1 className="py-4 text-md font-bold text-green-500">
                    {' '}
                    Congrats! Video has been approved
                  </h1>
                ) : null}
              </div>
              <div>
                <button
                  onClick={handleChat}
                  className="bg-red-500 mt-10 text-white p-2 rounded-lg"
                >
                  Chat with YouTuber!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-8 rounded-lg max-w-md">
            <h2 className="text-2xl font-bold mb-4">Upload Edited Video</h2>
            <form onSubmit={videoUploadHandler} className="space-y-4">
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
    </Layout>
  );
};

export default Post;
