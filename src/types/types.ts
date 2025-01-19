

export interface ContentProps {
    link : string;
    title : string;
    contentType : "TWEET"| "IMAGE"| "NOTION"| "YOUTUBE",
    id : string;
    createdAt : Date;
    userId : string;
}