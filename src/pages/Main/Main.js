import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  return (
    <div style={{marginTop: '100px'}} onClick={() => navigate('/search')}>Click</div>
  )
}
export default Main;