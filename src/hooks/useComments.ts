import { useState } from 'react';
import { Comment } from '../utils/types';

const generateUniqueId = () => {
    // Generate a random string of characters
    return 'comment_' + Math.random().toString(36).substr(2, 9);
};

export const useComments = () => {
    const [comments, setComments] = useState<Comment[]>([]);

    const addComment = (content: string, parentId?: string) => {
        const newComment: Comment = {
            id: generateUniqueId(),
            content,
            author: 'Current User',
            timestamp: new Date(),
            replies: [],
            parentId
        };

        setComments(prev => [...prev, newComment]);
    };

    return { comments, addComment };
};