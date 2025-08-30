import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import Modal from './Modal';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

type LoginFormValues = {
  email: string,
  password: string,
};

const LoginSchema = Yup.object({
  email: Yup.string().email('Email entered is not a valid email address').required('Email address is required'),
  password: Yup.string().min(6, 'Password is too short').required('Password is required'),
});

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

function Login() {

  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const [formMessage, setFormMessage] = useState<string>('');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);

  const toggleModal = () => { setIsMessageModalOpen(!isMessageModalOpen) };

  const loginUser = async (
    userInfo: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    toggleModal();
    try {
      const response = await axios.post(`${SERVER_URL}/api/auth/login`, {userInfo, captchaToken});
      login(response.data.user, response.data.accessToken);
      setFormMessage(response.data.message);
      setIsMessageModalOpen(true);
      actions.resetForm();

      if (response.data.user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setFormMessage(error.response?.data?.message);
        actions.resetForm();
        console.log(error);
      } else {
        setFormMessage("Sorry, an unexpected error occured");
      }
    } finally {
      actions.setSubmitting(false);
    }

  }

  return (
    <div className="w-full flex flex-col gap-6">
      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={(values, actions) => {
        console.log('Form submitted with values:', values);
        if (!captchaToken) {
          setFormMessage("Please complete the CAPTCHA");
          setIsMessageModalOpen(true);
          actions.setSubmitting(false);
          return;
        }
        loginUser(values, actions);
      }}>
        {({ isSubmitting }) => (
          <Form action="" className="flex flex-col gap-3 w-full-">
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-my-brown">Email</label>
              <Field name="email" type="email" id="email" className="rounded-full shadow-sm py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
              <ErrorMessage name="email" component="div" className="text-orange-600 text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-my-brown">Password</label>
              <Field name="password" type="password" id="password" className="rounded-full shadow-sm py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
              <ErrorMessage name="password" component="div" className="text-orange-600 text-sm" />
            </div>
            <div className="flex justify-center mt-2 mb-4">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>
            <button type="submit" className="text-my-white bg-light-wood py-2 min-w-28 px-4 hover:cursor-pointer hover:bg-my-brown rounded-full">Login</button>
            <div>
              <p className="hover:text-my-gray/50 cursor-pointer text-my-brown">Forgot Password?</p>
            </div>
            {isMessageModalOpen ? <Modal onClose={toggleModal} message={formMessage} isSubmitting={isSubmitting} /> : null}
          </Form>
        )}

      </Formik>
    </div>
  )
}

export default Login