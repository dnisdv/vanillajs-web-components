import Router from "./src/router/router";
import "./src/components/note/note";
import store from "./src/store";
import "./src/components/notes/notes";
import "./src/components/emojiPicker";
import "./src/components/Todo/Todo";
import "./src/components/Todo/TodoItem/TodoItem";
import "./index.css";

const router = new Router({
  mode: "hash",
  root: "/",
});

class App extends HTMLElement {
  connectedCallback() {
    router
      .add(/note\/(.*)/, (id) => {
        const alreadyNote = store.state.notes.map((i) => +i.id === +id);

        if (!alreadyNote.includes(true)) {
          return window.history.pushState(
            null,
            null,
            `#note/${
              store.state.notes[store.state.notes.length - 1]
                ? store.state.notes[store.state.notes.length - 1].id || 1
                : 1
            }`
          );
        }
        this.innerHTML = `<note-pad note-id=${id}></note-pad>`;
        store.events.publish("updateNote");
        return store.events.publish("hashChange", id);
      })
      .add("", () => {
        return window.history.pushState(
          null,
          null,
          `#note/${
            store.state.notes[store.state.notes.length - 1]
              ? store.state.notes[store.state.notes.length - 1].id || 1
              : 1
          }`
        );
      });
  }
}

window.customElements.define("main-app", App);
