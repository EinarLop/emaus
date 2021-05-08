import React, {useState, useEffect} from 'react'
import {firebase} from './firebase/app';
import Post from "./firebase/posts";
import User from "./firebase/users";
import Event from "./firebase/events";
import Volunteer from './firebase/volunteers';
import Page from './firebase/pages';

import useLogin from './hooks/useLogin'

export default function TestBackend() {

    const [userDate, setUserDate] = useState();
    
    const {loginStatus} = useLogin();

    // Volunteer API ************
    const submitVolunteer = async (e) => {
        const example = {
            name: "Eric Chao 2",
            phone: "7787888887",
            mail: "ericjardon@hotmail.com",
            note: "Hello thank you bye"
        }

        let res = await Volunteer.registerOne(example);
        console.dir(res)
    }

    const deleteVolunteer = async (e) => {
        let res = await Volunteer.deleteVolunteer("OEZvFvo7lV8sFYgXRYfG");
        console.dir(res);
    }

    const getVolunteers = async (e) => {
        let res = await Volunteer.getAllVolunteers();
        console.log(res);
    }

    // Event API ***********

    const submitEvent = async (e) => {
        if (!userDate) {
            return console.log("No user Date given");
        }
        let currDate = new Date(userDate);
        const evt = {
            title: "Evento prueba número 3",
            content: "Probando fechas ....1",
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
        let res = await Event.addImageToEvent('x3hmHHnXDgiNQQlfU1ud', imageFile);
        console.log(res);
    }

    const tryEvtAPI = async () => {
        const example = {
            title:"Eventito",
            content:"k se arma o q",
            date: userDate,
            type:1,
        }
        const newevt = await Event.creatNewEvent(example);
        console.log("New post result", newevt);
        const res = await Event.deleteEvent(newevt.id);
        console.log("After deletion: ", res);
        const evts = await Event.getAllEvents();
        console.log("ALL EVENTS\n");
        console.log(evts);
    };

    const eventDelete = async () => {
        console.log("Deleting event and its image!!")
        const res = await Event.deleteEvent('x3hmHHnXDgiNQQlfU1ud');
        console.log(res);
    }

    // Post API ************
    const tryPostAPI = async () => {
        // Test Create, Delete and GetAll of firestore posts
        const example = {
            title:"OCC Mundial",
            content:"Comiendo pizza dos por uno",
            favorite: true,
        }
        const newpost = await Post.createNewPost(example);
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

    const getEvent = async (e) => {
        console.log("Getting event...");
        const evt = await Event.getOneEvent('1');
        console.log(evt);
    }

    // User API ***********
    const login = async (e) => {
        console.log("logging in...")
        let email = "archanavermarodriguez@gmail.com";
        let password = "Toggle123";
        let res = await User.loginUser(email, password);
        console.log(res);
        //setLoginStatus(false);
    }

    const logout = async (e) => {
        console.log("Logging out...");
        await User.logOut();
        //setLoginStatus(true);
    }

    const loginWithUsername = async (e) => {
        let username = "admin123";
        let password = "Toggle123";
        let res = await User.loginWithUsername(username, password);
        console.log(res);
        //setLoginStatus(false);
    }

    const loginAction = (e) => {
        if (loginStatus) {
            return logout(e);
        } else {
            return login(e);
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

    const getHome = async () => {
        await Page.getHome();
    }

    console.log("Login status:", loginStatus);

    return (
        <div style={{border:"solid 1px blue", padding:"20px", display:"flex", flexDirection:"column"}}>
            <input type='datetime-local' onChange={printDate}></input>
            <button onClick={getHome}>Do something</button>
            <button onClick={handleEventImageUpload}>Upload Event img</button>
            <button onClick={getEvents}>Fetch event list</button>
            <button onClick={loginWithUsername}>Log in with username</button>
            <button onClick={loginAction}>{loginStatus ? "Log out" : "Log in"}</button>
            <input type="file" accept="image/*" onChange={handleEventImageUpload} />
        </div>
    )
}
