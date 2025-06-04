// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "CodeScouts library",
  tagline: "Aprende a implementar Clean architecture con nuestra librería",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: "https://library.codescouts.academy",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "CodeScouts", // Usually your GitHub org/user name.
  projectName: "Clean Architecture library", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "es",
    locales: ["es"],
  },

  presets: [
    [
      '@docusaurus/preset-classic',

      {
        gtag: {
          trackingID: 'G-WTFQBGN55R',
        },
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/codescouts-academy/clean-architecture-libraries/blob/main/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Home",
        logo: {
          alt: "CodeScouts library",
          src: "img/logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Architecture",
          },
          {
            href: "https://www.codescouts.academy",
            label: "CodeScouts",
            position: "right",
          },
          {
            href: "https://github.com/codescouts-academy/clean-architecture-libraries",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Documentación",
            items: [
              {
                label: "Architecture",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Github",
                href: "https://github.com/codescouts-academy",
              },
              {
                label: "Youtube",
                href: "https://www.youtube.com/@code_scouts",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/code_scouts",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Web",
                href: "https://www.codescouts.academy",
              },
              {
                label: "Blog",
                href: "https://www.codescouts.academy/blog",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} CodeScouts academy`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
