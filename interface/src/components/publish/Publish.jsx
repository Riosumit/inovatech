import React from 'react'
import './Publish.css'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const Publish = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("loggedin") != 'true') {
            navigate("/login");
        }
    }, [])
    async function Post() {
        document.getElementsByClassName('buffer')[0].style.display="flex";
        try {
            const form = new FormData();
            let title = document.getElementById("title").value;
            let desc = document.getElementById("desc").value;
            let image = document.getElementById("image").files[0];
            let image_name = document.getElementById("image").files[0].name;
            form.append('published_by', Number(localStorage.getItem("id")))
            form.append('title', title);
            form.append('description', desc);
            form.append('image', image, image_name);
            const post_event = await axios.post("https://inovatech-riosumit.vercel.app/api/publish", form, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            console.log(post_event.data)
            if (post_event.data.status === "success") {
                document.getElementsByClassName("formcontent")[0].reset();
                document.getElementsByClassName("err")[0].innerHTML = "Idea Posted Succesfully";
                document.getElementsByClassName("err")[0].style.color = "green";
            }
        }
        catch (error) {
            console.log(error)
        }
        document.getElementsByClassName('buffer')[0].style.display="none";
    }
    return (
        <div>
            <div className="buffer">
                <img className='buffer_img' src="https://i.gifer.com/VAyR.gif" alt="" />
            </div>
            <div className='publish'>
                <div className="form">
                    <div className="formhead">Publish Idea</div>
                    <form className="formcontent">
                        <label htmlFor="title">Title :<br />
                            <input type="text" placeholder='Title' id='title' required />
                        </label>
                        <label htmlFor="desc">Description :<br />
                            <textarea type="text" placeholder='Description' id='desc' rows={5} required />
                        </label>
                        <label htmlFor="image">Image :<br />
                            <input type="file" placeholder='Image' id='image' required />
                        </label>
                        <div className="err"></div>
                        <div className='submitbtn' onClick={Post}>Post</div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Publish
