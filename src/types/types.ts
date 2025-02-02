

export interface ContentProps {
    link : string;
    title : string;
    contentType : "TWEET"| "IMAGE" | "YOUTUBE",
    id : string;
    createdAt : Date;
    userId : string;
}