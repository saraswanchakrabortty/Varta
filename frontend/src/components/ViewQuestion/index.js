import React from 'react'
import '../StackHelp/css/index.css'
import Sidebar from '../StackHelp/Sidebar'
import MainQuestion from './MainQuestion'
function index() {
  return (
    <>
    <div className='stack-index'>
        <div className='stack-index-content'>
            <Sidebar/>
            <MainQuestion/>
        </div>
    </div>
    </>
  )
}

export default index