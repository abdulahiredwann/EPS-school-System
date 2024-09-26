import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import AdminLoginService from "../../Services/adminLoginService";
import toast, { Toaster } from "react-hot-toast";
import Logo from "../../../public/EPS.png";
import { useState } from "react";

const schema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be more than 5 characters." })
    .max(100),
  password: z
    .string()
    .min(6, { message: "Password must be more than 6 characters." })
    .max(100),
});

type LoginFormData = z.infer<typeof schema>;

function AdminLogin() {
  const [isloading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const {
    reset,
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const run = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      await AdminLoginService(data);
      navigate("/admin");
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.response?.data || error.message || "Something Wrong"); // Handle error response safely      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster></Toaster>
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <div className="flex justify-center mb-6">
            <img src={Logo} alt="School Logo" className="h-16" />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Admin Login
          </h2>
          <form
            onSubmit={handleSubmit((data) => {
              run(data);
              console.log(data);
              reset();
            })}
          >
            {/* Username Field */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 font-medium mb-2"
              >
                Username
              </label>
              <input
                {...register("username")}
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                required
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isloading}
              className={`w-full bg-blue-500 text-white py-2 rounded-md transition duration-200 ${
                isloading
                  ? "cursor-not-allowed opacity-70"
                  : "hover:bg-blue-600"
              }`}
            >
              {isloading ? (
                <span className="loading loading-infinity loading-lg"></span>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
