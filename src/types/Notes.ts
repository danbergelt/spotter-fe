import { RefObject } from 'react';

export interface NotesProps {
  notes: string;
  notesRef: RefObject<HTMLTextAreaElement>;
}
