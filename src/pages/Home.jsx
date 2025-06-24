import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, Postcard } from '../components';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full text-center min-h-[calc(100vh-150px)]">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-20 w-full">
              <h1 className="text-2xl font-bold">
                No Posts 
                <br/>
                (Login If you are Not)
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-150px)]">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <Postcard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;