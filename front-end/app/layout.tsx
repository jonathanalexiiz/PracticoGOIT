// import "./globals.css";
import Header from "./components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Header/>
      <body>
        {children}
      </body>
    </html>
  );
}
