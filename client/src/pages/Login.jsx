import { use, useState } from "react";
import { Mail, Lock, LogIn, Eye, EyeOff, Shield } from "lucide-react";
import {useAuth} from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

 const {login}=useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
           await login(email, password);
         
            navigate("/dashboard");
            console.log("Login successful!");
            toast.success("Login successful! Redirecting to dashboard...");
         
        
         
          
        } catch (error) {
            console.error("Login failed:", error);
              console.error("Login failed:", error);
  if (error.response?.data?.message) {
    console.error("Backend message:", error.response.data.message);
  }
            setError("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const inputFields = [
        {
            id: "email",
            label: "Email Address",
            type: "email",
            value: email,
            setValue: setEmail,
            icon: Mail,
            placeholder: "Enter your email"
        },
        {
            id: "password",
            label: "Password",
            type: showPassword ? "text" : "password",
            value: password,
            setValue: setPassword,
            icon: Lock,
            placeholder: "Enter your password",
            hasToggle: true
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse delay-500"></div>
            </div>

         
            <div className="relative w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
               
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-blue-200 text-sm">Sign in to your account</p>
                    </div>

                 
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm">
                            <p className="text-red-200 text-sm text-center">{error}</p>
                        </div>
                    )}

            
                    <div className="space-y-6">
                        {inputFields.map((field, index) => {
                            const Icon = field.icon;
                            const isFocused = focusedField === field.id;
                            const hasValue = field.value.length > 0;
                            
                            return (
                                <div key={field.id} className="relative group">
                                    <div className={`relative transition-all duration-300 ${
                                        isFocused ? 'transform scale-105' : ''
                                    }`}>
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                        <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                                            <div className="flex items-center p-4">
                                                <Icon className={`w-5 h-5 mr-3 transition-all duration-300 ${
                                                    isFocused || hasValue 
                                                        ? 'text-blue-300' 
                                                        : 'text-gray-400'
                                                }`} />
                                                <div className="flex-1 relative">
                                                    <label 
                                                        htmlFor={field.id}
                                                        className={`absolute transition-all duration-300 pointer-events-none ${
                                                            isFocused || hasValue
                                                                ? '-translate-y-6 text-xs text-blue-300'
                                                                : 'text-sm text-gray-300'
                                                        }`}
                                                    >
                                                        {field.label}
                                                    </label>
                                                    <input
                                                        type={field.type}
                                                        id={field.id}
                                                        value={field.value}
                                                        onChange={(e) => field.setValue(e.target.value)}
                                                        onFocus={() => setFocusedField(field.id)}
                                                        onBlur={() => setFocusedField(null)}
                                                        placeholder={isFocused ? field.placeholder : ""}
                                                        required
                                                        className="w-full bg-transparent text-white placeholder-blue-300/50 outline-none pt-4 pr-10"
                                                    />
                                                </div>
                                                {field.hasToggle && (
                                                    <button
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-300 transition-colors"
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="w-5 h-5" />
                                                        ) : (
                                                            <Eye className="w-5 h-5" />
                                                        )}
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                     
                        <div className="text-right">
                            <button
                                type="button"
                                className="text-blue-300 hover:text-blue-200 text-sm font-medium underline underline-offset-2 hover:underline-offset-4 transition-all"
                            >
                                Forgot password?
                            </button>
                        </div>

                 
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="group relative w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <div className="flex items-center justify-center space-x-2">
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Signing In...</span>
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-5 h-5" />
                                        <span>Sign In</span>
                                    </>
                                )}
                            </div>
                            
                         
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity -z-10"></div>
                        </button>

             
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-gray-300">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                  
                        <div className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                            >
                                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                            </button>
                            <button
                                type="button"
                                className="flex items-center justify-center px-4 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                            >
                                <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                </svg>
                            </button>
                        </div>

                 
                        <div className="text-center pt-6">
                            <p className="text-blue-200 text-sm">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    className="text-indigo-300 hover:text-indigo-200 font-medium underline underline-offset-2 hover:underline-offset-4 transition-all"
                                >
                                    Create one
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

           
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500/20 rounded-full blur animate-bounce delay-300"></div>
                <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-indigo-500/20 rounded-full blur animate-bounce delay-700"></div>
                <div className="absolute top-1/2 -right-8 w-6 h-6 bg-cyan-500/20 rounded-full blur animate-bounce delay-1000"></div>
            </div>

        </div>
    );
};

export default Login;