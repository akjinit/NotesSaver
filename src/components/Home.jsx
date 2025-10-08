import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router';
import { addToPastes, updateToPastes } from '../features/pasteSlice';
import { toast } from 'react-toastify';
import './Home.css';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.pastes.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      } else {
        toast.error('Paste not found!');
        setSearchParams({});
      }
    }
  }, [pasteId, allPastes, setSearchParams]);

  const createPaste = () => {
    if (!title.trim() || !value.trim()) {
      toast.error('Please enter both title and content!');
      return;
    }

    const paste = {
      title,
      content: value,
      _id: pasteId ? pasteId : Date.now().toString(16),
      createdAt: new Date().toString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      toast.success('Paste updated successfully!');
    } else {
      dispatch(addToPastes(paste));
      toast.success('Paste created successfully!');
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  };

  return (
    <div className="paste">
      <div className="paste-header">
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Enter Title Here"
        />
        <button onClick={createPaste}>
          {pasteId ? 'Update My Paste' : 'Create My Paste'}
        </button>
      </div>

      <div className="editor-container">
        <div className="editor-header">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <textarea
          value={value}
          placeholder="Enter Content Here"
          onChange={(e) => setValue(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
