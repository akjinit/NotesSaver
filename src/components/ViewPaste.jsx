import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import './ViewPaste.css';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.pastes.pastes);
  const paste = allPastes.find((i) => i._id === id);

  const handleCopy = () => {
    navigator.clipboard.writeText(paste.content);
    toast.success('Copied to clipboard!');
  };

  if (!paste) return <h2 className="not-found">Paste not found!</h2>;

  return (
    <div className="view-container">
      <input
        type="text"
        disabled
        value={paste.title}
        className="view-title"
      />

      <textarea
        disabled
        value={paste.content}
        className="view-content"
      ></textarea>

      <button className="view-copy-btn" onClick={handleCopy}>
        📋 Copy Content
      </button>
    </div>
  );
};

export default ViewPaste;
