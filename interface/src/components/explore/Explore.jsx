import React from 'react'
import './Explore.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { AiOutlineSend } from 'react-icons/ai'
import { IoPersonCircleSharp } from "react-icons/io5";


const Explore = () => {
    const [ideas, setIdeas] = useState([])
    const [comments, setComments] = useState([])
    useEffect(() => {
        async function getAllIdea() {
            try {
                const ideas = await axios.get("http://localhost:8000/api/ideas")
                console.log(ideas.data)
                setIdeas(ideas.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        getAllIdea()
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
        return "https://res.cloudinary.com/dusnzf3o5/image/upload/v1687762608/" + s
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
        try{
            const data = {
                "comment_on": id,
                "comment_by": Number(localStorage.getItem("id")),
                "comment_text": String(document.getElementsByClassName('comment_text')[i].value),
            }
            const body = JSON.stringify(data);
            console.log(body)
            const comment = await axios.post("https://inovatech-riosumit.vercel.app/api/comment",body);
            console.log(comment.data)
            getComment(id)
            document.getElementsByClassName('comment_text')[i].value = "";
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='explore'>
            <Link to='/publish' className="publish">Publish an Idea</Link>
            {
                ideas.map((ideas, i) => {
                    getUser(ideas.published_by).then(value => {
                        document.getElementsByClassName('poster')[i].innerText = value.name;
                        document.getElementsByClassName('connect')[i].href = value.linkedin;
                    })
                    return (
                        <div className="idea_box">
                            <div className="author">
                                <IoPersonCircleSharp className="dp" />
                                <h3 className="poster"></h3>
                                <a href='' target='_blank' className="connect">Connect</a>
                            </div>
                            <div className="idea">
                                <img src={ideas.image} alt="" />
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
                                                    for(var i=0;i<element.length;i++){
                                                        element[i].innerText = "@"+value.name
                                                    }
                                                })
                                                return (
                                                    <div className="comment">
                                                        <IoPersonCircleSharp className="dp" />
                                                        <div className={comment.comment_by}></div>
                                                        <div className="text">{comment.comment_text}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    {Real_Boolean(localStorage.getItem("loggedin")) ? (
                                        <div className="post_comment">
                                            <input type="text" className='comment_text' />
                                            <AiOutlineSend className='send_icon' onClick={() => Comment(ideas.id, i)} />
                                        </div>
                                    ) : (
                                        <div className=""></div>
                                    )
                                    }
                                </div>
                            </details>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Explore
