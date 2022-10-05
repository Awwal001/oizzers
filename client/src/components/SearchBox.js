import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {
    const [keyword, setKeyword] = useState('')

    let history = useHistory()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            history.push(`/?keyword=${keyword}&page=1`)
        } else {
            history.push(history.push(history.location.pathname))
        }
    }
    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                type='text'
                name='q'
                style={{ backgroundColor: 'white' }}
                onChange={(e) => setKeyword(e.target.value)}
                className=' ml-auto'
            ></Form.Control>

            <Button
                type='submit'
                className='submitReview p-2 ml-auto'
            >
                Search
            </Button>
        </Form>
    )
}

export default SearchBox
