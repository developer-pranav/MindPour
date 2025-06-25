import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Postcard, Loader } from '../components';
import appwriteService from '../appwrite/config';
import Avatar from '../Images/avatar.jpg';

function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
  if (userData?.$id) {
    setLoading(true); // show loader while fetching posts
    appwriteService.getPosts()
      .then((res) => {
        const filteredPosts = res?.documents?.filter(
          (post) => post.userId === userData.$id
        );
        setUserPosts(filteredPosts || []);
      })
      .finally(() => setLoading(false));
  } else {
    setLoading(false); // in case userData is null
  }
}, [userData]);


  if (loading) return <Loader text="Loading your profile..." />;

  if (!userData) {
    return (
      <Container>
        <div className="min-h-[70vh] flex items-center justify-center text-center">
          <p className="text-lg text-gray-700">Please login to view your profile.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-md rounded-xl p-0 sm:p-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={Avatar}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-800">{userData.name || 'User'}</h2>
            <p className="text-gray-500 text-sm">{userData.email}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-lg text-gray-700">
            <span className="font-semibold">{userPosts.length}</span> Posts Added
          </p>
          <button
            onClick={() => navigate('/edit-profile')}
            className="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition mt-4 sm:mt-0"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* User Posts */}
      <div className="mt-10 min-h-[calc(100vh-580px)] sm:min-h-[calc(100vh-455px)]">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Posts</h3>
        {userPosts.length === 0 ? (
          <p className="text-gray-500">You haven’t added any posts yet.</p>
        ) : (
          <div className="flex flex-wrap -mx-2">
            {userPosts.map((post) => (
              <div key={post.$id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
                <Postcard {...post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default Profile;
