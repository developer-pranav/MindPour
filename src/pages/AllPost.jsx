import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, Postcard } from '../components'

function AllPost() {
    const [posts, setPosts] = useState([])
    appwriteService.getPosts([]).then((posts) => {
        if(posts){
            setPosts(posts.documents)
        }
    })
    

  return (
    <div className="w-full min-h-[calc(100vh-150px)]">
        <Container>
            <div className="flex flex-wrap">
                {posts.map((post)=>(
                    <div key={post.$id} className="p-2 w-1/4">
                        <Postcard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPost