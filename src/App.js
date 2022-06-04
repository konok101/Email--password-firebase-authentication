
import './App.css';
import app from './firebase.init.';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [validated, setValidated] = useState(false);
  const [resister, setResister] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleNameBlur = event => {
    setName(event.target.value)
  }

  const HandleEmailBlur = (event) => {
    setEmail(event.target.value)

  }

  const handlePassBlur = (event) => {
    setPassword(event.target.value)
  }
  const handeRegisterChange = event => {
    setResister(event.target.checked)
  }
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();

      return;

    }
    if (!/(?=.*[0-9])/.test(password)) {
      setError('Password should at least one digit');
      return;

    }
    setValidated(true);
    setError('');
    if (resister) {
      console.log(email, password)
      signInWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user)
        })
        .catch(error => {
          console.error(error);
          setError(error.message);
        })
    }
    else {


      createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
          const user = result.user;
          console.log(user);
          setEmail('');
          setPassword('');
          verifiyEmail();
          setUserName();
        })
        .catch(error => {
          console.error(error);
          setError(error.message)
        })

    }

    event.preventDefault()
  }

  const handlePassReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('email sent')
      })

  }

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('updated name')
      })
      .catch(error => {
        setError(error.message)
      })
  }


  const verifiyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('email verification called')
      })
  }
  return (
    <div  >
      <div className='mx-auto w-25'>
        <h2>Please {resister ? 'Login' : 'Register'}</h2>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          {
            !resister && <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Your name</Form.Label>
              <Form.Control onBlur={handleNameBlur} type=" text" placeholder="Enter email" required />

              <Form.Control.Feedback type="invalid">
                Please provide your name.
              </Form.Control.Feedback>
            </Form.Group>
          }
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Email</Form.Label>
            <Form.Control onBlur={HandleEmailBlur} type=" email" placeholder="Enter email" required />

            <Form.Control.Feedback type="invalid">
              Please provide your email.
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
            <Form.Check onChange={handeRegisterChange} type="checkbox" label="Already resister" />
          </Form.Group>

          <p className='text-danger'>{error}</p>
          <Button onClick={handlePassReset} variant='link'>Forget password</Button>
          <Button variant="primary" type="submit">
            {resister ? 'Login' : 'REgister'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
