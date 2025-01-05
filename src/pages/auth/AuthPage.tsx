import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { signin, signup } from '@/services/auth/auth.service';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { StorageUtils } from '@/utils';

import { toast } from 'react-toastify';

export type AuthFormDto = {
    fullName?: string;
    email: string;
    password: string;
};

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm<AuthFormDto>();

    const { mutate: signinMutate, isLoading: isSigninLoading } = useMutation(signin, {
        onSuccess: (data) => {
            const { body } = data;

            StorageUtils.setItem('accessToken', body?.tokens.accessToken);
            StorageUtils.setItem('refreshToken', body?.tokens.refreshToken);
            navigate('/attempts');
        },
        onError: (error: never) => {
            toast.error(error);
        },
    });

    const { mutate: signupMutate, isLoading: isSignupLoading } = useMutation(signup, {
        onSuccess: () => {
            reset();
            setIsLogin(true);
            toast.success("You've successfully signed up!");
        },
        onError: (error: never) => {
            toast.error(error);
        },
    });

    const onSubmit = (data: AuthFormDto) => {
        if (isLogin) {
            signinMutate({ email: data.email, password: data.password });
        } else {
            signupMutate({ email: data.email, password: data.password, fullName: data.fullName! });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        {isLogin ? 'Sign in to your account' : 'Sign up for a new account'}
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        {!isLogin && (
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    {...register('fullName')}
                                    type="text"
                                    placeholder="Full Name"
                                    className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>
                        )}

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                {...register('email')}
                                placeholder="Email address"
                                className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                {...register('password')}
                                type="password"
                                placeholder="Password"
                                className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSigninLoading || isSignupLoading}
                        className={`w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200 ${
                            (isSigninLoading || isSignupLoading) && 'opacity-50 cursor-not-allowed'
                        }`}
                    >
                        {isLogin
                            ? isSigninLoading
                                ? 'Signing In...'
                                : 'Sign In'
                            : isSignupLoading
                            ? 'Signing Up...'
                            : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center">
                    <button
                        onClick={() => {
                            reset();
                            setIsLogin(!isLogin);
                        }}
                        className="text-sm text-blue-600 hover:text-blue-500"
                    >
                        {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
