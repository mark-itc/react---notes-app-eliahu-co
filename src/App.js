import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';



import logo from './logo.svg';
import './App.css';

function NotesContainer() {
  const [noteItems, setNoteItems] = useState([]);

  const date = new Date();
  const addNote = () => {
    const newNote = 'New example note';
    setNoteItems([...noteItems, newNote]);
  }
    return (
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Notes App</h1>
        <Button onClick={addNote}>Add Note</Button>
        <Container id="items" className="p-3 d-flex flex-wrap"> 
          {noteItems.map((item) => (
             <Card border="secondary" className="m-1" style={{ width: '18rem' }}>
             <Card.Header>{date.toDateString()} at {date.getUTCHours()}:{date.getUTCMinutes()}</Card.Header>
             <Card.Body>
               <Card.Title>Note Title</Card.Title>
               <Card.Text>
                {item}
               </Card.Text>
             </Card.Body>
           </Card>
            ) )}
        </Container>
      </Container>
    );
}

function App() {

  console.log("render!");

  return (
    <Container className="p-3">
      <NotesContainer />
  </Container>
);
}

export default App;
