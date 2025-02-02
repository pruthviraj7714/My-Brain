import axios from "axios";

export const addContent = async ({
  title,
  contentType,
  link,
}: {
  title: string;
  contentType: "TWEET" | "YOUTUBE" | "IMAGE";
  link: string;
}) => {
  const { data } = await axios.post("/api/add-content", {
    title,
    contentType,
    link,
  });

  return data;
};

export const deleteContent = async({
  contentId
} : { contentId : string}) => {
  const  { data } = await axios.delete(`/api/delete-content?id=${contentId}`);
  return data;
}