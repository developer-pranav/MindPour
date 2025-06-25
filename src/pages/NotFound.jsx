import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, BlogLogo } from '../components'

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-165px)] bg-gray-100">
            <Container>
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="text-8xl font-extrabold text-gray-800 mb-4">404</h1>
                    <p className="text-xl text-gray-600 mb-6">
                        Oops! The page you're looking for doesn't exist.
                    </p>
                    <Link to="/">
                        <Button className="px-6 py-2 rounded-full text-white bg-blue-600 hover:bg-blue-700 transition">
                            Go back home
                        </Button>
                    </Link>
                </div>
            </Container>
        </div>
    )
}
