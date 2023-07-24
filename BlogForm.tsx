import React, { useState } from 'react';

export interface BlogData {
  heading: string;
  body: string;
  postedDate: string;
  author: string;
}

interface BlogFormProps {
    onSubmit?: (blogData: BlogData) => void; // Make onSubmit optional
    onEditSubmit?: (id: string, blogData: BlogData) => void; // Make onEditSubmit optional
}

const BlogForm: React.FC<BlogFormProps & { id?: string }> = ({ onSubmit, onEditSubmit, id }) => {
  const [blogData, setBlogData] = useState<BlogData>({
    heading: '',
    body: '',
    postedDate: '',
    author: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBlogData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id && onEditSubmit) {
        onEditSubmit(id, blogData);
      } else if(onSubmit) {
        onSubmit(blogData);
      }
      setBlogData({
        heading: '',
        body: '',
        postedDate: '',
        author: '',
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="heading">Heading:</label>
        <input
          type="text"
          id="heading"
          name="heading"
          value={blogData.heading}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="body">Body:</label>
        <textarea
          id="body"
          name="body"
          value={blogData.body}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="postedDate">Posted Date:</label>
        <input
          type="date"
          id="postedDate"
          name="postedDate"
          value={blogData.postedDate}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={blogData.author}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BlogForm;
