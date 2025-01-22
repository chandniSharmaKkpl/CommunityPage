export interface Comment {
    id: string;
    content: string;
    author: string;
    timestamp: Date;
    parentId?: string;
    replies: Comment[];
};

export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    timestamp: Date;
    comments: Comment[];
};

export interface CommentListProps {
    comments: Comment[];
    onAddComment: (content: string, parentId?: string) => void;
    depth?: number;
}

export interface PostProps {
    post: Post;
}