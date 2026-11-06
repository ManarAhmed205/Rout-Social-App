import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { useParams ,useNavigate } from "react-router-dom";
import Post from "../../components/Post/Post";
import { Helmet } from 'react-helmet';

export default function PostDetails() {
  const { id } = useParams();
  const navigate =useNavigate()

  function getPostDetails() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getSinglePost", id],
    queryFn: getPostDetails,
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

  return (
    <>
    <Helmet>
              <title>PostDetails | Rout Posts</title>
            </Helmet>
    <div className="w-[50%] mx-auto">
    <div className="my-4">
      <button onClick={()=>{
        navigate("/")
      }} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
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
          className="lucide lucide-arrow-left"
          aria-hidden="true"
        >
          <path d="m12 19-7-7 7-7" />
          <path d="M19 12H5" />
        </svg>
        Back
      </button>
      </div>
      
      <Post post={data?.data.data.post} isPostDetails={true} />
      </div>
    </>
  );
}
