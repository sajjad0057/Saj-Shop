import React,{useState,useEffect} from 'react'
import { Button , Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
 
const SearchBox = () => {

    const [keyword, setKeyword] = useState("")

    let history = useHistory()
    const submitHandler = (e) =>{
        console.log("SearchBox --->",history);
        e.preventDefault()
        if(keyword){
            history.push(`/?keyword=${keyword}&page=1`)
        }else{
            history.push(history.push(history.location.pathname))
        }
        
    }
    return (
        <Form
        onSubmit = {submitHandler}
        inline
        >
            <Form.Control
            type = 'text'
            name = "q"
            placeholder = "search"
            onChange = {(e)=>setKeyword(e.target.value)}
            className = "mr-sm-2 ml-sm-5"
            >

            </Form.Control>
            <Button
            type = "submit"
            variant = 'outline-info'
            className = "p-2 rounded"
            >
                Search
            </Button>

        </Form>
    )
}

export default SearchBox
