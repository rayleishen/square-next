import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Second Savour Payments Subdomain",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
