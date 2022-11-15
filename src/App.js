import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import logo from './logo.svg';
import './App.css';

function NoteItem(props) {
  const { itemId, itemText, dateCreated, onDeleteItemHandler } = props;

  return (
    <Card border="secondary" className="m-1" style={{ width: '18rem' }}>
             <Card.Header> {dateCreated} <Button onClick={() => {onDeleteItemHandler(itemId)}} variant="outline-danger" size="sm">X</Button></Card.Header>
             <Card.Body>
               <Card.Title>{`Note Title`}</Card.Title>
               <Card.Text>
                {itemText}
               </Card.Text>
             </Card.Body>
           </Card>
  );

}

function NotesList() {
  const [noteItems, setNoteItems] = useState([]);
  const [id, setId] = useState(0);

  const date = new Date();
  const isEmptyNotes = noteItems.length === 0;
  

  const newNote = {id: id, txt: 'New example note', date: `${date.toDateString()} at ${date.getUTCHours()}: ${date.getUTCMinutes()}`};

  const onDeleteItem = (itemToDelete) => {
    const NoteItemsWithoutDeletedItems = noteItems.filter((item) => item.id !== itemToDelete);
    setNoteItems(NoteItemsWithoutDeletedItems);
  }
 

  const addNote = () => {
    setId( count => count + 1)
    setNoteItems([...noteItems, newNote]);
  }
    return (
      <Container className="p-5 mb-4 bg-light rounded-3">
        <h1 className="header">Notes App</h1>
        <Button onClick={addNote}>Add Note</Button>
        <Container id="items" className="p-3 d-flex flex-wrap"> 
          {isEmptyNotes && <span>Looks like no notes were added yet</span>}

          {!isEmptyNotes && noteItems.map((item) => (
            <NoteItem itemId={item.id} itemText={item.txt} dateCreated={item.date} onDeleteItemHandler={onDeleteItem}  />
              ) )}
        </Container>
      </Container>
    );
}

function App() {

  return (
    <Container className="p-3">
      <NotesList />
  </Container>
);
}

export default App;
