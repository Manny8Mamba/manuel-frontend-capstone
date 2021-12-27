import React from 'react'
import { Link } from "react-router-dom"

export default function Home() {
    return (
        <div className='home-wrapper'>
            <h1>Welcome to my Notes!</h1>
            <div className="home-buttons-wrapper">
                <Link to="/notes">See all my notes</Link>
                <Link to="/add-notes">Add an note</Link>
            </div>
        </div>
    )
}