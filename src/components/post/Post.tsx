import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Box } from '@mui/material';
import { PostProps } from '../../utils/types';
import { useComments } from '../../hooks/useComments';
import CommentList from '../commentList/CommentList';

const PostComponent: React.FC<PostProps> = ({ post }) => {
    const [commentText, setCommentText] = useState('');
    const { comments, addComment } = useComments();

    const handleAddComment = () => {
        if (commentText.trim()) {
            addComment(commentText, post.id);
            setCommentText('');
        }
    };

    return (
        <Card sx={{ mb: 4 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {post.title}
                </Typography>
                <Typography variant="body1" paragraph>
                    {post.content}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Posted by {post.author} on {post.timestamp.toLocaleDateString()}
                </Typography>

                <Box sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Write a comment..."
                    />
                    <Button
                        variant="contained"
                        onClick={handleAddComment}
                        sx={{ mt: 1 }}
                    >
                        Add Comment
                    </Button>
                </Box>

                <Box sx={{ mt: 3 }}>
                    <CommentList
                        comments={[...post.comments, ...comments]}
                        onAddComment={(content, parentId) => addComment(content, parentId)}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default PostComponent