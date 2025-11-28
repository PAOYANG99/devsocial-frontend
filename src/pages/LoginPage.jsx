import React,{ useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginPage() {

    const { login,isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    }); 

    useEffect(() => {
        if(isAuthenticated){
            navigate('/');
        }
    }, [isAuthenticated,navigate]);

    const {email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
        // try {
        //     const res = await axios.post('http://localhost:5000/api/auth/login', formData);
        //     console.log(res.data);
        //     alert('User Login Successfully');
        // } catch (err) {
        //     console.error(err.response.data);
        //     alert(err.response.data.msg);
        // }
        
    }
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-white text-center mb-6">Login to Your Account</h1>
            <form onSubmit={onSubmit} className='space-y-6'>
                <div>
                    <input 
                        type="text"
                        placeholder='Email Address'
                        name="email"
                        value={email}
                        required
                        onChange={onChange}
                        className='w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                     />
                </div>
                <div>
                    <input 
                        type="password"
                        placeholder='Password'
                        name="password"
                        value={password}
                        minLength={6}
                        required
                        onChange={onChange}
                        className='w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                     />
                </div>
                <input type="submit" value="Login" className='w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md cursor-pointer transition-colore' id="" />
            </form>
        </div>
      
    </div>
  )
}

export default LoginPage
