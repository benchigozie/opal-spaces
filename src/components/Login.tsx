import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

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

  const loginUser = async (userInfo: LoginFormValues) => {

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', userInfo);
      console.log('User logged in:', response.data);
    } catch {
      console.error('Login failed. Please check your credentials and try again.');
    }

  }

  return (
    <div className="w-full flex flex-col gap-6">
      <Formik initialValues={initialValues} validationSchema={LoginSchema} onSubmit={(values) => {
        console.log('Form submitted with values:', values);
        loginUser(values);
      }}>
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
          <button type="submit" className="text-my-white bg-light-wood py-2 min-w-28 px-4 hover:cursor-pointer hover:bg-my-brown">Create Account</button>
          <div>
            <p className="hover:text-my-gray/50 cursor-pointer text-my-brown">Forgot Password?</p>
          </div>
        </Form>
      </Formik>
    </div>
  )
}

export default Login