import React from 'react'
import Public from "@mui/icons-material/Public"
import StarsIcon from '@mui/icons-material/Stars';
import WorkIcon from '@mui/icons-material/Work';
import "./css/sidebar.css"
import { Link } from 'react-router-dom'
function Sidebar() {
    
    return (
        <div className="sidebar">
            
            <div className='sidebar-container'>
                <div className='sidebar-options'>
                    <div className='sidebar-option'>
                        <Link to="/">Home</Link>
                    </div>
                    <div className='sidebar-option'>
                        <Link to="/">PUBLIC</Link>
                        <div className='link'>
                            <div className='link-tags'>
                                <Public />
                                <Link to="/">Ouestions</Link>
                            </div>
                            <div className='tags'>
                                <p>Tags</p>
                                <p>Users</p>
                            </div>
                        </div>
                    </div>
                    <div className='sidebar-ootion'>
                        <p>COLLECTIVE</p>
                        <div className='link'>
                            <div className='link-tags'>
                                <StarsIcon />
                                <Link to="/">Explore Collectives</Link>
                            </div>
                        </div>
                    </div>

                    <div className='sidebar-option'>
                        <p>FIND YOUR INTERESTS</p>
                        <div className='link'>
                            <div className='link-tags'>
                                <Link to="/">Go to Community</Link>
                            </div>

                        </div>
                    </div>


                    <div className='sidebar-option'>
                        <p>TEAMS</p>
                        <div className='link'>
                            <div className='link-tags'>
                                <WorkIcon />
                                <Link to="/">Departments</Link>
                            </div>

                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Sidebar