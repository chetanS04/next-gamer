'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { login } from '../../../../utils/auth';
import { useAuth } from '../../../context/AuthContext';
import { useLoader } from '@/context/LoaderContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { AxiosError } from 'axios';
import Link from 'next/link';





// ✅ Validation schema using Yup
const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

interface LoginFormData {
  email: string;
  password: string;
}


export default function LoginPage() {
  const router = useRouter();
  const { showLoader, hideLoader } = useLoader()
  const { user, setUserDirectly ,loading} = useAuth();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // useEffect(() => {
  //   if (user) {
  //     router.replace('/');
  //   }
  // }, [user, router]);



useEffect(() => {
  if (!loading && user) {
    router.replace('/');
  }
}, [user, loading, router]);


  const onSubmit = async (data:LoginFormData) => {
    setError('');
    showLoader()
    try {
      // await axios.get('/sanctum/csrf-cookie');
      const res = await login(data.email, data.password);
      const user = res.user;

      localStorage.setItem('user', JSON.stringify(user));
      setUserDirectly(user);

      // Redirect based on role
      if (user.role === 'Admin') {
        router.push('/dashboard');
      } else if (user.role === 'Buyer') {
        router.push('/buyer-dashboard');
      } else if (user.role === 'Seller') {
        router.push('/seller-dashboard');
      } else {
        setError('Invalid role');
      }
    }catch (err) {
  const error = err as AxiosError<{ message?: string }>;
  setError(error.response?.data?.message || "Login failed");
}finally {
      hideLoader()
    }
  };

  return (
    <>
      <header className="px-6 py-4">
<Link href="/" className="text-2xl font-bold text-green-600">Gaming</Link>

      </header> 

      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="w-full max-w-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
          <p className="text-sm text-center text-gray-500 mb-6">Login to your account</p>

          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                {...register('email')}
                placeholder="Email"
                className={`w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-green-500'
                  }`}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message as string}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                {...register('password')}
                placeholder="Password"
                className={`w-full border px-4 py-2 rounded-xl focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 ring-red-300' : 'border-gray-300 focus:ring-green-500'
                  }`}
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message as string}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded w-full disabled:opacity-50"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Do not have an account?{' '}
           <Link href="/register" className="text-blue-600 font-semibold hover:underline">
  Sign Up
</Link>
          </p>
        </div>
      </div>
    </>
  );
}
