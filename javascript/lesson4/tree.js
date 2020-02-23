class myLeaf extends HTMLElement {
  connectedCallback() {
    this.innerHTML = this.id ? `ID: ${this.id}` : "";
  }
}

class myTree extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.renderTree(JSON.parse(this.dataset.tree), +this.dataset.level || 1);
  }

  renderTree(tree, lvl) {
    const branch = "—";
    let spaces = "&nbsp;".repeat(lvl);
    let content = `${tree.id > 1 ? "<br>" : ""}${spaces} Level ${lvl}.<br>`;

    if (tree.items && tree.items.length) {
      let leaves = tree.items.map((item, i) => {
        if (!i)
          return `${spaces}&nbsp;|${branch} <my-leaf id="${item}"></my-leaf>`;
        return `<my-leaf id="${item}"></my-leaf>`;
      });
      content += leaves.join(`<br>${spaces}&nbsp;|${branch} `);
      if (tree.subtree) {
        content += `<br>${spaces}&nbsp;|`;
        content += `<br>${spaces}&nbsp;\\`;
      }
    } else {
      content += `${spaces} <my-leaf></my-leaf>`;
    }

    if (tree.subtree) {
      tree.subtree.forEach(item => {
        content += `<my-tree data-tree=${JSON.stringify(
          item
        )} data-level=${lvl + 1}></my-tree>`;
      });
    }

    this.shadowRoot.innerHTML = content;
  }
}

customElements.define("my-tree", myTree);
customElements.define("my-leaf", myLeaf);
