// src/app/layout.js
import { Inter, Roboto } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export const metadata = {
  title: 'Miko N8N Clone',
  description: 'Workflow automation platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  );
}