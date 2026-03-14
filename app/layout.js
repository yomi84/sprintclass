import './globals.css'

export const metadata = {
  title: 'SprintClass Board',
  description: 'Agile Learning Management System',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
