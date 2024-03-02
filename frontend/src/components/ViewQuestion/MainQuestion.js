import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import { Avatar } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

import './mainquestion.css'
import axios from 'axios'
import HTMLReactParser from 'html-react-parser';
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
// import Header from '../Header/Header';
function MainQuestion() {

    const [show, setShow] = useState(false)
    const [answer, setAnswer] = useState("")
    const [comment, setComment] = useState("")
    let search = window.location.search
    const params = new URLSearchParams(search)
    const id = params.get("q")

    const user = useSelector(selectUser)
    const [questionData, setQuestionData] = useState()

    useEffect(() => {
        async function getQuestionDeatails() {
            await axios.get(`https://stackhelp-api.onrender.com/api/question/${id}`).then((res) => {
                console.log(res.data[0])
                setQuestionData(res.data[0])
            }).catch((err) => {
                console.log(err)
            })
        }
        getQuestionDeatails()
    }, [id])

    async function getUpdatedAnswer() {
        await axios.get(`https://stackhelp-api.onrender.com/api/question/${id}`).then((res) => {
            console.log(res.data[0])
            setQuestionData(res.data[0])
        }).catch((err) => {
            console.log(err)
        })
    }
    const handleQuill = (value) => {
        setAnswer(value)
    }

    const handleSubmit = async () => {
        if (answer !== "") {
            const body = {
                question_id: id,
                answer: answer,
                user: user
            }

            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }

            await axios.post('https://stackhelp-api.onrender.com/api/answer', body, config).then((res) => {
                console.log(res.data)
                alert("Answer added successfully")
                setAnswer("")
                getUpdatedAnswer()
            }).catch((err) => {
                console.log(err)
            })

        }

    }
    const handleComment = async()=>{
        if(comment !==""){
            const body ={
                question_id:id,
                comment:comment,
                user:user
            }

            await axios.post(`https://stackhelp-api.onrender.com/api/comment/${id}`,body).then((res)=>{
                console.log(res.data)
                setComment("")
                setShow(false)
                getUpdatedAnswer()
            })
        }
    }
    const str = String(questionData?.body)
    return (
        <>
        <div className='main'>
            <div className='main-container'>
                <div className='main-top'>
                    <h2 className='main-question'>{questionData?.title}</h2>
                    <Link to="/add-question">
                        <button>Ask Question</button>
                    </Link>
                </div>
                <div className='main-desc'>
                    <div className='info'>
                        <p>{new Date(questionData?.created_at).toLocaleString()}</p>
                        <p>Active:<span>Today</span></p>
                        <p>View<span>43</span></p>
                    </div>
                </div>

                <div className='all-questions'>
                    <div className='all-questions-container'>

                        <div className='all-questions-left'>
                            <div className='all-options'>
                                <p className="arrow">▲</p>
                                <p className="arrow">0</p>
                                <p className="arrow">▼</p>
                                <BookmarkIcon />
                                <HistoryIcon />
                            </div>
                        </div>

                        <div className='question-answer'>
                            <p>{HTMLReactParser(str)}</p>
                            <div className='author'>
                                <small>asked {new Date(questionData?.created_at).toLocaleString()}</small>

                                <div className='author-details'>
                                    <Avatar src={questionData?.user?.photo} />
                                    <p>{questionData?.user?.displayName ? questionData?.user?.displayName : String(questionData?.user?.email).split('@')[0]}</p>
                                </div>
                            </div>

                            <div className='comments'>
                                
                                <div className='comment'>
                                {
                                    questionData?.comments && questionData?.comments.map((_qd)=>(
                                        <p key={_qd?._id}>{_qd?.comment} <span>{_qd?.user?.displayName ?
                                            _qd?.user?.displayName :
                                            String(_qd?.user?.email).split('@')[0]}</span><small>{new Date(_qd?.created_at).toLocaleString()}</small></p>
                                    ))
                                }
                                </div>
                                <p onClick={() => setShow(!show)}>Add a Comment</p>
                                {
                                    show && (
                                        <div className='title'>
                                            <textarea type="text"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                placeholder='add your comment' rows={5} style={{
                                                    margin: "5px 0px",
                                                    padding: "10px",
                                                    border: "1px solid rgba(0,0,0,0.2)",
                                                    borderRadius: "3px",
                                                    outline: "none",
                                                }}></textarea>
                                            <button onClick={handleComment} style={{
                                                maxWidth: "fit-content",
                                            }}>Add comment</button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>



                <div style={{
                    flexDirection: "column",
                }} className='all-questions'>
                    <p style={{
                        marginBottom: "20px",
                        fontSize: "1.3rem",
                        fontWeight: "300",
                        color:"#fff",
                    }}>{questionData?.answerDetails.length} Answer</p>
                    {
                        questionData?.answerDetails.map((_q) => (
                            <div key={_q?._id} className='all-questions-container'>

                                <div className='all-questions-left'>
                                    <div className='all-options'>
                                        <p className="arrow">▲</p>
                                        <p className="arrow">0</p>
                                        <p className="arrow">▼</p>
                                        <BookmarkIcon />
                                        <HistoryIcon />
                                    </div>
                                </div>

                                <div className='question-answer'>
                                    <p>{HTMLReactParser(_q?.answer)}</p>
                                    <div className='author'>
                                        <small>asked {new Date(_q?.created_at).toLocaleString()}</small>

                                        <div className='author-details'>
                                            <Avatar src={_q?.user?.photo} />
                                            <p>{_q?.user?.displayName ?
                                                _q?.user?.displayName :
                                                String(_q?.user?.email).split('@')[0]}</p>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
            <div className='main-answer'>
                <h3 style={{
                    fontSize: "22px",
                    margin: "10px 0",
                    fontWeight: "400",
                    color:"#fff"
                }}>Your answer</h3>
                <ReactQuill value={answer} onChange={handleQuill} className='react-quill' theme='snow' style={{ height: "200px" }} />
            </div>
            <button type='submit'
                onClick={handleSubmit}
                style={{
                    maxWidth: "fit-content",
                    marginTop: "100px",
                }}>Post Your Answer</button>
        </div>
        </>
    )
}

export default MainQuestion
