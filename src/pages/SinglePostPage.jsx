import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import PostItem from '../components/posts/PostItem'

function SinglePostPage() {

    const {id} = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true)
                const res = await axios.get(`/api/posts/${id}`)
                setPost(res.data) 
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    },[id])

    const handlePostDeleted = () => {
        alert('Post deleted successfully');
        navigate('/');
    }

    const handlePostUpdated = (updatedPost) => {
        setPost(updatedPost);
    }

    if (loading) return <p className='texnt-center'>Loading post...</p>
    if (!post) return <p className='texnt-center text-red-500'>Post not found...</p>
  return (
    <div className='text-white space-y-6'>
        <Link to ='/' className='text-white bg-gray-800 p-3 rounded-md mb-3 inline-block'>Go Back</Link>
        <PostItem 
            post={post} 
            onPostUpdated={handlePostUpdated}
            onPostDeleted={handlePostDeleted}
            isSinglePostView={true}
        />
    </div>
  )
}

export default SinglePostPage
