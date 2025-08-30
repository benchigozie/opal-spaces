import { Formik, Form, Field, ErrorMessage } from 'formik';
import type { FormikHelpers } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import Modal from './Modal';
import ReCAPTCHA from "react-google-recaptcha";

type SignupFormValues = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirmPassword: string,
};

const SignupSchema = Yup.object({
  firstName: Yup.string().min(2, 'First name is too short').required('First name is required'),
  lastName: Yup.string().min(2, 'Last name is too short').required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email address is required'),
  password: Yup.string().min(6, 'Password is too short').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('You have to confirm your Password'),
});

const initialValues: SignupFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function SignUp() {

  const [formMessage, setFormMessage] = useState<string>('');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState<boolean>(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const toggleModal = () => { setIsMessageModalOpen(!isMessageModalOpen) };
  const registerUser = async (
    userInfo: SignupFormValues,
    actions: FormikHelpers<SignupFormValues>
  ) => {
    toggleModal();
    try {
      const response = await axios.post(`${SERVER_URL}/api/auth/register`, {userInfo, captchaToken});
      console.log(response.data);
      setFormMessage(response.data.message);
      actions.resetForm();
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
    <div className="w-full">
      <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={(values, actions) => {
        if (!captchaToken) {
          setFormMessage("Please complete the CAPTCHA");
          setIsMessageModalOpen(true);
          actions.setSubmitting(false);
          return;
        }
        registerUser(values, actions);
      }}>
        {({ isSubmitting }) => (
          <Form action="" className="flex flex-col gap-3 w-full">
            <div className="flex flex-col gap-1">
              <label htmlFor="first-name" className="text-my-brown">First Name</label>
              <Field name="firstName" type="text" id="first-name" className="rounded-full shadow-sm py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
              <ErrorMessage name="firstName" component="div" className="text-orange-600 text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="last-name" className="text-my-brown">Last Name</label>
              <Field name="lastName" type="text" id="last-name" className="rounded-full shadow-sm py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
              <ErrorMessage name="lastName" component="div" className="text-orange-600 text-sm" />
            </div>
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
            <div className="flex flex-col gap-1">
              <label htmlFor="confirm-password" className="text-my-brown">Confirm password</label>
              <Field name="confirmPassword" type="password" id="confirm-password" className="rounded-full shadow-sm py-2 px-4 outline-light-wood/20 focus:outline-light-wood outline-1 caret-light-wood text-my-brown" />
              <ErrorMessage name="confirmPassword" component="div" className="text-orange-600 text-sm" />
            </div>
            <div className="flex justify-center mt-2 mb-4">
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onChange={(token) => setCaptchaToken(token)}
              />
            </div>
            <button type="submit" className="text-my-white bg-light-wood py-2 min-w-28 px-4 hover:cursor-pointer hover:bg-my-brown rounded-full">Create Account</button>
            {isMessageModalOpen ? <Modal onClose={toggleModal} message={formMessage} isSubmitting={isSubmitting}/> : null}
          </Form>
        )}
      </Formik>
    </div>

  )
}

export default SignUp