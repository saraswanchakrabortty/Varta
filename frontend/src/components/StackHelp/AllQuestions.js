import { Avatar } from '@mui/material'
import React from 'react'
import {Link} from "react-router-dom"
import HTMLReactParser from 'html-react-parser'
import "./css/AllQuestions.css"
function AllQuestions({question}) {
    console.log(question?.tags[0])
    let tags = JSON.parse(question?.tags[0])

    function truncate(str,n){
        return str?.length > n ? str.substr(0,n-1) + "..." : str
    }
    // const tags = []
  return (
    <>
    <div className='all-questions'>
        <div className='all-questions-container'>
            <div className='all-questions-left'>
                <div className='all-options'>
                    
                    <div className='all-option'>
                        <p>0</p>
                        <span>votes</span>
                    </div>

                    <div className='all-option'>
                        <p>{question?.answerDetails?.length}</p>
                        <span>Answers</span>
                    </div>

                    <div className='all-option'>
                        <small>0 views</small>
                    </div>
                </div>
            </div>
             
             {/* The question Answers */}

             <div className='question-answer'>
                <Link to={`/question?q=${question?._id}`}>{question?.title.toString()}</Link>
                <div style={{
                    maxwidth:"90%",
                    color:"rgba(255, 255, 255, 0.7)",
                }}>
                    <div>
                     {HTMLReactParser(truncate(question?.body,200))}
                    </div>
                </div>
                <div style={{
                            display:"flex",
                         }}>
                {
                    tags.map((_tag,index)=>(
                       
                            <span key={index} className='question-tags'>
                                {_tag}
                            </span>
                         
                    ))
                }
                </div>

             <div className='author'>
                <small>{new Date(question?.created_at).toLocaleString()}</small>
                <div className='author-details'>
                    <Avatar src={question?.user?.photo}/>
                    <p>{question?.user?.displayName ? question?.user?.displayName : String(question?.user?.email).split('@')[0]}</p>
                </div>
             </div>
             </div>
             
        </div>
    </div>
    </>
  ) 
}

export default AllQuestions