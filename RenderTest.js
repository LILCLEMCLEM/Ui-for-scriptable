// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic;
const UI = importModule("ui");

const ui = new UI();

const data = {
  state: {
    count: 0,
    name: "Alice",
    color: "#007aff",
    pickerw: "200px"
  },
  methods: {
    increment: function () {
      state.count += 1;
    },
    decrement: function () {
      state.count -= 1;
    },
    onNameChange: function (e) {
      state.name = e.target.value;
    },
    onColorChange: function (e) {
      state.color = e.target.value;
    }
  },
  components: {
    Counter: () => ({
      type: "div",
      children: [
        {
          type: "h1",
          props: {
            textBind: "count",
            styleBind: { color: "color" }
          }
        },
        {
          type: "button",
          props: {
            innerText: "+",
            onClick: "increment",
            styleBind: { backgroundColor: "color", color: "color" }
          }
        },
        {
          type: "button",
          props: {
            innerText: "-",
            onClick: "decrement",
            styleBind: { backgroundColor: "color", color: "color" }
          }
        }
      ]
    }),
    NameEditor: () => ({
      type: "div",
      children: [
        {
          type: "input",
          props: {
            valueBind: "name",
            oninput: "onNameChange"
          }
        },
        {
          type: "div",
          props: {
            textBind: "name",
            styleBind: { color: "color", fontWeight: "bold" }
          }
        }
      ]
    }),
    ColorPicker: () => ({
      type: "input",
      props: {
        type: "color",
        valueBind: "color",
        oninput: "onColorChange",
        styleBind: {width:"pickerw"}
      }
    })
  },
  html: () => ({
    type: "div",
    children: [
      { type: "Counter" },
      { type: "NameEditor" },
      { type: "ColorPicker" }
    ]
  })
};

ui.render(data);