import React from 'react';
import { Link } from 'react-router-dom';

interface Blog {
  _id: string;
  heading: string;
  body: string;
  postedDate: string;
  author: string;
}

interface BlogListProps {
  blogs: Blog[];
  onDelete: (id: string) => void;
}

const BlogList: React.FC<BlogListProps> = ({ blogs, onDelete }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id}>
          <h3>{blog.heading}</h3>
          <p>{blog.body}</p>
          <p>Posted Date: {blog.postedDate}</p>
          <p>Author: {blog.author}</p>
          <Link to={`/blogs/${blog._id}`}>Read More</Link>
          <button onClick={() => onDelete(blog._id)}>Delete</button>
          {/* <Link to={`/edit/${blog._id}`}>Edit</Link> */}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
