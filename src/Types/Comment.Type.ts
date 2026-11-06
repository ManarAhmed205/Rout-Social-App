// types/post.types.ts

export type PostUser = {
  _id: string;
  name: string;
  username: string;
  photo: string;
};

export type PostComment = {
  _id: string;
  content?: string | null;
  image: string ;
  commentCreator: PostUser;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
};

export type Post = {
  _id: string;
  id: string;
  body: string;
  image?: string | null;
  privacy: "public" | "private" | "friends";
  user: PostUser;
  sharedPost: Post | null;
  likes: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  topComment: PostComment | null;
  isShare: boolean;
  bookmarked: boolean;
  createdAt: string;
};