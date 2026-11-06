import axios from "axios";
import type { PostType } from "../../Types/Posts.Type";
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import PostCreation from './../../components/PostCreation/PostCreation';
import {Helmet} from "react-helmet";



export default function Home() {
  const navigate = useNavigate()
  function getallPosts() {
    return axios.get(`https://route-posts.routemisr.com/posts?sort=-createdAt`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getallPosts"],
    queryFn: getallPosts,
  });
  if (isLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  if (isError) {
    return (
      <>
        <p>{error.message}</p>
      </>
    );
  }
console.log(data?.data.data.posts[0]);
  return (
    <>

    <Helmet>
      <title>Home | Rout Posts</title>
    </Helmet>
      <div className="mx-auto max-w-7xl px-3 py-3.5">
        <main className="min-w-0">
          <div className="grid gap-4 xl:grid-cols-[240px_minmax(0,1fr)_300px]">
            <aside className="hidden h-fit space-y-3 xl:sticky xl:top-[84px] xl:block">
              <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
                <button onClick={()=> {
                  navigate("/")
                }}  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition bg-[#e7f3ff] text-[#1877f2]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-newspaper"
                    aria-hidden="true"
                  >
                    <path d="M15 18h-5" />
                    <path d="M18 14h-8" />
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
                    <rect width={8} height={4} x={10} y={6} rx={1} />
                  </svg>
                  Feed
                </button>
                <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition text-slate-700 hover:bg-slate-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-sparkles"
                    aria-hidden="true"
                  >
                    <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                    <path d="M20 2v4" />
                    <path d="M22 4h-4" />
                    <circle cx={4} cy={20} r={2} />
                  </svg>
                  My Posts
                </button>
                <button onClick={()=> {
                  navigate("/")
                }} className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition text-slate-700 hover:bg-slate-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-earth"
                    aria-hidden="true"
                  >
                    <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                    <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                    <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                    <circle cx={12} cy={12} r={10} />
                  </svg>
                  Community
                </button>
                <button className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-bold transition text-slate-700 hover:bg-slate-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bookmark"
                    aria-hidden="true"
                  >
                    <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
                  </svg>
                  Saved
                </button>
              </div>
            </aside>
            <section className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm xl:hidden">
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={()=> {
                  navigate("/")
                }} className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition bg-[#e7f3ff] text-[#1877f2]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-newspaper"
                      aria-hidden="true"
                    >
                      <path d="M15 18h-5" />
                      <path d="M18 14h-8" />
                      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
                      <rect width={8} height={4} x={10} y={6} rx={1} />
                    </svg>
                    Feed
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition bg-slate-50 text-slate-700 hover:bg-slate-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-sparkles"
                      aria-hidden="true"
                    >
                      <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
                      <path d="M20 2v4" />
                      <path d="M22 4h-4" />
                      <circle cx={4} cy={20} r={2} />
                    </svg>
                    My Posts
                  </button>
                  <button onClick={()=> {
                  navigate("/")
                }} className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition bg-slate-50 text-slate-700 hover:bg-slate-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-earth"
                      aria-hidden="true"
                    >
                      <path d="M21.54 15H17a2 2 0 0 0-2 2v4.54" />
                      <path d="M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17" />
                      <path d="M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05" />
                      <circle cx={12} cy={12} r={10} />
                    </svg>
                    Community
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition bg-slate-50 text-slate-700 hover:bg-slate-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={16}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-bookmark"
                      aria-hidden="true"
                    >
                      <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z" />
                    </svg>
                    Saved
                  </button>
                </div>
              </div>
              <div className="space-y-3 xl:hidden">
                <button
                  type="button"
                  className="inline-flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left shadow-sm"
                >
                  <span className="inline-flex items-center gap-2 text-sm font-extrabold text-slate-900">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={17}
                      height={17}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users text-[#1877f2]"
                      aria-hidden="true"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <circle cx={9} cy={7} r={4} />
                    </svg>
                    Suggested Friends
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                      5
                    </span>
                    <span className="text-xs font-bold text-[#1877f2]">
                      Show
                    </span>
                  </span>
                </button>
              </div>
              
<PostCreation />


              <div className="space-y-4">
               <div className="my-8">
        {data?.data.data.posts.map((post: PostType) => (
          <Post post={post} key={post._id} isPostDetails={false} />
        ))}
      </div>
              </div>
            </section>
            <aside className="hidden h-fit xl:sticky xl:top-[84px] xl:block">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
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
                      className="lucide lucide-users text-[#1877f2]"
                      aria-hidden="true"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <circle cx={9} cy={7} r={4} />
                    </svg>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Suggested Friends
                    </h3>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600">
                    5
                  </span>
                </div>
                <div className="mb-3">
                  <label className="relative block">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={15}
                      height={15}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      aria-hidden="true"
                    >
                      <path d="m21 21-4.34-4.34" />
                      <circle cx={11} cy={11} r={8} />
                    </svg>
                    <input
                      placeholder="Search friends..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white"
                      defaultValue=""
                    />
                  </label>
                </div>
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-200 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                      >
                        <img
                          alt="Ahmed Abd Al-Muti"
                          className="h-10 w-10 rounded-full object-cover"
                          src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1775310477363-9f97d1ff-699a-4b66-a04f-bd6dee14d2b7-496835614_1859398661547861_5183785968671576388_n.webp"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                            Ahmed Abd Al-Muti
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            @ahmedmutti
                          </p>
                        </div>
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={13}
                          height={13}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-user-plus"
                          aria-hidden="true"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx={9} cy={7} r={4} />
                          <line x1={19} x2={19} y1={8} y2={14} />
                          <line x1={22} x2={16} y1={11} y2={11} />
                        </svg>
                        Follow
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5">
                        467 followers
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                      >
                        <img
                          alt="Alaa Ashraf "
                          className="h-10 w-10 rounded-full object-cover"
                          src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1775412292104-abcb6dbf-b0cd-4392-8084-3dc4d79abf8d-profile.webp"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                            Alaa Ashraf{" "}
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            @alaaashraf
                          </p>
                        </div>
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={13}
                          height={13}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-user-plus"
                          aria-hidden="true"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx={9} cy={7} r={4} />
                          <line x1={19} x2={19} y1={8} y2={14} />
                          <line x1={22} x2={16} y1={11} y2={11} />
                        </svg>
                        Follow
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5">
                        384 followers
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                      >
                        <img
                          alt="MrMo"
                          className="h-10 w-10 rounded-full object-cover"
                          src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linked-posts/1778937681231-9d4544cb-667c-4af2-95fe-78ac83b54f55-profile.webp"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                            MrMo
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            @mrmo
                          </p>
                        </div>
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={13}
                          height={13}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-user-plus"
                          aria-hidden="true"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx={9} cy={7} r={4} />
                          <line x1={19} x2={19} y1={8} y2={14} />
                          <line x1={22} x2={16} y1={11} y2={11} />
                        </svg>
                        Follow
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5">
                        306 followers
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                      >
                        <img
                          alt="menna"
                          className="h-10 w-10 rounded-full object-cover"
                          src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                            menna
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            @gbngssssb
                          </p>
                        </div>
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={13}
                          height={13}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-user-plus"
                          aria-hidden="true"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx={9} cy={7} r={4} />
                          <line x1={19} x2={19} y1={8} y2={14} />
                          <line x1={22} x2={16} y1={11} y2={11} />
                        </svg>
                        Follow
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5">
                        241 followers
                      </span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <button
                        type="button"
                        className="flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50"
                      >
                        <img
                          alt="abdalla diaa"
                          className="h-10 w-10 rounded-full object-cover"
                          src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/1776007886436-57b1a765-2eec-4b09-9f80-6fa91a44ca94-qDEuDVfUSjCOIqgqwpn0pA.webp"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-slate-900 hover:underline">
                            abdalla diaa
                          </p>
                          <p className="truncate text-xs text-slate-500">
                            @abdalla_diaa
                          </p>
                        </div>
                      </button>
                      <button className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={13}
                          height={13}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-user-plus"
                          aria-hidden="true"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                          <circle cx={9} cy={7} r={4} />
                          <line x1={19} x2={19} y1={8} y2={14} />
                          <line x1={22} x2={16} y1={11} y2={11} />
                        </svg>
                        Follow
                      </button>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-slate-500">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5">
                        236 followers
                      </span>
                    </div>
                  </div>
                </div>
                <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100">
                  View more
                </button>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}
