import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Form, Formik } from "formik";
import { apiPost } from "../service";

const Login = () =>{
    const navigate = useNavigate();
    const {user, setUser} = useUserContext();
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-144px)]">
          <div className="container px-5 md:px-10 xl:px-14 mx-auto">
            <div className="sm:mx-auto w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto w-full sm:max-w-sm">
              <Formik
                initialValues={{ email: "", password: "" }}
                validate={(values) => {
                  const errors: {
                    email?: string;
                    password?: string;
                  } = {};
                  if (!values.email) {
                    errors.email = "Required";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = "Invalid email address";
                  }
    
                  if (!values.password) {
                    errors.password = "Required";
                  } 
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  const response = await apiPost("/api/users/login",values);
                  if (response.success) {
                    // window.localStorage.setItem('token', (response.data as {token: string}).token)
                    localStorage.setItem('token', response.data.token as string);
                    console.log(response.data);
                    setUser(response.data.user);
                    navigate("/");
                  } else {
                    // toast.error(response.message);
                  }
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <Form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="flex justify-between items-end text-sm font-medium leading-6 text-gray-900"
                      >
                        <span>Email address</span>
                        <span className="text-red-500 text-xs">
                          {errors.email && touched.email && errors.email}
                        </span>
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.email}
                          className="input-field"
                        />
                      </div>
                    </div>
    
                    <div>
                      <label
                        htmlFor="password"
                        className="flex justify-between items-end text-sm font-medium leading-6 text-gray-900"
                      >
                        <span>Password</span>
                        <span className="text-red-500 text-xs">
                          {errors.password && touched.password && errors.password}
                        </span>
                      </label>
                      <div className="mt-2">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          className="input-field"
                        />
                      </div>
                    </div>
    
                    <div>
                      <button type="submit" disabled={isSubmitting} className="btn">
                        Sign in
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?{" "}
                <Link
                  to="/register"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </div>
      );

}

export default Login;