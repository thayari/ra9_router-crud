import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';

export default function EditPost({ match }) {
  const history = useHistory();
  const id = match.params.id;
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState('');
  const postUrl = '/posts/' + id;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:7777/posts/${id}`);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const data = await response.json();
        setForm(data.content);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [])

  const sendForm = async () => {
    const body = {
      id: id,
      content: form,
    };
    try {
      const response = await fetch('http://localhost:7777/posts', {
        method: 'POST',
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
    
    history.push(postUrl);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendForm();
  }

  const handleChange = (event) => {
    setForm(event.target.value);
  }

  return (<div className="card border-0 rounded-lg shadow-sm">
    <div className="modal-header">
      <h6 className="modal-title">Редактировать публикацию</h6>
      <Link className="close" to={postUrl}>
        <span aria-hidden="true">&times;</span>
      </Link>
    </div>
    <div className="modal-body">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea rows="5" className="form-control" name="posttext" onChange={handleChange} value={loading ? '' : form}></textarea>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Сохранить</button>
        </div>
      </form>
    </div>

  </div>)
}
