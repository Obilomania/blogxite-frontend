import commentInterface from "./commentInterface";

export default interface postInterface {
  id: number;
  title: string;
  content: string;
  imageUrl: string;
  postDate: any;
  comments: commentInterface[];
}