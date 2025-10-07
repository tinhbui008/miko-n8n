/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: 'canvas' }];

    // Suppress Ant Design compatibility warnings
    config.module.rules.push({
      test: /node_modules\/antd/,
      use: {
        loader: 'string-replace-loader',
        options: {
          search: /console\.warn\(['"`].*antd.*compatible.*['"`]\)/g,
          replace: '// Suppressed antd warning'
        }
      }
    });

    return config;
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
