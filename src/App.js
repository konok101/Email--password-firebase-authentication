
import './App.css';
import app from './firebase.init.';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [validated, setValidated] = useState(false);
  const [error, setError]= useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 



  const HandleEmailBlur = (event) => {
    setEmail(event.target.value)

  }

  const handlePassBlur = (event) => {
    setPassword(event.target.value)
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();

      return;

    }
    if(!/(?=.*[0-9])/.test(password)){
setError('Password should at least one digit');
      return 

    }
    setValidated(true);
    setError('');

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(error => {
        console.error(error);
      })
    event.preventDefault()
  }

  return (
    <div  >
      <div className='mx-auto w-25'>
        <h2>Please registration</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={HandleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <p className='text-danger'>{error}</p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
