import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';

export default function Post({ match }) {
  const history = useHistory();
  const id = match.params.id;
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:7777/posts/${id}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setInfo(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:7777/posts/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      setInfo(data);
    } catch (e) {
      console.log(e);
    } finally {
      history.push('/');
    }
  }

  return (
    <>
      {loading ? "Loading..." : (<div className="card mt-4 rounded-lg shadow-sm">
        <div className="card-header">
          <Link className="close" to='/'>
            <span aria-hidden="true">&times;</span>
          </Link>
          <h5>Tony Stark</h5>
          {moment(new Date(info.created)).format('YYYY-MM-DD HH:mm')}
        </div>
        <div className="card-body">
          <div className="card-text">{info.content}</div>
        </div>
        <div className="card-footer">
          <Link className="btn btn-primary mr-2" to={`edit/${id}`}>Изменить</Link>
          <button className="btn btn-danger" onClick={handleDelete}>Удалить</button>
        </div>
      </div>)}
    </>

  )
}
