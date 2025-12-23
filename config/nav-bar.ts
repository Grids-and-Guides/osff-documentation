import { DefaultTheme } from 'vitepress'

export function navBar(): DefaultTheme.NavItem[] {
  return [
    { text: 'Guide', link: '/guide/intro',activeMatch: '/guide' },
    { text: 'Examples', link: '/examples/markdown-examples',activeMatch: '/examples' }
  ]
}
