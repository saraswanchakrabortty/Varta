import React, { useEffect, useState } from 'react'
import './css/index.css'
import Sidebar from './Sidebar'
import Main from './Main'
import axios from 'axios'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { result } from '../Header/Header'
function Index() {
  const [questions, setQuestions] = useState([])
  console.log(result)
  useEffect(() => {
    async function getQuestion() {
      await axios.get('https://stackhelp-api.onrender.com/api/question').then((res) => {
        console.log(res.data)
        setQuestions(res.data.reverse())
      }).catch((err) => {
        console.log(err)
      })
    }
    getQuestion()


  }, [])

  return (
    <div className='stack-index'>
      <div className='stack-index-content'>
        <Sidebar />
        {
          !questions ? (<Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
          ):(
            <Main questions={questions} />
          )
            }
        
      </div>
    </div>
  )
}

export default Index