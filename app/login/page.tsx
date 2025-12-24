'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setAdminSession } from '@/app/actions/auth';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const success = await setAdminSession(password);
            if (success) {
                router.push('/admin/dashboard');
            } else {
                setError('Invalid password');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display min-h-screen flex flex-col items-center justify-center selection:bg-primary selection:text-background-dark">
            <div className="w-full max-w-md flex-grow flex flex-col justify-between p-6 relative z-10">
                {/* Header / Logo Area */}
                <div className="flex flex-col items-center w-full mt-8 mb-6">
                    {/* Hero Visual */}
                    <div className="w-full aspect-[2/1] rounded-2xl overflow-hidden relative mb-6 shadow-xl group">
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBtQKfv65xs-vylaJLheyJ5yJtqcfsdlJPFv-Ar7J7Y8utdFJ4rOc7y9hjql14d-ibMOlB-hHPrv1Tku9ishnUSRxqLTyODlz_mNli9KvfqEvXgC9wIuy2vO9cdT4fiEG58WYgoTuf8cUjQvw2SC3YcjOwzM9PXss_xzoxgyL5lPcLbcGriJhVLeTWhV33w5_5dWFcqaWxQAh3mZIFpOc9odAgQD9_0KSN2dKh0D4BRc5_XuAyoAX-mO1_KX_9QzN1_iDptwJvD359U")' }}
                        >
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
                        <div className="absolute bottom-4 left-5">
                            <h1 className="text-white text-2xl font-bold tracking-tight">HWest Florist</h1>
                            <p className="text-primary text-sm font-medium">Enterprise Portal</p>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white tracking-tight">Welcome Back</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm text-center mt-1">Please enter your details to access the dashboard.</p>
                </div>

                {/* Login Form Container */}
                <div className="w-full flex flex-col gap-5">
                    {/* Role Selector (Visual Only for now) */}
                    <div className="flex p-1 bg-slate-200 dark:bg-surface-dark rounded-xl">
                        <label className="flex-1 cursor-pointer">
                            <input className="peer sr-only" name="role" type="radio" value="admin" defaultChecked />
                            <div className="py-2 px-4 rounded-lg text-center text-sm font-semibold text-slate-500 dark:text-slate-400 peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-slate-900 dark:peer-checked:text-white peer-checked:shadow-sm transition-all duration-200">
                                Admin
                            </div>
                        </label>
                        <label className="flex-1 cursor-pointer">
                            <input className="peer sr-only" name="role" type="radio" value="staff" />
                            <div className="py-2 px-4 rounded-lg text-center text-sm font-semibold text-slate-500 dark:text-slate-400 peer-checked:bg-white dark:peer-checked:bg-slate-700 peer-checked:text-slate-900 dark:peer-checked:text-white peer-checked:shadow-sm transition-all duration-200">
                                Staff
                            </div>
                        </label>
                    </div>

                    {/* Inputs */}
                    <form onSubmit={handleLogin} className="flex flex-col gap-4">
                        {/* Email Field (Visual) */}
                        <div className="group">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 ml-1">Email Address</label>
                            <div className="relative flex items-center">
                                <input
                                    className="w-full h-12 pl-4 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                                    placeholder="Enter your work email"
                                    type="email"
                                    defaultValue="admin@hwest.com"
                                />
                                <span className="material-symbols-outlined absolute right-4 text-slate-400 group-focus-within:text-primary transition-colors">mail</span>
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="group">
                            <div className="flex justify-between items-center mb-1.5 ml-1">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                            </div>
                            <div className="relative flex items-center">
                                <input
                                    className="w-full h-12 pl-4 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-surface-light dark:bg-surface-dark text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary transition-all outline-none"
                                    placeholder="Enter admin password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button className="absolute right-3 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 group-focus-within:text-primary transition-colors flex items-center justify-center" type="button">
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password & Sign In */}
                        <div className="flex justify-end mt-1">
                            <a className="text-sm font-semibold text-primary hover:text-green-400 transition-colors" href="#">Forgot Password?</a>
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <button
                            disabled={isLoading}
                            className="mt-2 w-full h-14 bg-primary hover:bg-[#0fd650] text-background-dark text-lg font-bold rounded-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                            type="submit"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : "Log In"}
                        </button>
                    </form>

                    {/* Biometric / Alternative */}
                    <div className="flex flex-col items-center gap-4 mt-4">
                        <div className="flex items-center w-full gap-4">
                            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                            <span className="text-xs uppercase tracking-widest text-slate-400 font-medium">Or login with</span>
                            <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                        </div>
                        <button className="w-14 h-14 rounded-full border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center hover:border-primary hover:bg-primary/10 dark:hover:bg-primary/20 transition-all group">
                            <span className="material-symbols-outlined text-3xl text-slate-600 dark:text-slate-300 group-hover:text-primary transition-colors">face</span>
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <footer className="w-full py-6 mt-4 flex justify-center">
                    <p className="text-xs text-slate-400 font-medium">Version 1.0.2 | Enterprise Edition</p>
                </footer>
            </div>

            {/* Background Pattern Decoration */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-10">
                <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-primary/20 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[80px] rounded-full"></div>
            </div>
        </div>
    );
}
