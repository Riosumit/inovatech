import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const Update = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("loggedin") != 'true') {
            navigate("/login");
        }
        if (localStorage.getItem("update_id") == null) {
            navigate("/");
        }
        async function idea(){
            var id = localStorage.getItem("update_id");
            const idea = await axios.get("https://inovatech-riosumit.vercel.app/api/idea/"+id);
            document.getElementById("title").value = idea.data.title;
            document.getElementById("desc").value = idea.data.description;
            document.getElementById("image").files[0] = idea.data.image;
            document.getElementById("image").files[0].name = idea.data.image
        }
        idea()
    }, [])
    async function Update(id) {
        document.getElementsByClassName('buffer')[0].style.display="flex";
        try {
            id = localStorage.getItem("update_id")
            const form = new FormData();
            let title = document.getElementById("title").value;
            let desc = document.getElementById("desc").value;
            form.append('id', Number(id))
            form.append('published_by', Number(localStorage.getItem("id")))
            form.append('title', title);
            form.append('description', desc);
            if (document.getElementById("image").files[0] != undefined){
                let image = document.getElementById("image").files[0];
                let image_name = document.getElementById("image").files[0].name;
                form.append('image', image, image_name);
            }
            const update_event = await axios.post("http://localhost:8000/api/update", form, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            console.log(update_event.data)
            if (update_event.data.success === true) {
                document.getElementsByClassName("formcontent")[0].reset();
                document.getElementsByClassName("err")[0].innerHTML = update_event.data.msg;
                document.getElementsByClassName("err")[0].style.color = "green";
                localStorage["update_id"] = null
                navigate("/profile")
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
                    <div className="formhead">Update Idea</div>
                    <form className="formcontent">
                        <label htmlFor="title">Title :<br />
                            <input type="text" placeholder='Title' id='title' required />
                        </label>
                        <label htmlFor="desc">Description :<br />
                            <textarea type="text" placeholder='Description' id='desc' rows={5} required />
                        </label>
                        <label htmlFor="image">Image :<br />
                            <input type="file" placeholder='Image' id='image'/>
                        </label>
                        <div className="err"></div>
                        <div className='submitbtn' onClick={Update}>Update</div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Update
