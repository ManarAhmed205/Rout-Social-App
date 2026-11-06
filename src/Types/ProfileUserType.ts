export interface UserProfileType {
  _id: string;
  id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
  gender: "male" | "female";
  dateOfBirth: string;
  createdAt: string;
  bookmarks: string[];
  bookmarksCount: number;
  followers: string[];
  followersCount: number;
  following: string[];
  followingCount: number;
}