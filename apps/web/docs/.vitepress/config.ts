import { defineConfig } from 'vitepress'

export default defineConfig({
    title: 'Couple-APP',
    description: 'Docs site for Couple-APP',
    lang: 'en-US',
    lastUpdated: true,
    titleTemplate: "Docs",

    themeConfig: {
        socialLinks: [
            { icon: 'github', link: 'https://github.com/JDDD-dev' },
            { icon: 'twitter', link: 'https://twitter.com/jezudp' },
        ],
        footer: {
            message: 'Made with ♥ by JD',
            copyright: 'Copyright © 2022-present JD'
        },
        logo: "/heart.svg",
        sidebar: [
            {
                text: 'Introduction',
                collapsible: true,
                items: [
                    { text: 'What is Couple?', link: '/what-couple' },
                    { text: 'Alpha Access', link: '/get-alpha-access' }
                ]
            },
            {
                text: 'Features',
                collapsible: true,
                items: [
                    { text: 'Gallery', link: '/features/gallery' },
                    { text: 'Notes', link: '/features/notes' },
                    { text: 'Links Safe', link: '/features/links' }
                ]
            },
            {
                text: 'Development',
                collapsible: true,
                items: [
                    { text: 'Working', link: '/development/working' },
                    { text: 'TODO', link: '/development/todo' },
                    { text: 'Future Ideas', link: '/development/future-ideas' }
                ]
            }
        ]
    }
})