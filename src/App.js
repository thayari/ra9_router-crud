import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import './App.css';
import PostsList from './components/PostsList';
import NewPost from './components/NewPost';
import Post from './components/Post';
import EditPost from './components/EditPost';

function App() {
  return (
    <Router>
      <div className='container'>
        <div className="col-md-8 offset-md-2 p-4">
          <Switch>
            <Route path="/posts/new" exact component={NewPost} />
            <Route path="/posts/:id" exact component={Post} />
            <Route path="/posts/edit/:id" exact component={EditPost} />
            <Route path="/" exact component={PostsList} />
          </Switch>

        </div>
      </div>
    </Router>
  );
}

export default App;
