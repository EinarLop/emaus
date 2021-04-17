import "./index.css";
import { useEffect } from "react";
import Post from "./firebase/posts";
import User from "./firebase/users";
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
    const imageFile = e.target.files[0];    // Blob
    console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
    let res = await Post.addImageToPost('1', imageFile);
    console.log(res);
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

  const login = async (e) => {
    console.log("logging in...")
    let email = "archanavermarodriguez@gmail.com";
    let password = "Toggle123";
    let res = await User.loginUser(email, password);
    console.log(res);
  }

  const logout = async (e) => {
   let res = await User.logOut();
   console.log("Logged out? ", res);
  }

  const loginWithUsername = async (e) => {
    let res = await User.logInWithUsername("admin123", "Toggle123");
    console.log(res);
  }

  return (
    <>
      <Router>
        <Header />
        <button onClick={loginWithUsername}>"login"</button>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <Route exact path="/" component={Home} />
        <Route exact path="/blog" component={Blog} />
        <Route exact path="/donativos" component={Donate} />
        <Route exact path="/eventos" component={Events} />
      </Router>
    </>
  );
}

export default App;
