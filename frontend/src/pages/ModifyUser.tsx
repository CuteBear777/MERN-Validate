import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { Form, Formik } from 'formik';
import { apiPost } from '../service';
import { toast } from 'react-toastify';

const ModifyUser = () => {
    const { user} = useUserContext();

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-144px)]">
          <div className="container px-5 md:px-10 xl:px-14 mx-auto">
            <div className="sm:mx-auto w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Change your information
              </h2>
            </div>
            <div className="mt-10 sm:mx-auto w-full sm:max-w-sm">
              <Formik
                initialValues={{ username: "", email: "", password: "",  confirm: ""}}
                validate={(values) => {
                  const errors: {
                    username?: string;
                    email?: string;
                    password?: string;
                    confirm?: string;
                  } = {};

                  if (!values.username){
                    errors.username = "Required";
                  }

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
                  if (values.password !== values.confirm) {
                    errors.confirm = "Passwords do not match";
                  }
                if (!values.confirm) {
                    errors.confirm = "Required";
                  } 
                  return errors;
                }}
                onSubmit={async (values, { setSubmitting }) => {
                    const response = await apiPost(`/api/users/modify/${user?._id}`,values);
                    if (response.success) {
                        toast.success("Update Success! Your information changed.");
                        navigate("/login");
                      } else {
                        toast.error(response.message);
                      }
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
                        htmlFor="username"
                        className="flex justify-between items-end text-sm font-medium leading-6 text-gray-900"
                      >
                        <span>Your Name</span>
                        <span className="text-red-500 text-xs">
                          {errors.username && touched.username && errors.username}
                        </span>
                      </label>
                      <div className="mt-2">
                        <input
                          id="username"
                          name="username"
                          type="username"
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.username}
                          className="input-field"
                        />
                      </div>
                    </div>

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
                      <label
                        htmlFor="confirm"
                        className="flex justify-between items-end text-sm font-medium leading-6 text-gray-900"
                      >
                        <span>confirm</span>
                        <span className="text-red-500 text-xs">
                          {errors.confirm && touched.confirm && errors.confirm}
                        </span>
                      </label>
                      <div className="mt-2">
                        <input
                          id="confirm"
                          name="confirm"
                          type="password"
                          required
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirm}
                          className="input-field"
                        />
                      </div>
                    </div>
    
                    <div>
                      <button type="submit" disabled={isSubmitting} className="btn">
                        Change
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
    
              <p className="mt-10 text-center text-sm text-gray-500">
                <Link
                  to="/"
                  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  back!
                </Link>
              </p>
            </div>
          </div>
        </div>


    );
};

export default ModifyUser;