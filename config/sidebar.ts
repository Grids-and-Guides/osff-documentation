import { DefaultTheme } from 'vitepress'

const guideSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Introduction',
    collapsed: false,
    items: [
      { text: 'What is Dual Serve ?', link: 'intro' },
      { text: 'Getting Started', link: 'getting-started' },
      { text: 'Add New Function', link: 'add-function' },
      { text: 'Folder Structure', link: 'folder-structure' },
      { text: 'Deployment', link: 'deployment' }
    ]
  }
]

const exampleSidebar: DefaultTheme.SidebarItem[] = [
  {
    text: 'Examples',
    items: [
      { text: 'Markdown Examples', link: 'markdown-examples' },
      { text: 'Runtime API Examples', link: 'api-examples' }
    ]
  }
]

export function sidebar(): DefaultTheme.Sidebar {
  return {
    '/guide/': {
      base: '/guide/',
      items: guideSidebar
    },
    '/examples/': {
      base: '/examples/',
      items: exampleSidebar
    }
  }
}
