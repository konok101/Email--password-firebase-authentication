
import './App.css';
import app from './firebase.init.';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';

const auth = getAuth(app)

function App() {

  const [email, setEmail]=useState('');
  const [password, setPassword]= useState('');

  const HandleEmailBlur = (event) => {
     setEmail(event.target.value)

  }

  const handlePassBlur = (event) => {
     setPassword(event.target.value)
  }

  const handleFormSubmit = (event) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(result =>{
      const user = result.user;
      console.log(user );
    })
    .catch(error =>{
      console.error(error);
    })
    event.preventDefault()
  }

  return (
    <div  >
      <div className='mx-auto w-25'>
        <h2>Please registration</h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={HandleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassBlur} type="password" placeholder="Password" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
