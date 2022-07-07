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
        logo: "/heart.svg"
    }
})