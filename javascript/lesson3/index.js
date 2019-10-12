function selectorOf(node) {
  const uniqueNodes = {
    html: true,
    body: true,
    head: true
  };
  if (uniqueNodes.hasOwnProperty(node.tagName.toLowerCase()))
    return node.tagName.toLowerCase();

  if (node.id.length) return `#${node.id}`;

  const siblings = [...node.parentNode.children];
  const siblingsWithSameTag = siblings.filter(n => n.tagName === node.tagName);
  let selector = `${node.tagName.toLowerCase()}`;

  if (node.classList.length) selector += `.${node.classList[0]}`;
  if (siblingsWithSameTag.length > 1) {
    const index = siblings.findIndex(s => s === node);
    selector = `${selector}:nth-child(${index + 1})`;
  }

  return selector;
}

function getPath(element) {
  let currentElement = element.parentNode;
  let selector = selectorOf(element);

  while (document.querySelectorAll(selector).length > 1) {
    if (currentElement.tagName === "BODY") return undefined;

    selector = `${selectorOf(currentElement)} > ${selector}`;
    currentElement = currentElement.parentNode;
  }

  return selector;
}
