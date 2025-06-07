// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: magic;
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: magic;
class UI {
  constructor() {
    this.state = {};
    this.methods = {};
    this.components = {};
  }

  renderComponent(component) {
    if (typeof component.type === "function") {
      component = component.type(component.props || {}, this.state);
    }

    if (typeof component.type === "string" && this.components[component.type]) {
      component = this.components[component.type](component.props || {}, this.state);
    }

    const { type, props = {}, children = [] } = component;

    const attrs = [];
    const styleParts = [];

    if (props.id) attrs.push(`id="${props.id}"`);
    if (props.textBind) attrs.push(`id="${props.textBind}"`);
    if (props.type) attrs.push(`type="${props.type}"`);
    if (props.placeholder) attrs.push(`placeholder="${props.placeholder}"`);
    if (props.src) attrs.push(`src="${props.src}"`);
    if (props.valueBind) attrs.push(`data-valuebind="${props.valueBind}"`);
    if (props.onClick) attrs.push(`data-onclick="${props.onClick}"`);
    if (props.onclick) attrs.push(`data-onclick="${props.onclick}"`);
    if (props.oninput) attrs.push(`data-oninput="${props.oninput}"`);

    // Support dataset (ex: dataset.url) — transform en data-url="..."
    if (props.dataset) {
      for (const [key, val] of Object.entries(props.dataset)) {
        attrs.push(`data-${key.toLowerCase()}="${val}"`);
      }
    }

    if (props.style) {
      styleParts.push(...Object.entries(props.style).map(([k, v]) => {
        const kebabKey = k.replace(/([A-Z])/g, '-$1').toLowerCase();
        return `${kebabKey}:${v}`;
      }));
    }

    if (props.styleBind) {
      for (const [k, v] of Object.entries(props.styleBind)) {
        styleParts.push(`${k}:\${state["${v}"]}`);
        attrs.push(`data-stylebind-${k}="${v}"`);
      }
    }

    if (styleParts.length) {
      attrs.push(`style="${styleParts.join(";")}"`);
    }

    const innerText = props.textBind
      ? `\${state["${props.textBind}"] ?? ""}`
      : (props.innerText || "");

    const inner = (children || []).map(c => this.renderComponent(c)).join("");

    if (["img", "input", "br", "hr", "meta", "link"].includes(type)) {
      return `<${type} ${attrs.join(" ")} />`;
    } else {
      return `<${type} ${attrs.join(" ")}>${innerText}${inner}</${type}>`;
    }
  }

  generateHTML(data, externalScript = "") {
    this.state = data.state || {};
    this.methods = data.methods || {};
    this.components = data.components || {};

    const root = typeof data.html === "function" ? data.html() : data.html;
    const html = this.renderComponent(root);

    const stateJSON = JSON.stringify(this.state);
    const methodsJS = Object.entries(this.methods)
      .map(([key, fn]) => `"${key}": ${fn.toString()}`)
      .join(",\n");

    return `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: -apple-system; padding: 20px; }
    button { padding: 10px; margin: 5px; border: none; border-radius: 5px; }
    input { padding: 10px; margin: 5px 0; width: 100%; border-radius: 5px; border: 1px solid #ccc; }
  </style>
</head>
<body>
  <div id="app">${html}</div>

  <script>
    window.state = ${stateJSON};
    window.methods = { ${methodsJS} };

    // Fonction utilitaire pour re-render dynamiquement les composants basés sur des arrays
    function rerenderArrayBindings() {
      document.querySelectorAll('[data-array-bind]').forEach(container => {
        const arrayKey = container.dataset.arrayBind;
        const templateKey = container.dataset.template;
        
        if (state[arrayKey] && Array.isArray(state[arrayKey])) {
          // Vider le conteneur
          container.innerHTML = '';
          
          // Re-créer les éléments basés sur l'array
          state[arrayKey].forEach((item, index) => {
            if (window.templates && window.templates[templateKey]) {
              const element = window.templates[templateKey](item, index);
              container.appendChild(element);
            }
          });
        }
      });
    }

    function refresh() {
      // Mise à jour textes et valeurs bindées
      for (const key in state) {
        const elById = document.getElementById(key);
        if (elById) {
          if (elById.tagName === "INPUT" && elById.type !== "color") {
            if (Array.isArray(state[key])) {
              elById.value = JSON.stringify(state[key]);
            } else {
              elById.value = state[key];
            }
          } else {
            if (Array.isArray(state[key])) {
              elById.innerText = state[key].join(', ');
            } else {
              elById.innerText = state[key];
            }
          }
        }

        document.querySelectorAll(\`[data-valuebind="\${key}"]\`).forEach(input => {
          if (Array.isArray(state[key])) {
            input.value = JSON.stringify(state[key]);
          } else {
            input.value = state[key];
          }
        });
      }

      // Mise à jour styles bindés
      document.querySelectorAll("*").forEach(el => {
        for (const attr of el.attributes) {
          if (attr.name.startsWith("data-stylebind-")) {
            const styleKey = attr.name.slice("data-stylebind-".length);
            const stateKey = attr.value;
            el.style[styleKey] = state[stateKey];
          }
        }
      });

      // Re-render des bindings d'arrays
      rerenderArrayBindings();
    }

    // Fonctions utilitaires pour manipuler les arrays dans le state
    window.addToArray = function(arrayKey, item) {
      if (!state[arrayKey]) state[arrayKey] = [];
      state[arrayKey].push(item);
      refresh();
    };

    window.removeFromArray = function(arrayKey, index) {
      if (state[arrayKey] && Array.isArray(state[arrayKey])) {
        state[arrayKey].splice(index, 1);
        refresh();
      }
    };

    window.updateArrayItem = function(arrayKey, index, newValue) {
      if (state[arrayKey] && Array.isArray(state[arrayKey]) && state[arrayKey][index] !== undefined) {
        state[arrayKey][index] = newValue;
        refresh();
      }
    };

    window.setState = function(key, value) {
      state[key] = value;
      refresh();
    };

    document.addEventListener("DOMContentLoaded", () => {
      document.querySelectorAll("[data-onclick]").forEach(el => {
        const fnName = el.dataset.onclick;
        el.addEventListener("click", (event) => {
          if (methods[fnName]) {
            methods[fnName](event);
            refresh();
          }
        });
      });

      document.querySelectorAll("[data-oninput]").forEach(el => {
        const fnName = el.dataset.oninput;
        el.addEventListener("input", (event) => {
          if (event.target.dataset.valuebind) {
            const key = event.target.dataset.valuebind;
            let value = event.target.value;
            
            // Essayer de parser comme JSON si ça ressemble à un array
            if (value.startsWith('[') && value.endsWith(']')) {
              try {
                value = JSON.parse(value);
              } catch (e) {
                // Garder la valeur string si le parsing échoue
              }
            }
            
            state[key] = value;
          }
          if (methods[fnName]) {
            methods[fnName](event);
          }
          refresh();
        });
      });

      refresh();
    });
  </script>

  ${externalScript}
</body>
</html>
`;
  }

  async render(data, externalScript = "") {
    const html = this.generateHTML(data, externalScript);
    const wv = new WebView();
    await wv.loadHTML(html);
    await wv.present(true);
  }
}

module.exports = UI;