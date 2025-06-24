import React from 'react'
import { Container, PostForm } from '../components/index'

function AddPost() {
  return (
    <div className='min-h-[calc(100vh-150px)]'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost