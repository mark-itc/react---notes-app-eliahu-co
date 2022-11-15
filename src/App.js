import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';

import logo from './logo.svg';
import './App.css';

function NoteModal(props) {
  const {item, close, show} = props;
  console.log({item});

  return (
    <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>{item.txt}</Modal.Title>
        </Modal.Header>
        <Modal.Body>This is note number {item.id+1} and it was created at {item.date} </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

function NoteItem(props) {
  const { itemId, itemText, dateCreated, onDeleteItemHandler, onNoteClickHandler } = props;

  return (
    <Card border="secondary" className="m-1" style={{ width: '18rem' }}>
             <Card.Header> {dateCreated} <Button onClick={() => {onDeleteItemHandler(itemId)}} variant="outline-danger" size="sm">X</Button></Card.Header>
             <Card.Body onClick={() => {onNoteClickHandler(itemId)}}>
               <Card.Title>{`Note Title [${itemId+1}]`}</Card.Title>
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
  const [show, setShow] = useState(false);
  const [ModalItem, setModalItem] = useState()

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const date = new Date();
  const isEmptyNotes = noteItems.length === 0;

  const newNote = {id: id, txt: 'New example note', date: `${date.toDateString()} at ${date.getUTCHours()}: ${date.getUTCMinutes()}`};

  const onDeleteItem = (itemToDelete) => {
    window.confirm("Are you sure that you want to delete this note?");
    const NoteItemsWithoutDeletedItems = noteItems.filter((item) => item.id !== itemToDelete);
    setNoteItems(NoteItemsWithoutDeletedItems);
  }

  const onNoteClick = (noteToOpen) => {
    const noteItemForModal = noteItems.filter((item) => item.id == noteToOpen);
    setModalItem(noteItemForModal);
    setShow(true);
    
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
            <NoteItem itemId={item.id} itemText={item.txt} dateCreated={item.date} onDeleteItemHandler={onDeleteItem} onNoteClickHandler={onNoteClick}  />
              ) )}
          
          {show && <NoteModal item={ModalItem[0]} close={handleClose} show={handleShow}/>} 
            
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
