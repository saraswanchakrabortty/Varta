import React from 'react'
import { Link } from "react-router-dom"
import AllQuestions from './AllQuestions';
import FilterListIcon from '@mui/icons-material/FilterList';

import "./css/main.css"
function Main({questions}) {
  return (
    <>
    <div className='main'>
      <div className='main-container'>
        <div className='main-top'>
          <h2>All Questions</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className='main-des'>
          <p>{questions && questions.length} Questions</p>
          <div className='main-filter'>
            <div className='main-tabs'>

              <div className='main-tab'>
                <Link to="/">Newest</Link>
              </div>
              <div className='main-tab'>
                <Link to="/">Active</Link>
              </div>
              <div className='main-tab'>
                <Link to="/">More</Link>
              </div>
            </div>
            <div className='main-filter-item'>
              <FilterListIcon />
              <p>Filter</p>
            </div>
          </div>
        </div>
        {/*the questions section  */}

        
          <div className='questions'>
          {
            questions.map((_q, index)=>(
              <div key={index} className='question'>
              <AllQuestions question={_q}/>
            </div>
            ))
          }
            
          </div>

          {/* end of question section */}
      </div>
    </div>
    </>
  )
}

export default Main