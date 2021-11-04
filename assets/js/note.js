import deleteSvg from '../img/delete.svg';
import '../css/note.css';
import { COLOR } from './model';

export class Note {
  constructor(id) {
    this.id = id;
    this.title = '';
    this.content = '';
    this.color = COLOR.yellow;

    this.create();
    this.addToolbar();
    this.addEvents();
  }

  create() {
    const div = document.createElement('div');
    div.classList.add('note');
    div.classList.add(this.color);
    div.dataset.id = this.id;
    div.dataset.color = this.color;
    div.innerHTML = this.$html;
    this.$note = div;
  }

  addToolbar() {
    const toolbar = this.$note.querySelector('.toolbar');

    // palette
    const palette = Object.keys(COLOR).map((color) => {
      const button = document.createElement('button');
      button.classList.add('btn-palette', color);
      button.onclick = () => {
        this.$note.classList.replace(this.$note.dataset.color, color);
        this.$note.dataset.color = color;
      };
      return button;
    });

    toolbar.append(...palette);

    // delete button
    const button = document.createElement('button');
    button.classList.add('btn-delete');
    const img = document.createElement('img');
    img.src = deleteSvg;
    img.alt = '';
    button.appendChild(img);
    button.onclick = () => {
      this.onDelete(this.id);
    };
    toolbar.appendChild(button);
  }

  addEvents() {
    const titleInput = this.$note.querySelector('.note-title-input');
    titleInput.onkeypress = (e) => {
      this.title = e.target.value;
    };

    const content = this.$note.querySelector('.note-content');
    content.onkeypress = (e) => {
      this.content = e.target.value;
    };
  }

  onDelete() {}

  get $html() {
    return `<div class="title">
              <input type="text" class="note-title-input" placeholder="Title" value="${this.title}">
            </div>
            <div>
              <textarea class="note-content">${this.content}</textarea>
            </div>
            <div class="toolbar"></div>`;
  }
}
