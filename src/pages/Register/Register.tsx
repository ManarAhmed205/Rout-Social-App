import { zodResolver } from "@hookform/resolvers/zod";
import  { useState } from "react";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type registerSchemaType,
} from "../../Schemas/auth.Schema";
import axios from "axios";
import {  NavLink, useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';

export default function Register() {
  const navigate = useNavigate();
  const [, setapiError] = useState<string | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      dateOfBirth: "",
      gender: "female",
      password: "",
      rePassword: "",
    },
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = form;
  function handelRegister(values: registerSchemaType) {
    setisLoading(true);
    axios
      .post("https://route-posts.routemisr.com/users/signup", values)
      .then((res) => {
        alert(res.data.message);

        navigate("/login");
      })
      .catch((err) => {
        setapiError(err.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setisLoading(false);
      });
  }

  return (
    <>
    <Helmet>
                  <title>Register | Rout Posts</title>
                </Helmet>
      <div
        className="min-h-screen bg-[#f0f2f5] px-4 py-8 sm:py-12 lg:flex lg:items-center"
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">
          <section className="order-2 w-full max-w-xl text-center lg:order-1 lg:text-left">
            <h1 className="hidden text-5xl font-extrabold tracking-tight text-[#00298d] sm:text-6xl lg:block">
              Route Posts
            </h1>
            <p className="hidden mt-4 text-2xl font-medium leading-snug text-slate-800 lg:block">
              Connect with friends and the world around you on Route Posts.
            </p>
            <div className="mt-6 rounded-2xl border border-[#c9d5ff] bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5">
              <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#00298d]">
                About Route Academy
              </p>
              <p className="mt-1 text-lg font-bold text-slate-900">
                Egypt's Leading IT Training Center Since 2012
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                Route Academy is the premier IT training center in Egypt,
                established in 2012. We specialize in delivering high-quality
                training courses in programming, web development, and
                application development. We've identified the unique challenges
                people may face when learning new technology and made efforts to
                provide strategies to overcome them.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                  <p className="text-base font-extrabold text-[#00298d]">
                    2012
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    Founded
                  </p>
                </div>
                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                  <p className="text-base font-extrabold text-[#00298d]">
                    40K+
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    Graduates
                  </p>
                </div>
                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                  <p className="text-base font-extrabold text-[#00298d]">50+</p>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    Partner Companies
                  </p>
                </div>
                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                  <p className="text-base font-extrabold text-[#00298d]">5</p>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    Branches
                  </p>
                </div>
                <div className="rounded-xl border border-[#c9d5ff] bg-[#f2f6ff] px-3 py-2">
                  <p className="text-base font-extrabold text-[#00298d]">20</p>
                  <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                    Diplomas Available
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="order-1 w-full max-w-[430px] lg:order-2">
            <div className="rounded-2xl bg-white p-4 sm:p-6">
              <div className="mb-4 text-center lg:hidden">
                <h1 className="text-3xl font-extrabold tracking-tight text-[#00298d]">
                  Route Posts
                </h1>
                <p className="mt-1 text-base font-medium leading-snug text-slate-700">
                  Connect with friends and the world around you on Route Posts.
                </p>
              </div>
              <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
  <NavLink
    to="/login"
    className={({ isActive }) =>
      `rounded-lg py-2 text-center text-sm font-extrabold transition ${
        isActive
          ? "bg-white text-[#00298d] shadow-sm"
          : "text-slate-600 hover:text-slate-800"
      }`
    }
  >
    Login
  </NavLink>

  <NavLink
    to="/register"
    className={({ isActive }) =>
      `rounded-lg py-2 text-center text-sm font-extrabold transition ${
        isActive
          ? "bg-white text-[#00298d] shadow-sm"
          : "text-slate-600 hover:text-slate-800"
      }`
    }
  >
    Register
  </NavLink>
</div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Create a new account
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                It is quick and easy.
              </p>
              <form onSubmit={handleSubmit(handelRegister , (errors)=>console.log("validation error" , errors))} noValidate className="mt-5 space-y-3.5">
                <div>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-user"
                        aria-hidden="true"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx={12} cy={7} r={4} />
                      </svg>
                    </span>
                    <input
                      placeholder="Full name"
                      className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                      type="text"
                      {...register("name")}
                      name="name"
                    />
                     {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-at-sign"
                        aria-hidden="true"
                      >
                        <circle cx={12} cy={12} r={4} />
                        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                      </svg>
                    </span>
                    <input
                      placeholder="Username (optional)"
                      className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                      type="text"
                      name="username"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-at-sign"
                        aria-hidden="true"
                      >
                        <circle cx={12} cy={12} r={4} />
                        <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8" />
                      </svg>
                    </span>
                    <input
                      placeholder="Email address"
                      className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                      type="email"
                      
                      {...register("email")}
                    />
                     {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <circle cx={9} cy={7} r={4} />
                    </svg>
                    <select
                      
                       {...register("gender")}
                      className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                    >
                      
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-calendar"
                        aria-hidden="true"
                      >
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <rect width={18} height={18} x={3} y={4} rx={2} />
                        <path d="M3 10h18" />
                      </svg>
                    </span>
                    <input
                      placeholder="Date of birth"
                      className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                      type="date"
                       {...register("dateOfBirth")}
                      name="dateOfBirth"
                    />
                     {errors.dateOfBirth && (
            <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
          )}
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-key-round"
                        aria-hidden="true"
                      >
                        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                      </svg>
                    </span>
                    <input
                      placeholder="Password"
                      className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                      type="password"
                      {...register("password")}
                      name="password"
                      
                    />
                     {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={18}
                        height={18}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-key-round"
                        aria-hidden="true"
                      >
                        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
                      </svg>
                    </span>
                    <input
                      placeholder="Confirm password"
                      className="w-full rounded-xl border bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white border-slate-200 focus:border-[#00298d]"
                      type="password"
                      {...register("rePassword")}
                      name="rePassword"
                    />
                     {errors.rePassword && (
            <p className="text-red-500 text-sm">{errors.rePassword.message}</p>
          )}
                  </div>
                </div>
                <button type="submit"  disabled={isLoading}  className="w-full rounded-xl py-3 text-base font-extrabold text-white transition disabled:opacity-60 bg-[#00298d] hover:bg-[#001f6b]">
                   {isLoading ? "Please Wait ..." : "Create New Account"}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
