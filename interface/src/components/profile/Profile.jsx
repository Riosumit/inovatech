import './Profile.css'
import axios from 'axios'
import { useState, useEffect } from 'react';
import { IoPersonCircleSharp } from "react-icons/io5";
import { AiOutlineSend } from 'react-icons/ai'

const Profile = () => {
    const [ideas, setIdeas] = useState([])
    const [user, setUser] = useState([])
    const [comments, setComments] = useState([])
    useEffect(() => {
        async function userDetails() {
            try {
                var id = localStorage.getItem("id")
                const details = await axios.get("https://inovatech-riosumit.vercel.app/api/user/" + id)
                setUser(details.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        userDetails()
        async function getIdea() {
            try {
                var id = localStorage.getItem("id")
                const ideas = await axios.get("https://inovatech-riosumit.vercel.app/api/ideas/" + id)
                console.log(ideas.data)
                setIdeas(ideas.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        getIdea()
    }, [])
    function Real_Boolean(s) {
        if (s == 'true') {
            return true
        }
        else {
            return false
        }
    }
    function genrate_url(s) {
        return "http://localhost:8000" + s
    }
    async function getUser(id) {
        try {
            const details = await axios.get("https://inovatech-riosumit.vercel.app/api/user/" + id)
            const data = details.data
            return data[0]
        }
        catch (error) {
            console.log(error)
        }
    }
    async function getComment(id) {
        try {
            const comments = await axios.get("https://inovatech-riosumit.vercel.app/api/comment/" + id)
            setComments(comments.data)
        }
        catch (error) {
            console.log(error)
        }
    }
    async function Comment(id, i) {
        console.log(i)
        try {
            const data = {
                "comment_on": id,
                "comment_by": Number(localStorage.getItem("id")),
                "comment_text": String(document.getElementsByClassName('comment_text')[i].value),
            }
            const body = JSON.stringify(data);
            console.log(body)
            const comment = await axios.post("https://inovatech-riosumit.vercel.app/api/comment", body);
            console.log(comment.data)
            getComment(id)
            document.getElementsByClassName('comment_text')[i].value = "";
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='profile'>
            {
                user.map((user, i) => {
                    return (
                        <div className="profile_card">
                            <IoPersonCircleSharp className="photo" />
                            <div className="info">
                                <b>Name : </b> <p>{user.name}</p>
                                <b>Phone : </b> <p>{user.phone}</p>
                                <b>Email : </b> <p>{user.email}</p>
                                <b>LinkedIn : </b> <p><a href={user.linkedin} target="_blank">{user.linkedin}</a></p>
                            </div>
                        </div>
                    )
                })
            }
            <h1>Posted Ideas</h1>
            {
                ideas.map((ideas, i) => {
                    return (
                        <div className="idea_box">
                            <div className="idea">
                                <img src={genrate_url(ideas.image)} alt="" />
                                <div className="content">
                                    <h2 className="title">{ideas.title}</h2>
                                    <div className="desc">{ideas.description}</div>
                                </div>
                            </div>
                            <details>
                                <summary className="comments" onClick={() => getComment(ideas.id)}><b>Comments</b></summary>
                                <div className="comm">
                                    <div className="comment_list">
                                        {
                                            comments.map((comment, i) => {
                                                getUser(comment.comment_by).then(value => {
                                                    var element = document.getElementsByClassName(comment.comment_by)
                                                    for (var i = 0; i < element.length; i++) {
                                                        element[i].innerText = "@" + value.name
                                                    }
                                                })
                                                return (
                                                    <div className="comment">
                                                        <IoPersonCircleSharp className='dp' />
                                                        <div className={comment.comment_by}></div>
                                                        <div className="text">{comment.comment_text}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <div className="post_comment">
                                        <input type="text" className='comment_text' />
                                        <AiOutlineSend className='send_icon' onClick={() => Comment(ideas.id, i)} />
                                    </div>
                                </div>
                            </details>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Profile
