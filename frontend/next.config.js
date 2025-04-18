// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/data',
        destination: 'http://localhost:8000/api/data',
      },
      {
        source: '/api/ai/:path*',
        destination: 'http://localhost:8000/api/ai/:path*',
      },
    ];
  },
};
