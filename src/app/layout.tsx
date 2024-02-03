import '@rainbow-me/rainbowkit/styles.css'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <section>
            <div className="grid h-screen grid-cols-2">
              <div className="bg-white-500"></div>

              <div className="bg-gray-800">
                { children }
              </div>
            </div>
          </section>
        </header>
      </body>
    </html>
  )
}
