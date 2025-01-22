import { Post } from "../utils/types";

export const mockData: Post[] = [
    {
        id: '1',
        title: 'Getting Started with React',
        content: 'React is a fantastic library for building user interfaces...',
        author: 'John Doe',
        timestamp: new Date('2024-01-20'),
        comments: [
            {
                id: '1-1',
                content: 'Great introduction to React!',
                author: 'Jane Smith',
                timestamp: new Date('2024-01-21'),
                replies: [
                    {
                        id: '1-1-1',
                        content: 'Thanks! Glad you found it helpful.',
                        author: 'John Doe',
                        timestamp: new Date('2024-01-21'),
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: '2',
        title: 'TypeScript Best Practices',
        content: 'TypeScript adds static typing to JavaScript...',
        author: 'Alice Johnson',
        timestamp: new Date('2024-01-19'),
        comments: []
    }
];