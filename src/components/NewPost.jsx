import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

export default function NewPost() {
  const history = useHistory();
  const [form, setForm] = useState('');

  const sendForm = async () => {
    const body = {
      id: 0,
      content: form
    };
    const response = await fetch('http://localhost:7777/posts', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    const result = await response;
    console.log(result);
    history.push('/');
  }

  const handleChange = (event) => {
    setForm(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendForm();
  }

  return (
    <div className="card">
      <form onSubmit={handleSubmit}> 
        <div className="form-group">
          <textarea rows="5" className="form-control" name="posttext" onChange={handleChange} value={form}></textarea>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Опубликовать</button>
          <Link className="btn btn-default" to="/">Отмена</Link>
        </div>
      </form>
    </div>
  )
}
