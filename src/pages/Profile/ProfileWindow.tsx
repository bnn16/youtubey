import React, { useState } from 'react';
import { BiLocationPlus } from 'react-icons/bi';
import { MdWork } from 'react-icons/md';
import { FiYoutube } from 'react-icons/fi';

type Props = {
  data: any;
};

function ProfileWindow({ data }: Props) {
  const [hover, setHover] = useState<boolean>(false);

  return (
    <div className="flex items-center h-auto lg:h-full flex-wrap mx-auto -mr-24 my-32 lg:my-0">
      <div
        id="profile"
        className="w-full relative lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0"
      >
        <div className="absolute bottom-8 right-8">
          <button className="bg-black hover:bg-red-800 hover:text-white text-white font-bold py-2 px-4 rounded-full">
            Edit Profile
          </button>
        </div>
        <div className="p-4 md:p-12 text-center lg:text-left">
          <div
            className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
            style={{
              backgroundImage:
                data.image.data === null
                  ? `url(https://api-private.atlassian.com/users/5e58d1d8f529fbb37309149956f28c00/avatar)`
                  : `url(data:image/png;base64,${data?.image.data})`,
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

      <div className="w-full ml-28 lg:w-1/5">
        {data?.image.data === null ? (
          <img
            src="https://api-private.atlassian.com/users/5e58d1d8f529fbb37309149956f28c00/avatar"
            className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
            alt=""
          />
        ) : (
          <img
            src={`data:image/png;base64,${data?.image.data}`}
            className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
            alt=""
          />
        )}
      </div>
    </div>
  );
}

export default ProfileWindow;
