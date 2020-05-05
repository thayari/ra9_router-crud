import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function PostItem({ id, content, created }) {
  const date = moment(new Date(created)).format('YYYY-MM-DD HH:mm');
  const link = '/posts/' + id;

  return (

      <div className="card mt-4 rounded-lg shadow-sm">
        <div className="card-header">
          <h5>Tony Stark</h5>
          {date}
        </div>
        <div className="card-body" >
          <div className="card-text">{content}</div>
          <Link className="stretched-link" to={link} />
        </div>
      </div>
    
  )
}
