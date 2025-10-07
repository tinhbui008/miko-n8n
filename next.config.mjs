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
    // Chỉ ignore trong development, production nên kiểm tra lỗi
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
  typescript: {
    // Chỉ ignore trong development, production nên kiểm tra lỗi
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  }
};

export default nextConfig;
