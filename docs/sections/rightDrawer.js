import { injectStyle } from '../js/ui.js'
import { createList } from '../partials/list.js'
import { createListItem } from '../partials/listItem.js'

// -------------------------------
// Globals
// -------------------------------

const items = [
  {
    html: 'Tasks',
    url: '../tasks/index.html',
    id: 'rd-item-tasks',
  },
  {
    html: 'Recipes',
    url: '../recipes/index.html',
    id: 'rd-item-recipes',
  },
  {
    html: 'Shopping',
    url: '../shopping/index.html',
    id: 'rd-item-shopping',
  },
  {
    html: 'Journal',
    url: '../journal/index.html',
    id: 'rd-item-journal',
  },
  {
    html: 'Admin',
    url: '../admin/index.html',
    id: 'rd-item-admin',
  },
]

const css = `
.nav {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.nav .list-item {
  padding: 0;
  margin-bottom: 0;
  border: 1px solid transparent;
  border-radius: 0;
  font-size: 1.1rem;
  text-align: left;
  width: 100%;
  transition: background 200ms ease;
}
.nav .list-item:last-child {
  margin-top: auto;
}
.nav .list-item a,
.nav .list-item a:visited {
  padding: 12px 20px;
  display: block;
  width: 100%;
  color: var(--gray5);
  text-shadow: none;
}
.nav .list-item:hover {
  background: var(--gray2);
  transform: none;
}
.nav .list-item[data-selected="true"] {
  background: var(--purple2);
}
[data-id="right-drawer"] {
  position: fixed;
  top: var(--nav-height);
  right: 0;
  height: calc(100% - var(--nav-height));
  width: 250px;
  background: var(--gray1);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.3);
  transform: translateX(100%);
  transition: transform 300ms ease;
  z-index: 10;
}
[data-id="right-drawer"].open {
  transform: translateX(0);
}
`

// -------------------------------
// Exported functions
// -------------------------------

export function createRightDrawer(config) {
  injectStyle(css)
  const el = createElement(config)
  return el
}

// -------------------------------
// Helpers
// -------------------------------

/**
 *
 */
function createElement({ active }) {
  const listEl = createList({ id: 'right-drawer', className: 'nav' })

  const listItems = items.map(({ html, url, id }) =>
    createListItem({ value: html, url, id, type: 'anchor' })
  )
  listEl.addChildren(listItems)
  if (active) {
    const id = `rd-item-${active}`
    const child = listEl.getChildById(id)
    child.selected = true
  }

  return listEl
}
