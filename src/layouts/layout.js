import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import NotificationSystem from "../components/ui/NotificationSystem"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="mytheme">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
        <NotificationSystem />
      </body>
    </html>
  )
}
