import { useMutation , useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";


type CommentFormValues = {
  content: string;
  image?: FileList;
};



export default function CommentCreation({postId} : {postId : string}) {
  const form= useForm<CommentFormValues>({
    defaultValues: {
      content: "",
     
    },
  });
  const queryClient = useQueryClient()
  

  
  function creatComment(formdata: FormData){
    return axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments` , formdata , {
        headers : {
            Authorization : `Bearer ${localStorage.getItem("userToken")}`
        }
    })
  }

  const {isPending , mutate} = useMutation({
    mutationFn : creatComment,
   onSuccess: () => {
  form.reset({ content: "" });
  queryClient.invalidateQueries({ queryKey: ["getPostComments", postId] });
  queryClient.invalidateQueries({ queryKey: ["getallPosts"] });
},
    onError : (error) => {
        if (axios.isAxiosError(error)){
            console.log("comment error" , error.response?.data);
            console.log("status" , error.response?.status)
        } else {
            console.log(error)
        }
    }
  })



  const { register, handleSubmit } = form;
  

  function handelCreatComment(values: CommentFormValues) {

    const file = values.image?.[0];
    if (!values.content.trim() && !file) return;

     const formdata = new FormData();

   
    if (values.content.trim()) {
      formdata.append("content", values.content);
    }
    if (file) {
      formdata.append("image", file);
    }

    mutate(formdata)
  }

  return (
    <>
    <div className="mt-3 ">
      <div className="flex items-start  gap-2 ">
        <img
          alt="mock"
          className="h-9 w-9 rounded-full object-cover"
          src="https://pub-3cba56bacf9f4965bbb0989e07dada12.r2.dev/linkedPosts/default-profile.png"
        />
        <form className="w-full" onSubmit={handleSubmit(handelCreatComment)}>
            <div
          className=" rounded-2xl border border-slate-200 bg-[#f0f2f5] px-2.5 py-1.5 focus-within:border-[#c7dafc] focus-within:bg-white"
          data-comment-mention-root="true"
        >
          <textarea
          {...register("content")}
            placeholder="Comment as mock..."
            rows={1}
            className="max-h-[140px] min-h-[40px] w-full resize-none bg-transparent px-2 py-1.5 text-sm leading-5 outline-none placeholder:text-slate-500"
          />
          <div className="mt-1 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <label className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-emerald-600">
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
                  className="lucide lucide-image"
                  aria-hidden="true"
                >
                  <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                  <circle cx={9} cy={9} r={2} />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
                <input {...register("image")} hidden accept="image/*" className="hidden" type="file"
                 
                  />
              </label>
              <button
                type="button"
                
                className="inline-flex items-center justify-center rounded-full p-2 text-slate-500 transition hover:bg-slate-200 hover:text-amber-500"
              >
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
                  className="lucide lucide-smile"
                  aria-hidden="true"
                >
                  <circle cx={12} cy={12} r={10} />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1={9} x2="9.01" y1={9} y2={9} />
                  <line x1={15} x2="15.01" y1={9} y2={9} />
                </svg>
              </button>
            </div>
            <button type="submit"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877f2] text-white shadow-sm transition hover:bg-[#166fe5] disabled:cursor-not-allowed disabled:bg-[#9ec5ff] disabled:opacity-100"
              disabled={isPending}
            >
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
                className="lucide lucide-send-horizontal"
                aria-hidden="true"
              >
                <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
                <path d="M6 12h16" />
              </svg>
            </button>
          </div>
        </div>
        </form>
      </div>
      </div>
    </>
  );
}
