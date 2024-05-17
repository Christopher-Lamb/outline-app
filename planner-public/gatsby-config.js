/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: "/outline-app",
  siteMetadata: {
    title: `planner`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-use-query-params",
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `My Gatsby Site`,
        short_name: `GatsbySite`,
        start_url: `/`,
        background_color: `#f7f7f7`,
        theme_color: `#3f51b5`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // The path to your icon file
      },
    },
  ],
};
