import React, { useState } from 'react'
import axios from 'axios'

function PostForm({onNewPost}) {

    const [content, setContent] = useState('');
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('javascript');

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const newPost =  {
                content,
                codeSnippet: {
                    language,
                    code
                }
            }
            const res = await axios.post('/api/posts', newPost);
            onNewPost(res.data);
            setContent('');
            setCode('');
        } catch (err) {
            console.error(err.response.data);
            alert('Failed to create post. Are you logged in?');
        }
    }
  return (
    <div className='bg-gray-800 p-6 rounded-lg shadow-md mb-8'>
        <h2 className='text-2xl text-white font-bold mb-4'>Create a Post</h2>
        <form onSubmit={onSubmit} className='space-y-4'>
                <textarea  
                    placeholder="What's on your mind, developer?"
                    rows="3"
                    required
                    value={content} 
                    onChange={(e) => setContent(e.target.value)} 
                    className='bg-gray-700 text-white p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                ></textarea>
                <textarea  
                    placeholder="// Your code snippet here"
                    rows="3"
                    required
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    className='bg-gray-700 text-white p-2 font-mono text-sm rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                ></textarea>
                <div className='flex justify-between items-center'>
                    <select 
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className='bg-gray-700 text-white p-2 rounded-md '
                    >
                        <option value='html'>HTML</option>
                        <option value='javascript'>JavaScript</option>
                        <option value='python'>Python</option>
                        <option value='css'>CSS</option>
                        <option value='java'>Java</option>
                    </select>
                    <button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors'>Post</button>
                </div>
            
        </form>
      
    </div>
  )
}

export default PostForm
