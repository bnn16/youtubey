import React, { useState } from 'react';
import { BiLocationPlus } from 'react-icons/bi';
import { MdWork } from 'react-icons/md';
import { FiYoutube } from 'react-icons/fi';
import SettingsModal from './SettingsModal';
// import SettingsModal from './SettingsModal';

type Props = {
  data: any;
  userId: string;
  token: string;
};

function ProfileWindow({ data, userId, token }: Props) {
  const [hover, setHover] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const editClickHandler = () => {
    setOpen(true);
  };

  const imageUrl =
    data && data.image && data.image.data
      ? `data:image/png;base64,${data.image.data}`
      : 'https://api-private.atlassian.com/users/5e58d1d8f529fbb37309149956f28c00/avatar';

  return (
    <div className="flex items-center h-auto max-w-full lg:h-full flex-wrap mx-auto -mr-40 pl-24 my-32  lg:my-0">
      <div
        id="profile"
        className="w-full relative lg:w-2/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-100 mx-6 lg:mx-0000"
      >
        <div className="absolute bottom-8 right-8">
          <button
            onClick={editClickHandler}
            className="bg-black hover:bg-red-800 hover:text-white text-white font-bold py-2 px-4 rounded-full"
          >
            Edit Profile
          </button>
        </div>
        {open ? (
          <SettingsModal
            open={open}
            setOpen={setOpen}
            props={data}
            userId={userId}
            token={token}
          />
        ) : null}
        <div className="p-4 md:p-12 text-center lg:text-left">
          <div
            className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageUrl})`,
            }}
          ></div>
          <h1 className="text-3xl font-bold pt-8 lg:pt-0">{data?.username}</h1>
          <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-red-500 opacity-80"></div>
          <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
            <MdWork className="mr-3 w-4 h-4" />
            {data?.role}
          </p>
          <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center lg:justify-start">
            <BiLocationPlus className="mr-3 w-4 h-4" />
            {data?.location}
          </p>
          <p className="pt-8 text-sm">{data?.description}</p>
          <div className="mt-6 pb-16 lg:pb-0 w-4/5 lg:w-full mx-auto flex flex-wrap items-center justify-between">
            <a
              className="link opacity-100 hover:opacity-80"
              href="https://www.youtube.com/channel/UC8z3hVXy7fQJyj0x1XxvXkg"
              target="_blank"
              rel="noreferrer"
            >
              <FiYoutube
                color={hover ? 'rgb(220 38 38)' : 'black'}
                size={42}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              />
            </a>
          </div>
        </div>
      </div>

      <div className="w-full ml-50 lg:w-1/3">
        {data && data.image ? (
          data.image.data === null ? (
            <img
              src="https://api-private.atlassian.com/users/5e58d1d8f529fbb37309149956f28c00/avatar"
              className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
              alt=""
            />
          ) : (
            <img
              src={`data:image/png;base64,${data.image.data}`}
              className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
              alt="hello"
            />
          )
        ) : (
          <div>Image not available, please upload Image</div>
        )}
      </div>
    </div>
  );
}

export default ProfileWindow;
