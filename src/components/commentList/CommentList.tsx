import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Avatar } from '@mui/material';
import { CommentListProps } from '../../utils/types';

// Utility function to format relative time
const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
        return 'just now';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
        return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
    }
};

const CommentList: React.FC<CommentListProps> = ({ comments, onAddComment, depth = 0 }) => {
    const [replyText, setReplyText] = useState<string>('');
    const [replyingTo, setReplyingTo] = useState<string | null>(null);

    const handleReply = (commentId: string) => {
        if (replyText.trim()) {
            onAddComment(replyText, commentId);
            setReplyText('');
            setReplyingTo(null);
        }
    };

    return (
        <Box sx={{ position: 'relative' }}>
            {comments.map((comment, index) => (
                <Box
                    key={comment.id}
                    sx={{
                        position: 'relative',
                        ml: depth > 0 ? 5 : 0,
                        mt: 2,
                        '&:before': depth > 0 ? {
                            content: '""',
                            position: 'absolute',
                            left: -20,
                            top: 20,
                            width: 20,
                            height: '100%',
                            borderLeft: '2px solid #e0e0e0',
                            borderBottom: index === comments.length - 1 ? 'none' : '2px solid #e0e0e0',
                            borderBottomLeftRadius: 8,
                        } : {}
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 2,
                            mb: 1
                        }}
                    >
                        <Avatar
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author}`}
                            sx={{ width: 32, height: 32 }}
                        />
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                                <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    {comment.author}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    {getRelativeTime(new Date(comment.timestamp))}
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                {comment.content}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Button
                                    size="small"
                                    onClick={() => setReplyingTo(comment.id)}
                                    sx={{
                                        minWidth: 'auto',
                                        color: 'text.secondary',
                                        '&:hover': { color: 'primary.main' }
                                    }}
                                >
                                    Reply
                                </Button>
                            </Box>

                            {replyingTo === comment.id && (
                                <Box sx={{ mt: 2 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        placeholder="Write a reply..."
                                        multiline
                                        rows={2}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                borderRadius: 2
                                            }
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            onClick={() => handleReply(comment.id)}
                                            sx={{ borderRadius: 2 }}
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </Box>
                            )}
                        </Box>
                    </Box>

                    {comment.replies.length > 0 && (
                        <CommentList
                            comments={comment.replies}
                            onAddComment={onAddComment}
                            depth={depth + 1}
                        />
                    )}
                </Box>
            ))}
        </Box>
    );
};

export default CommentList;