/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://agresports.org', // Replace with your website's URL
    generateRobotsTxt: true, // Generate robots.txt file
    sitemapSize: 5000, // Maximum number of URLs per sitemap file
    changefreq: 'daily', // Frequency of page updates
    priority: 0.7, // Default priority for all pages
    exclude: ['/admin', '/api/*'], // Exclude specific routes
    robotsTxtOptions: {
      policies: [
        { userAgent: '*', allow: '/' }, // Allow all user agents to access the site
        { userAgent: '*', disallow: ['/admin', '/api'] }, // Disallow specific routes
      ],
    },
  };
  
  module.exports = config;