import React from 'react'
import { NavLink } from "react-router-dom"

export default function Nav() {
    return (
        <div className='nav-wrapper'>
            <NavLink to="/">Notes</NavLink>
            <NavLink to="/add-notes">Add Note</NavLink>
        </div>
    )
}