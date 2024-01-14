import type { Metadata } from 'next'
import { Poppins as PoppinsFont } from 'next/font/google'
import './globals.css'

const Poppins = PoppinsFont({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Golden Duck',
  description: 'Una banca online donde podrá, no solo gestionar su dinero, sino que incluso invertirlo. Siempre llevando un registro de cuanto dinero es ingresado y cuanto dinero es gastado, contando con categorías para saber en qué lo gasta. También podrá pagar servicios, tales como servicios de Telefonía Móvil o servicios esenciales.',
  authors: {
    name: "Lycokat",
    url: "https://lycokat.netlify.app/",
  },
  category: "Virtual Wallet",
  colorScheme: "light dark",
  creator: "Lycokat",
  generator: "Next.js",
  manifest: "/manifest.json",
  publisher: "Vercel",
  robots: { index: true, follow: true },
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#1f1f1f" },
    { media: "(prefers-color-scheme: light)", color: "#f9f7f7" },
  ],
  viewport: { width: "device-width", initialScale: 1 },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={Poppins.className}>{children}</body>
    </html>
  )
}
