import React, {useState} from 'react'
import Post from "./firebase/posts";
import User from "./firebase/users";
import Event from "./firebase/events";

export default function TestBackend() {

    const [loginStatus, setLoginStatus] = useState(true);
    const [userDate, setUserDate] = useState();

    // Event API ***********

    const submitEvent = async (e) => {
        if (!userDate) {
            return console.log("No user Date given");
        }
        let currDate = new Date(userDate);
        const evt = {
            title: "Evento ejemplo jajaja",
            content: "contenido evento ejemplo jijiji",
            date: currDate,
            type: 2,
        };
        console.log("Date in Locale:", evt.date.toLocaleString());
        console.log("To Date String", evt.date.toDateString());

        let res = await Event.creatNewEvent(evt);
        console.log(res);
    }

    const getEvents = async (e) => {
        let events = await Event.getAllEvents();
        console.log("Fetched events succesfully");
        console.log(events);
    }

    const handleEventImageUpload = async (e) => {
        const imageFile = e.target.files[0];    // Blob
        if (imageFile===undefined) {
            return console.log("No image File");
        }
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
        let res = await Event.addImageToEvent('1', imageFile);
        console.log(res);
    }

    // Post API ************
    const tryAPI = async () => {
        // Test Create, Delete and GetAll of firestore posts
        const newpost = await Post.createNewPost();
        console.log("New post result", newpost);
        const res = await Post.deletePost(newpost.id);
        console.log("After deletion: ", res);
        const posts = await Post.getAllPosts();
        console.log("ALL POSTS\n");
        console.log(posts);
    };

    const handlePostImageUpload = async (e) => {
        const imageFile = e.target.files[0];    // Blob
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
        let res = await Post.addImageToPost('1', imageFile);
        console.log(res);
    }

    const submitPost = async (e) => {
        const example = {
            title: "Post de ejemplo",
            content: "Contenido post ejemplo jejeje",
            favorite: true,
            image: "",
        }       // ejemplo

        const newpost = await Post.createNewPost(example);
        console.log("New post result", newpost);
    }

    const getPost = async (e) => {
        console.log("Getting post...");
        const post = await Post.getOnePost('1');
        console.log(post);
    }

    // User API ***********
    const login = async (e) => {
        console.log("logging in...")
        let email = "archanavermarodriguez@gmail.com";
        let password = "Toggle123";
        let res = await User.loginUser(email, password);
        console.log(res);
        setLoginStatus(false);
    }

    const logout = async (e) => {
        console.log("Logging out...");
        await User.logOut();
        setLoginStatus(true);
    }

    const loginWithUsername = async (e) => {
        let username = "admin123";
        let password = "Toggle123";
        let res = await User.loginWithUsername(username, password);
        console.log(res);
        setLoginStatus(false);
    }

    const loginAction = (e) => {
        if (loginStatus) {
            return login(e);
        } else {
            return logout(e);
        }
    }

    const printDate = (e) => {
        let x = e.target.value;
        console.log(x);
        setUserDate(x);
    }  

    const updatePost = async (e) => {
        console.log("Update post called");
        const data = {
            title: "I am an updated title",
            content: "And this is the new content"
        }

        let res = await Post.updatePost('1', data);
        // todo ok
        console.log("Update post succesfull:");
        console.dir(res);
    }

    const updateEvent = async (e) => {
        console.log("Update Event called");

        if(!userDate) {
            return console.log("No user date defined");
        }

        const data = {
            title: "I am an updated EVENT",
            content: "And this is the new EVENT INFO",
            date: new Date(userDate),
        }

        let res = await Event.updateEvent('1', data);
        // todo ok
        console.log("Update event succesfull:");
        console.dir(res);
    }

    return (
        <div style={{border:"solid 1px blue", padding:"20px", display:"flex", flexDirection:"column"}}>
            <input type='datetime-local' onChange={printDate}></input>
            <button onClick={submitPost}>Do something</button>
            <button onClick={getEvents}>Fetch event list</button>
            <button onClick={loginWithUsername}>Log in with username</button>
            <button onClick={loginAction}>{loginStatus ? "Log in" : "Log out"}</button>
            <input type="file" accept="image/*" onChange={handleEventImageUpload} />
        </div>
    )
}
