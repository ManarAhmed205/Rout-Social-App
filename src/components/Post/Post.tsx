import type {  PostType } from "../../Types/Posts.Type";
import TopComment from "../Comment/TopComment";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../Loader/Loader";
import CommentsSection from "../CommentsSection/CommentsSection";
import CommentCreation from './../CommentCreation/CommentCreation';
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useContext, useState } from 'react';
import { AuthContext } from "../Context/Auth.Context";
import { ImSpinner3 } from "react-icons/im";



export default function Post({
  post,
  isPostDetails = false,
}: {
  post: PostType;
  isPostDetails?: boolean;
}) {
  const navigate = useNavigate();
  const { body, user, createdAt, image, topComment, _id: id } = post;
  const { name, photo, username , _id} = user;
  const {userId : loginUserId} = useContext(AuthContext) 
  const [isOpen, setisOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false);
const [editedBody, setEditedBody] = useState(body);
  const query=useQueryClient()
 

  function getPostComments() {
    return axios.get(
      `https://route-posts.routemisr.com/posts/${id}/comments?page=1&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPostComments", id],
    queryFn: getPostComments,
    enabled: isPostDetails,
  });
  const comments = data?.data.data.comments;
  function handelDeletePost(){
    return axios.delete(`https://route-posts.routemisr.com/posts/${id}` , {
      headers : {Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    })
  }
  const { isPending , mutate}=useMutation({
    mutationFn : handelDeletePost ,
    onSuccess : ()=> {
      query.invalidateQueries({queryKey : ["getallPosts"]})
      navigate("/")
    },
    onError : () => {}
  })

function handleUpdatePost() {
  const formData = new FormData();
  formData.append("body", editedBody);

  return axios.put(`https://route-posts.routemisr.com/posts/${id}`, formData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
  });
}

