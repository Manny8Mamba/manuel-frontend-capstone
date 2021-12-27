import React, { Component } from 'react'

export default class Notes extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        fetch("https://manuel-backend.herokuapp.com/note/get")
        .then(response => response.json())
        .then(data => {
            this.setState({
                items: data,
                loading: false
            })
        })
        .catch(error => {
            console.log("Error getting items ", error)
            this.setState({
                error: true,
                loading: false
            })
        })
    }

    renderNotes() {
        const itemsHtml = this.state.items.map(item => (
            <div className="item-wrapper" key={item.id}>
                <h1>{item.title}</h1>
                <p>{item.body}</p>
                <img src={item.photo}/>
              
            </div>
        ))

        return itemsHtml
    }

    render() {
        if (this.state.loading) {
            return (
                <div className='items-page-wrapper'>
                    <h2>Notes</h2>
                    <div className='items-wrapper'>
                        <div className="loading">Loading...</div>
                    </div>
                </div>
            )
        }

        else if (this.state.error) {
            return (
                <div className='items-page-wrapper'>
                    <h2>Notes</h2>
                    <div className='items-wrapper'>
                        <div className="error">An error occured... Please try again later.</div>
                    </div>
                </div>
            )
        }

        else {
            return (
                <div className='items-page-wrapper'>
                    <h2>Notes</h2>
                    <div className="items-wrapper">
                        {this.renderNotes()}
                    </div>
                </div>
            )
        }
    }
}