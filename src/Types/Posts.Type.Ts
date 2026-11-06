export type PostUser = {
  _id: string;
  name: string;
  username: string;
  photo: string;
};

export type PostType = {
  _id: string;
  id: string;
  body: string;
  image?: string | null;
  privacy: "public" | "private" | "friends";
  user: PostUser;
  sharedPost: PostType | null;
  likes: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  topComment: PostComment | null;
  isShare: boolean;
  bookmarked: boolean;
  createdAt: string;
};

export type PostComment = {
  _id: string;
  image? : string | null;
  content: string;
  commentCreator: PostUser;
  post: string;
  createdAt: string;
  likes : string[];
};