import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'UPSC Exam Compass',
  description: 'Your daily companion for cracking the UPSC exam.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="fixed inset-0 -z-20">
          <Image
            src="https://picsum.photos/1920/1080"
            alt="Library background"
            fill
            className="object-cover"
            data-ai-hint="study library"
            priority
          />
        </div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
