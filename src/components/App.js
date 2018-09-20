import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],

        }
    }

    componentDidMount() {
        fetch('http://localhost:3000/route/user')
            .then(res => res.json())
            .then(users => this.setState({ users }))
    }
    render() {
        return (
            <div className="App">

                <h1>My App</h1>
                <h2>users</h2>
                <ul>
                    {this.state.users.length > 0 && this.state.users.map(user =>  <li>{user.name}</li>
                           
                    )}
                </ul>
            </div>
        )

    }
}

export default App;