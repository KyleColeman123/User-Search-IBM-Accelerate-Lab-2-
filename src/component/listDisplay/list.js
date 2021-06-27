import React, {Component} from 'react'
import axios from 'axios'
import { Button } from '@material-ui/core'
import { TextField } from '@material-ui/core'


class List extends Component{
    constructor(props){
        super(props)

        this.state = {
            users: []
        }
    }

    componentDidMount(){
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => {
            console.log(response)
            this.setState({users: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }

     
    


    render(){
        const {users} = this.state
        users.sort()

        function chnge(){
            
        }

        return(
            <div>
                <h1>List of Users</h1>
                <TextField onChange={chnge} label="Search" size="small"></TextField>
                <Button >Search</Button>
                <div id="list">
                {
                    users.map(users => <div id={users.id} key={users.id}>Name: {users.name} | Email: {users.email} | Phone: {users.phone} | City: {users.address.city}</div>)
                }
                </div>
                
            </div>
        )
    }
}

export default List