// app/layout.tsx
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"

const inter = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: 'es', namespace: 'home' })
  
  return {
    title: {
      template: `%s | Isaelle Costa`,
      default: "Isaelle Costa"
    },
    description: t('description'),
    authors: [{ name: "Isaelle" }],
    keywords: ["literatura", "ibero-romance", "academia", "educación"],
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: 'es_ES',
      type: 'website'
    }
  }
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale?: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  const lang = locale || 'es'

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}