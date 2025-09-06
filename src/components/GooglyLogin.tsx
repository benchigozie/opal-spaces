import { GoogleLogin } from '@react-oauth/google';
import type { CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import axios from 'axios';

function GooglyLogin() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    const { credential } = credentialResponse;
    if (!credential) {
      console.error('No credential returned from Google');
      return;
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/google`,
        { credential },
        { withCredentials: true }
      );

      //console.log('Login successful:', response.data.user); 
      login(response.data.user, response.data.accessToken);
      if (response.data.user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }

    } catch (error: any) {
      //console.error('Google login failed:', error.response?.data || error.message);
    }

  }

  const handleError = () => {
    //console.error('Google login was cancelled or failed');
  };
  return (
    <GoogleLogin  onSuccess={handleSuccess} onError={handleError}/>
  )
}

export default GooglyLogin