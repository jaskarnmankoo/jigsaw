module.exports = {
  pathPrefix: '/jigsaw',
  plugins: [
    'gatsby-plugin-csp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-preact',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'en'
      }
    }
  ],
  siteMetadata: {
    title: 'Jigsaw',
    description: 'Single player version of Jigsaw Puzzles',
    author: 'Jaskarn Mankoo'
  }
};
