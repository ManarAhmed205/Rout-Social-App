import type { PostComment } from "../../Types/Posts.Type";
import { ImSpinner3 } from 'react-icons/im';
import { useContext } from 'react';
import { AuthContext } from './../Context/Auth.Context';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { useMutation } from '@tanstack/react-query';
import  axios  from 'axios';
import { FaPen } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

export default function TopComment({
  topComment,
  postId,
}: {
  topComment: PostComment;
   postId: string;
}) {
   console.log("TopComment rendered", topComment); 
  const { commentCreator, content, image, createdAt, likes,  _id: commentId } = topComment;
 const creatorId = commentCreator?._id;
  const {userId : loginUserId} = useContext(AuthContext) 
    const [isOpen, setisOpen] = useState(false)
    const query=useQueryClient()
     const [isEditing, setIsEditing] = useState(false);
const [editedContent, setEditedContent] = useState(content);

     function handelDeleteComment(){
        return axios.delete(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}` , {
          headers : {Authorization: `Bearer ${localStorage.getItem("userToken")}` }
        })
      }
      const {  isPending , mutate}=useMutation({
        mutationFn : handelDeleteComment ,
        onSuccess : ()=> {
          setisOpen(false);
    query.invalidateQueries({ queryKey: ["getPostComments", postId] });
    query.invalidateQueries({ queryKey: ["getallPosts"] });
         
        },
        onError : (err) => {
           if (axios.isAxiosError(err)) {
    console.log(err.response?.status, err.response?.data);
  }
        }
      })

function handleUpdateComment() {
 
  return axios.put(
    `https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`,
    { content: editedContent },
    { headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } },
  );

}

const { isPending: isUpdating, mutate: updateComment } = useMutation({
  mutationFn: handleUpdateComment,
 onSuccess: async () => {
  setIsEditing(false);
  await Promise.all([
    query.invalidateQueries({ queryKey: ["getallPosts"] }),
    query.invalidateQueries({ queryKey: ["getPostComments", postId] }),
    query.invalidateQueries({ queryKey: ["getUserPosts"] }),
  ]);
},
onError: (err) => {
  if (axios.isAxiosError(err)) {
    console.log("status:", err.response?.status);
    console.log("message:", JSON.stringify(err.response?.data));
  }
},
});

  return (
    <>
       <div className="relative flex items-start gap-2 py-1 w-full">
      <img
        alt={commentCreator?.name}
        className="mt-0.5 h-8 w-8 rounded-full object-cover"
        src={commentCreator?.photo}
      />
      
      <div className="min-w-0 flex-1 ">
        <div className="relative inline-block w-full rounded-2xl bg-[#f0f2f5] px-3 py-2">
           {loginUserId && loginUserId === creatorId && <button onClick={()=> setisOpen(!isOpen)} className="absolute end-1 top-1 rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
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
                        
                       {isOpen &&  <div className="bg-white z-50 p-2 rounded-lg absolute top-[120%] end-[0] shadow-2xl border-slate-400 border-2 ">
                          <ul className="flex flex-col  gap-2">
                            <li><button className="flex gap-2 items-center cursor-pointer bg-slate-100 p-2"  onClick={() => {
      setEditedContent(content);
      setIsEditing(true);
      setisOpen(false);
    }}>Edit <FaPen /></button>  </li>
                            
                            <li >
                              <button disabled={isPending} onClick={()=>mutate()} className="w-full disabled:bg-slate-500 disabled:cursor-not-allowed disabled:text-white flex gap-2 items-center cursor-pointer bg-slate-100 p-2">
                                {isPending ? <ImSpinner3 className="animate-spin flex justify-center items-center w-full  " /> : <>Delete <MdDelete /> </> }
                              </button>
                                </li>
                            
          
                          </ul>
                        </div>}
          <p className="text-xs font-bold text-slate-900">{commentCreator?.name}</p>
          <p className="text-xs text-slate-500">@{commentCreator?.username}</p>
         {isEditing ? (
  <div className="mt-2 space-y-2">
    <textarea
      value={editedContent}
      onChange={(e) => setEditedContent(e.target.value)}
      rows={2}
      className="w-full resize-none rounded-xl border border-slate-300 bg-white p-2 text-sm outline-none focus:border-[#1877f2]"
    />
    <div className="flex justify-end gap-2">
      <button
        type="button"
        onClick={() => setIsEditing(false)}
        className="rounded-lg bg-slate-200 px-3 py-1 text-xs font-bold text-slate-700 hover:bg-slate-300"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={() => updateComment()}
        disabled={!editedContent.trim() || isUpdating}
        className="rounded-lg bg-[#1877f2] px-3 py-1 text-xs font-bold text-white hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isUpdating ? "Saving..." : "Save"}
      </button>
    </div>
  </div>
) : (
  content && (
    <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
      {content}
    </p>
  )
)}
        </div>

        {image && (
          <img src={image} alt="comment" className="mt-2 max-w-[250px] rounded-lg" />
        )}

        <div className="mt-1.5 flex items-center gap-4 px-1">
          <span className="text-xs font-semibold text-slate-400">
            {new Date(createdAt).toLocaleString()}
          </span>
          <button className="text-xs font-semibold text-slate-500 hover:underline">
            Like ({likes?.length ?? 0})
          </button>
          <button className="text-xs font-semibold text-slate-500 hover:text-[#1877f2] hover:underline">
            Reply
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
