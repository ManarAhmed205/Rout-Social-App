import type { PostComment } from "../../Types/Posts.Type";
import TopComment from "../Comment/TopComment";
import CommentCreation from "../CommentCreation/CommentCreation";

type Props = {
  postId: string;
  comments: PostComment[];
};

export default function CommentsSection({ postId, comments }: Props) {
  return (
    <div className="border-t border-slate-200 bg-[#f7f8fa] px-4 py-4">
      <div className="mb-3 flex items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2">
        <div className="flex items-center gap-2">
          <p className="text-sm font-extrabold text-slate-700">Comments</p>
          <span className="rounded-full bg-[#e7f3ff] px-2 py-0.5 text-[11px] font-bold text-[#1877f2]">
            {comments.length}
          </span>
        </div>
        <select className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none">
          <option value="relevant">Most relevant</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className="space-y-2">
        {comments.map((comment) => (
          <TopComment key={comment._id} topComment={comment} postId={postId} />
        ))}
      </div>

      <CommentCreation postId={postId} />
    </div>
  );
}