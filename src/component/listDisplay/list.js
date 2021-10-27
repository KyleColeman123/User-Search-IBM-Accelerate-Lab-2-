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
        let usersConsidered = []
        let textFieldValue = ''
        users.sort(compareByCity)

        function chnge(val){
            textFieldValue = val.target.value // constantly changes value of textFieldValue to use in search()
        }

        function searchDyn(val){
            textFieldValue = document.getElementById("inField").value
            let tempArray = []
            for (let i=0; i < users.length; i++){
                if(users[i].name.toUpperCase().includes(textFieldValue.toUpperCase())){
                    tempArray.push(users[i])
                }
                else if(users[i].address.city.toUpperCase().includes(textFieldValue.toUpperCase())){
                    tempArray.push(users[i])
                }
            }
            usersConsidered = tempArray
            console.log(usersConsidered);
            for (let i=0; i<users.length; i++){
                if (usersConsidered[i] != null)
                    document.getElementById("row "+i).innerHTML = "Name: "+usersConsidered[i].name+" | Email: "+usersConsidered[i].email+" | Phone: "+ usersConsidered[i].phone+ " | City: "+ usersConsidered[i].address.city;
                if (usersConsidered[i] === void 0){
                    console.log("HEY")
                    document.getElementById("row "+i).innerHTML = '';
                }     
            } 
            if (document.getElementById("list").innerHTML != null) document.getElementById("list").innerHTML = ""
            //textFieldValue = val.target.value // constantly changes value of textFieldValue to use in search()
        }

        function search(){
            let tempArray = []
            for (let i=0; i < users.length; i++){
                if(users[i].name.toUpperCase().includes(textFieldValue.toUpperCase())){
                    tempArray.push(users[i])
                }
                else if(users[i].address.city.toUpperCase().includes(textFieldValue.toUpperCase())){
                    tempArray.push(users[i])
                }
            }
            usersConsidered = tempArray
            console.log(usersConsidered);
            for (let i=0; i<users.length; i++){
                if (usersConsidered[i] != null)
                    document.getElementById("row "+i).innerHTML = "Name:\t"+usersConsidered[i].name+"| Email:\t"+usersConsidered[i].email+"| Phone:\t"+ usersConsidered[i].phone+ "| City:\t"+ usersConsidered[i].address.city;
                if (usersConsidered[i] === void 0){
                    console.log("HEY")
                    document.getElementById("row "+i).innerHTML = '';
                }     
            } 
            if (document.getElementById("list").innerHTML != null) document.getElementById("list").innerHTML = ""
        }
            


        function compareByCity(user1, user2){
            const user1City = user1.address.city
            const user2City = user2.address.city
            if (user1City > user2City){
                return 1
            }
            else if (user1City < user2City){
                return -1
            }
            return 0
        }

        function removeRow(btnstate){
            let row = document.getElementById("user-row") 
            row.parentNode.removeChild(row)
        }
        
        return(
            <div>
                <h1>List of Users</h1>
                <TextField onChange={chnge} onInput={searchDyn} id="inField"  label="Search" size="small"></TextField>
                <Button >Search</Button>
                <div id="list">
                {   
                    users.map(users => <div id="user-row" key={users.id}>Name: {users.name} | Email: {users.email} | Phone: {users.phone} | City: {users.address.city}  
                    <Button onClick={()=>{removeRow(this)}
                    } color="secondary">Delete</Button></div>) 
                   
                }
                
                </div>
                
                <div>RESULTS 
                    <div id="row 0"></div>
                    <div id="row 1"></div>
                    <div id="row 2"></div>
                    <div id="row 3"></div>
                    <div id="row 4"></div>
                    <div id="row 5"></div>
                    <div id="row 6"></div>
                    <div id="row 7"></div>
                    <div id="row 8"></div>
                    <div id="row 9"></div>
                </div>
            </div>
        )
    }
}

export default List