const { isPending: isUpdating, mutate: updatePost } = useMutation({
  mutationFn: handleUpdatePost,
 onSuccess: async () => {
  setIsEditing(false);
  await Promise.all([
    query.invalidateQueries({ queryKey: ["getallPosts"] }),
    query.invalidateQueries({ queryKey: ["getUserPosts"] }),
    query.invalidateQueries({ queryKey: ["getPostDetails"] }), // غيّر الاسم لاسم الـ query عندك
  ]);
},
  onError: (err) => {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.status, err.response?.data);
    }
  },
});


  return (
    <>
      <article className="overflow-visible my-6  rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <Link className="shrink-0" to="/profile" data-discover="true">
              <img
                alt="SAiF ALI"
                className="h-11 w-11 rounded-full object-cover"
                src={photo}
              />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                className="truncate text-sm font-bold text-foreground hover:underline"
                to="/profile"
                data-discover="true"
              >
                {name}
              </Link>
              <div className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
                {username} ·{" "}
                <button
                  type="button"
                  className="rounded px-0.5 py-0.5 text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 hover:underline"
                >
                  {createdAt}
                </button>
                <span className="mx-1">·</span>
                <span className="inline-flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={11}
                    height={11}
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
                  Public
                </span>
              </div>
            </div>
            {/* three dots */}
            <div className="relative">
              {loginUserId === _id && <button onClick={()=> setisOpen(!isOpen)} className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
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
                  className="lucide lucide-ellipsis"
                  aria-hidden="true"
                >
                  <circle cx={12} cy={12} r={1} />
                  <circle cx={19} cy={12} r={1} />
                  <circle cx={5} cy={12} r={1} />
                </svg>
              </button>}
              
             {isOpen &&  <div className="bg-white p-2 rounded-lg absolute top-[120%] end-[0] shadow-2xl border-slate-400 border-2">
                <ul className="flex flex-col  gap-2">
                  <li><button  className="flex gap-2 items-center cursor-pointer bg-slate-100 p-2" onClick={() => {
      setEditedBody(body);
      setIsEditing(true);
      setisOpen(false);
    }}> Edit <FaPen /></button> </li>
                  
                  <li >
                    <button disabled={isPending} onClick={()=>mutate()} className="w-full disabled:bg-slate-500 disabled:cursor-not-allowed disabled:text-white flex gap-2 items-center cursor-pointer bg-slate-100 p-2">
                      {isPending ? <ImSpinner3 className="animate-spin flex justify-center items-center w-full  " /> : <>Delete <MdDelete /> </> }
                    </button>
                      </li>
                  

                </ul>
              </div>}
            </div>
          </div>
          <div className="mt-3">
  {isEditing ? (
    <div className="space-y-2">
      <textarea
        value={editedBody}
        onChange={(e) => setEditedBody(e.target.value)}
        rows={4}
        className="w-full resize-none rounded-xl border border-slate-300 bg-slate-50 p-3 text-sm outline-none focus:border-[#1877f2] focus:bg-white"
      />
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="rounded-lg bg-slate-100 px-4 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-200"
        >
          Cancel
        </button>
        <button
  type="button"
  onClick={() => updatePost()}
  disabled={!editedBody.trim() || isUpdating}
  className="rounded-lg bg-[#1877f2] px-4 py-1.5 text-sm font-bold text-white hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-50"
>
  {isUpdating ? "Saving..." : "Save"}
</button>
      </div>
    </div>
  ) : (
    <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
      {body}
    </p>
  )}
</div>
        </div>
        <div className="mx-4 my-3 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          <div className="p-3">
            <div className="mb-2 flex items-center gap-2">
              {image && (
                <img
                  alt="Tests"
                  className="h-9 w-9 rounded-full object-cover"
                  src={image}
                />
              )}

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-slate-900">
                  Tests
                </p>
                <p className="truncate text-xs text-slate-500">@testa</p>
              </div>
              <button className="ml-auto inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]">
                Original Post
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
                  className="lucide lucide-external-link"
                  aria-hidden="true"
                >
                  <path d="M15 3h6v6" />
                  <path d="M10 14 21 3" />
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-slate-500">
              Shared post content unavailable.
            </p>
          </div>
          <div className="border-t border-slate-200">
            <button
              type="button"
              className="group relative block w-full cursor-zoom-in"
            >
              <img
                alt="Shared post"
                className="max-h-[560px] w-full object-cover"
                src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linked-posts/1793073128867-ba29e1c1-c496-475b-bb95-c61be19f5874-photo_2026-09-17_23-54-12.webp"
              />
              <span className="pointer-events-none absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />
            </button>
          </div>
        </div>
        <div className="px-4 pb-2 pt-3 text-sm text-slate-500">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#1877f2] text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={12}
                  height={12}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-thumbs-up"
                  aria-hidden="true"
                >
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
                  <path d="M7 10v12" />
                </svg>
              </span>
              <button
                type="button"
                className="font-semibold transition cursor-default"
              >
                0 likes
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3 sm:text-sm">
              <span className="inline-flex items-center gap-1">
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
                  className="lucide lucide-repeat2 lucide-repeat-2"
                  aria-hidden="true"
                >
                  <path d="m2 9 3-3 3 3" />
                  <path d="M13 18H7a2 2 0 0 1-2-2V6" />
                  <path d="m22 15-3 3-3-3" />
                  <path d="M11 6h6a2 2 0 0 1 2 2v10" />
                </svg>
                0 shares
              </span>
              <span>1 comments</span>
              <button
                onClick={() => {
                  navigate(`postdetails/${id}`);
                }}
                className="rounded-md px-2 py-1 text-xs font-bold text-[#1877f2] hover:bg-[#e7f3ff]"
              >
                View details
              </button>
            </div>
          </div>
        </div>
        <div className="mx-4 border-t border-slate-200" />
        <div className="grid grid-cols-3 gap-1 p-1">
          <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
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
              className="lucide lucide-thumbs-up"
              aria-hidden="true"
            >
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
              <path d="M7 10v12" />
            </svg>
            <span>Like</span>
          </button>
          <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
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
              className="lucide lucide-message-circle"
              aria-hidden="true"
            >
              <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
            </svg>
            <span>Comment</span>
          </button>
          <button className="cursor-pointer flex items-center justify-center gap-1.5 rounded-md p-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:text-sm text-slate-600 hover:bg-slate-100">
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
              className="lucide lucide-share2 lucide-share-2"
              aria-hidden="true"
            >
              <circle cx={18} cy={5} r={3} />
              <circle cx={6} cy={12} r={3} />
              <circle cx={18} cy={19} r={3} />
              <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
              <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
            </svg>
            <span>Share</span>
          </button>
        </div>

    

        {!isPostDetails && (
  <div className="border-t border-slate-200 bg-[#f7f8fa] px-4 py-4">
    {topComment && <TopComment topComment={topComment} postId={id} />}
    <CommentCreation postId={id} />
  </div>
)}

        {isPostDetails && (
          <>
            {isLoading && <Loader />}
            {isError && (
              <p className="text-red-500 text-center">{error.message}</p>
            )}
            {comments && <CommentsSection postId={id} comments={comments} />}
          </>
        )}
      </article>
    </>
  );
}
