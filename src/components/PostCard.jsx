import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function Postcard({ $id, title, featuredImage, username, status }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4 transition hover:shadow-md hover:bg-gray-200 duration-200 ease-in-out relative">
        <div className="w-full flex justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl object-cover w-full h-48 sm:h-64"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{title}</h2>
        <p className="text-xs text-gray-500 mt-1">{username}</p>
        {status === 'inactive' && (
          <span className="absolute bottom-5 right-5 bg-red-400 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
            Private
          </span>
        )}
      </div>
    </Link>
  );
}

export default Postcard;