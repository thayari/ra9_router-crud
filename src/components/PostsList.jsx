import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';


import PostItem from './PostItem';

export default function PostsList() {
  const [loading, setLoading] = useState(true)
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:7777/posts');
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setList(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])
  
  return (
    <>
      <Link className="btn btn-primary" to="/posts/new">Новая запись</Link>
      {!loading ? list.map((item) => <PostItem key={item.id} {...item} />) : 'Loading...'}
    </>
  )
}