import React, { useState } from 'react';
import { Container, TextField, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { mockData } from './data/mockData';
import { Post } from './utils/types';
import PostComponent from './components/post/Post';

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const handleAddPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        title: newPost.title,
        content: newPost.content,
        author: 'Current User',
        timestamp: new Date(),
        comments: []
      };
      setPosts([post, ...posts]);
      setNewPost({ title: '', content: '' });
      setIsDialogOpen(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          onClick={() => setIsDialogOpen(true)}
        >
          Create New Post
        </Button>
      </Box>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            sx={{ mb: 2, mt: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Content"
            value={newPost.content}
            onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleAddPost} variant="contained">Post</Button>
        </DialogActions>
      </Dialog>

      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </Container>
  );
};

export default App;