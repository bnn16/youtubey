import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { BiEdit, BiUser } from 'react-icons/bi';
import { Config } from '../../constants/config';
import updateUserInfo from '../../api/UpdateUserInfo';

export default function SettingsModal({
  open,
  setOpen,
  props,
  userId,
  token,
}: {
  open: boolean;
  setOpen: any;
  props: any;
  userId: string;
  token: string;
}) {
  const cancelButtonRef = useRef(null);
  const [selectedImage, setSelectedImage]: any = useState();
  const [selectedJob, setSelectedJob] = useState<string>(props.role);
  const [selectedLink, setSelectedLink] = useState<string>(props.ytLink);
  const [selectedDescription, setSelectedDescription] = useState<string>(
    props.description
  );
  const [selectedUsername, setSelectedUsername] = useState<string>(
    props.username
  );

  const submitHandler = () => {
    // Gather all the data
    const username = selectedUsername;
    const description = selectedDescription;
    const image = selectedImage;
    const job = selectedJob;
    const link = selectedLink;

    const formData = new FormData();
    if (image !== null) {
      formData.append('image', image);
      formData.append('title', userId);
    }

    const jsonData = {
      username,
      description,
      role: job,
      ytLink: link,
    };

    const url1 = Config.apiUrl + '/rest/auth/profile/' + userId;
    const url2 = Config.apiUrl + '/rest/requests/profile/photos/add';

    updateUserInfo(url1, url2, token, jsonData, formData);

    setOpen(false);
    window.location.replace('/profile');
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <form onSubmit={submitHandler}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-300 sm:mx-0 sm:h-10 sm:w-10">
                        <BiEdit
                          className="h-6 w-6 text-black-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Profile
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            This information will be displayed publicly so be
                            careful what you share.
                          </p>
                          <div className="sm:col-span-4">
                            <label
                              htmlFor="username"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Username
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  onChange={(event) =>
                                    setSelectedUsername(event.target.value)
                                  }
                                  value={selectedUsername}
                                  type="text"
                                  name="username"
                                  id="username"
                                  autoComplete="username"
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder={props?.username || 'Username'}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="about"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Description
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="about"
                                onChange={(event) =>
                                  setSelectedDescription(event.target.value)
                                }
                                value={selectedDescription}
                                name="about"
                                rows={3}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={
                                  props.description || 'I like apples!'
                                }
                              />
                            </div>
                            <p className="mt-3 text-sm leading-6 text-gray-600">
                              Write a few sentences about yourself.
                            </p>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="profile-photo"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Profile Photo
                            </label>
                            {selectedImage ? (
                              <div>
                                <img
                                  alt="not found"
                                  width={'250px'}
                                  src={URL.createObjectURL(selectedImage)}
                                />
                                <br />
                                <button
                                  className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-0 sm:w-auto"
                                  onClick={() => setSelectedImage(null)}
                                >
                                  Remove
                                </button>
                              </div>
                            ) : (
                              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                  <BiUser
                                    className="mx-auto h-12 w-12 text-gray-300"
                                    aria-hidden="true"
                                  />
                                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label
                                      htmlFor="file-upload"
                                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                      <span>Upload a file</span>
                                      <input
                                        id="file-upload"
                                        name="image"
                                        type="file"
                                        className="sr-only"
                                        onChange={(event): any => {
                                          if (event.target.files) {
                                            console.log(event.target.files[0]);
                                            setSelectedImage(
                                              event.target.files[0]
                                            );
                                          }
                                        }}
                                      />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                  </div>
                                  <p className="text-xs leading-5 text-gray-600">
                                    PNG, JPG, GIF up to 10MB
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                          <label
                            htmlFor="job-title"
                            className="block text-sm font-medium leading-6 text-gray-900 mt-4"
                          >
                            Job
                          </label>
                          <div className="mt-2">
                            <select
                              onChange={(event) =>
                                setSelectedJob(event.target.value)
                              }
                              value={selectedJob}
                              id="country"
                              name="country"
                              autoComplete="country-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                              <option value="YouTuber">YouTuber</option>
                              <option value="Editor">Editor</option>
                            </select>
                          </div>
                          <div className="sm:col-span-4 pt-4">
                            <label
                              htmlFor="username"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Channel Link
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                  onChange={(event) =>
                                    setSelectedLink(event.target.value)
                                  }
                                  value={selectedLink}
                                  type="text"
                                  name="link"
                                  id="channel-link"
                                  autoComplete="link"
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  placeholder="youtube.com/pewdiepie"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 mt-4 pb-5 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </form>
      </Dialog>
    </Transition.Root>
  );
}
