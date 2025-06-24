import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";


export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="min-h-[calc(100vh-142px)]">
      <Container>
        {/* Post image + Author Actions */}
        <div className="w-full flex justify-center items-center bg-black/5 p-4 max-h-[600px] overflow-hidden">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="object-contain max-h-[500px] rounded-xl"
          />

          {isAuthor && (
            <div className="absolute right-4 top-30 flex gap-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Post Title */}
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
        </div>

        <div className="mb-4 text-sm text-gray-500">
          Posted by <span className="font-semibold text-gray-700">{post.username}</span>
          {post.status === "inactive" && (
          <span className="ml-3 mt-1 px-3 py-1 bg-red-400 text-white text-sm font-semibold rounded-full">
            Private
          </span>
        )}
        </div>

        {/* Post Content */}
        <div className="prose prose-lg max-w-full text-gray-700">
          {parse(post.content)}
        </div>

      </Container>
    </div>
  ) : null;
}
