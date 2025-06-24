import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, Postcard, Loader } from '../components';

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService.getPosts().then((res) => {
      if (res) {
        setPosts(res.documents || []);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader text="Fetching all posts..." />;

  return (
    <div className="w-full min-h-[calc(100vh-150px)]">
      <Container>
        {posts.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No posts found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <Postcard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPost;
