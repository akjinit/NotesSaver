import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../features/pasteSlice';
import { NavLink } from 'react-router';
import { toast } from 'react-toastify';
const Paste = () => {
  const [search, setSearch] = useState('');
  const pastes = useSelector((state) => state.pastes.pastes);
  const dispatch = useDispatch();

  const filteredData = pastes.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
    toast.info('Paste deleted!');
  };

  return (
    <div className="paste-container">
      <input
        type="search"
        className="paste-search"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="paste-list">
        {filteredData.map((item) => (
          <div key={item._id} className="paste-card">
            <h3 className="paste-title">{item.title}</h3>
            <p className="paste-content">{item.content}</p>
            <p className="paste-date">Created: {item.createdAt.substring(0, 15)}</p>

            <div className="paste-actions">
              <NavLink to={`/?pasteId=${item._id}`}>
                <button className="paste-btn edit">Edit</button>
              </NavLink>

              <NavLink to={`/pastes/${item._id}`}>
                <button className="paste-btn view">View</button>
              </NavLink>

              <button
                className="paste-btn delete"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>

              <button
                className="paste-btn copy"
                onClick={() => {
                  navigator.clipboard.writeText(item.content);
                  toast.success('Copied Successfully');
                }}
              >
                Copy
              </button>

              <button className="paste-btn share">Share</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paste;
