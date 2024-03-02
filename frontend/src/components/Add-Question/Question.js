import React, { useState } from 'react'
import RectQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './quill.css'
import {TagsInput} from "react-tag-input-component"
import './taginput.css'
import "./questest.css"

import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {selectUser} from '../../features/userSlice'
const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // Text formatting: bold, italic, underline, strike
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],         // Headers: h1, h2, h3, h4, h5, h6
  [{ 'size': ['small', false, 'large', 'huge'] }],   // Font size: small, normal, large, huge
  [{ 'color': [] }, { 'background': [] }],           // Text color and background color
  [{ 'font': [] }],                                 // Font family
  [{ 'align': [] }],                                // Text alignment: left, center, right, justify
  ['blockquote', 'code-block'],                      // Blockquote and code block
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],     // Ordered and unordered lists
  ['link', 'image', 'video'],                        // Links, images, and videos
  ['clean']                                         // Remove formatting
];

function Question() {
  const user = useSelector(selectUser)

  const [loading,setLoading] = useState(false)
  
  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")
  const [tags,setTags] = useState([])
  const history = useHistory()

  // the quill handle
  const handleQuill = (value)=>{
    setBody(value)
  }

  // add question to data base
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)
    if(title !== " " && body !== " " && tags !== " "){
      const bodyJSON ={
        title:title,
        body:body,
        tag:JSON.stringify(tags),
        user:user
      }

      await axios.post('https://stackhelp-api.onrender.com/api/question',bodyJSON).then((res)=>{
        alert("Question added succesfully")
        setLoading(false)
        history.push('/')
      }).catch((err)=>{
        console.log(err)
        setLoading(false)
      })
    }else{
      alert("All filed must be filed")
    }

  }
  return (
    <>
    <div className='add-question'>
      <div className='add-question-container'>
        <div className='head-title'>
          <h1>Ask a public Question</h1>
        </div>

        {/* main question div */}
        <div className='question-container'>
          <div className='question-options'>
            {/* the question options */}
            <div className='question-option'>
              {/* Question title section */}
              <div className='title'>
                <h3>Title</h3>
                <small>Be specific and and imaging you're asking a
                  question to another person</small>
                <input type='text' value={title} onChange={(e)=>setTitle(e.target.value)} placeholder='Add the question title'></input>
              </div>
            </div>
            <div className='question-option'>
              {/* the question body section */}
              <div className='title'>
                <h3>Body</h3>
                <small>Include all the information someone would need to 
                  answer your question
                </small>
                <RectQuill modules={{toolbar:toolbarOptions}} formats={null} value={body} onChange={handleQuill} className='react-quill' theme='snow'/>
              </div>
              {/* End the question body section */}
            </div>
            <div className='question-option'>
              {/* Tag section of question */}
              <div className='title'>
                <h3>Tags</h3>
                <small>Add up to 5 tags to describe what your question is about</small>
                  <TagsInput value={tags} onChange={setTags} name='tags' placeHolder='press enter to add new tag'/>
              </div>
              {/* End Tag section of question */}
            </div>
          </div>
        </div>
        <button type='submit' disabled={loading} onClick={handleSubmit} className='button'>
          {loading ? 'Adding Question...' : 'Add your Question'}</button>
      </div>
    </div>
    </>
  )
}

export default Question