import { Note } from './note.js';
import '../css/style.css';

class App {
  constructor() {
    this.notes = [];

    this.$app = document.querySelector('#app');
    this.$btnAdd = document.querySelector('.btn-add');
    this.$notes = document.querySelector('.notes');

    this.onClick();
  }

  onClick() {
    this.$btnAdd.onclick = () => {
      this.addNote();
    };
  }

  addNote() {
    const id = this.notes.length + 1;
    const note = new Note(id);
    note.onDelete = this.removeNote.bind(this);
    this.notes.push(note);
    this.$notes.appendChild(note.$note);
  }

  removeNote(id) {
    this.notes = this.notes.filter((n) => n.id !== id);
    const node = this.$notes.querySelector(`[data-id="${id}"]`);
    node.remove();
  }
}

new App();
