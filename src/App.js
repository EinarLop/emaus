import "./index.css";
import { useEffect } from "react";
import Post from "./firebase/posts";
import Header from "./Components/Header";
import Home from "./Home/Home";
import Donate from "./Donate/Donate";
import Blog from "./Blog/Blog";
import Events from "./Events/Events";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const tryAPI = async () => {
    // Test create, delete and get of firestore posts
    const newpost = await Post.uploadNewPost();
    console.log("New post result", newpost);
    const res = await Post.deletePost(newpost.id);
    console.log("After deletion: ", res);
    const posts = await Post.getAllPosts();
    console.log("ALL POSTS\n");
    console.log(posts);
  };

  const handleImageUpload = async (e) => {
    const imageFile = e.target.files[0];
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    let imageURL = await Post.uploadImage('1', imageFile);
    if (imageURL) {
      console.log("Image URL: ", imageURL);
    } else {
      console.log("Something went wrong");
    }
  }
  const submitPost = async (e) => {
    const newpost = await Post.uploadNewPost();
    console.log("New post result", newpost);
  }

  const getPost = async (e) => {
    console.log("Getting post...");
    const post = await Post.getOnePost('1');
    console.log(post);
  }

  return (
    <>
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/donativos" component={Donate} />
        <Route exact path="/eventos" component={Events} />
      </Router>
    </>
  );
}

export default App;
