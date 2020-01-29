import uuid from 'uuid';

interface INote {
  id: string;
  title: string;
  content: string;
  creation: number;
  modification: number;
}

const notes: INote[] = []

function createNote(): INote {
  return {
    id: uuid.v4(),
    title: '',
    content: '',
    creation: Date.now(),
    modification: Date.now(),
  }
}

function getNote( id: string ) {
  return notes.find( note => note.id === id )
}

function saveNote( update: INote ) {
  const note = getNote( update.id )
  if( note ) {
    update.modification = Date.now()
    Object.assign( note, update )
  } else {
    notes.push( update )
  }
}
