import { useState } from "react";
import { User, Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import {useAuth} from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
const {register} = useAuth();
const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
         const success=   await register(email,name, password);
         if (success)
         {
            navigate("/login");
         }
        } catch (error) {
            console.error("Registration failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const inputFields = [
        {
            id: "name",
            label: "Full Name",
            type: "text",
            value: name,
            setValue: setName,
            icon: User,
            placeholder: "Enter your full name"
        },
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
            type: "password",
            value: password,
            setValue: setPassword,
            icon: Lock,
            placeholder: "Create a password"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
            </div>

            {/* Main form container */}
            <div className="relative w-full max-w-md">
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
                            <Sparkles className="w-8 h-8 text-white animate-pulse" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
                        <p className="text-purple-200 text-sm">Join us and start your journey</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {inputFields.map((field, index) => {
                            const Icon = field.icon;
                            const isFocused = focusedField === field.id;
                            const hasValue = field.value.length > 0;
                            
                            return (
                                <div key={field.id} className="relative group">
                                    <div className={`relative transition-all duration-300 ${
                                        isFocused ? 'transform scale-105' : ''
                                    }`}>
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                                        <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300">
                                            <div className="flex items-center p-4">
                                                <Icon className={`w-5 h-5 mr-3 transition-all duration-300 ${
                                                    isFocused || hasValue 
                                                        ? 'text-purple-300' 
                                                        : 'text-gray-400'
                                                }`} />
                                                <div className="flex-1">
                                                    <label 
                                                        htmlFor={field.id}
                                                        className={`absolute transition-all duration-300 pointer-events-none ${
                                                            isFocused || hasValue
                                                                ? '-translate-y-6 text-xs text-purple-300'
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
                                                        className="w-full bg-transparent text-white placeholder-purple-300/50 outline-none pt-4"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            <div className="flex items-center justify-center space-x-2">
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </div>
                            
                            {/* Button glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity -z-10"></div>
                        </button>

                        {/* Footer */}
                        <div className="text-center pt-4">
                            <p className="text-purple-200 text-sm">
                                Already have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="text-pink-300 hover:text-pink-200 font-medium underline underline-offset-2 hover:underline-offset-4 transition-all"
                                >
                                    Sign in
                                </button>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-purple-500/20 rounded-full blur animate-bounce delay-300"></div>
                <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-pink-500/20 rounded-full blur animate-bounce delay-700"></div>
            </div>
        </div>
    );
};

export default Register;