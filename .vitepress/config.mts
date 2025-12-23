import { defineConfig } from 'vitepress'
import { navBar, sidebar } from '../config'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'src',
  title: 'Dual Serve',
  titleTemplate: 'Dual Serve Documentation',
  cleanUrls: true,
  description: 'Dual runtime for Node.js',
  base: '/osff-documentation/',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: navBar(),

    sidebar: sidebar(),

    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/Grids-and-Guides/Dual-Serve'
      }
    ]
  }
})
