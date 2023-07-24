import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Blog {
  _id: string;
  heading: string;
  body: string;
  postedDate: string;
  author: string;
}

const BlogDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      const response = await axios.get<Blog>(`http://localhost:5000/api/blogs/getBlog/${id}`);
      setBlog(response.data);
    } catch (error) {
      console.log('Error fetching blog:', error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{blog.heading}</Card.Title>
        <Card.Text>{blog.body}</Card.Text>
        <Card.Text>Posted by: {blog.author}</Card.Text>
        <Card.Text>Posted on: {blog.postedDate}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default BlogDetails;
