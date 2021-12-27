import React, { Component } from 'react'

export default class AddNote extends Component {
    constructor(props) {
        super(props)

        this.state = {
            titleInput: "",
            bodyInput: "",
            photoInput: "",
            loading: false,
            error: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangePhoto = this.handleChangePhoto.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleChangePhoto(event) {
        if (['jpg', 'png', 'jpeg'].some(char => event.target.value.endsWith(char))) {
            this.setState({ photoInput: event.target.value })
        } else {
            //Default 
            this.setState({ [event.target.name]: 'https://cdn.pixabay.com/photo/2017/05/13/09/04/question-2309040__340.jpg' });


        }

    }

    handleSubmit(event) {
        event.preventDefault()

        this.setState({
            loading: true,
            error: false
        })

        fetch("https://manuel-backend.herokuapp.com/note/add", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
                title: this.state.titleInput,
                body: this.state.bodyInput,
                photo: this.state.photoInput,

            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    this.props.history.push("/")
                }
            })
            .catch(error => {
                console.log("Error adding item ", error)

                this.setState({
                    loading: false,
                    error: true
                })
            })
    }

    render() {
        return (
            <div className='add-item-wrapper'>
                <h2>Add Note</h2>

                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="title"
                        name="titleInput"
                        value={this.state.titleInput}
                        onChange={this.handleChange}
                        required
                    />

                    <input
                        type="text"
                        placeholder="body"
                        name="bodyInput"
                        value={this.state.bodyInput}
                        onChange={this.handleChange}
                        required
                    />


                    <input
                        type="url"
                        placeholder="url"
                        name="photoInput"
                       //value={this.state.photoInput}
                        onChange={this.handleChangePhoto}
                        required
                    />

                    <button type="submit" disabled={this.state.loading}>Add Item</button>
                </form>

                {this.state.loading ? <div className="loading">Submitting...</div> : null}

                {this.state.error ? <div className="error">An error occured... Please try again later.</div> : null}
            </div>
        )
    }
}