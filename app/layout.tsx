import './globals.css'
import { Toaster } from 'react-hot-toast'
import localfont from 'next/font/local'
import 'react-phone-number-input/style.css'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css'
import Script from 'next/script'

const poppins = localfont({
  src: [
    {
      path: '../public/font/Poppins/Poppins-Regular.ttf',
      weight: '400' // Regular weight
    },
    {
      path: '../public/font/Poppins/Poppins-Medium.ttf',
      weight: '500' // Medium weight
    },
    {
      path: '../public/font/Poppins/Poppins-SemiBold.ttf',
      weight: '600' // SemiBold weight
    },
    {
      path: '../public/font/Poppins/Poppins-Bold.ttf',
      weight: '700' // Bold weight
    }
    // Add more font weights or styles as needed
  ],
  variable: '--font-poppins'
})

export const metadata = {
  title: 'Medvive',
  description:
    'Get 24/7 online consultations with the best doctorswithout breaking a sweat and your bank. Start a consult now',
  icons: {
    icon: ['/favicon.ico?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png']
  },
  manifest: '/site.webmanifest'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: 'no'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      {/* Google tag (gtag.js) */}
      <Script
        src='https://www.googletagmanager.com/gtag/js?id=G-ZSXH4VCWSX'
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window?.dataLayer = window?.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZSXH4VCWSX');
        `}
      </Script>
      <body className={`${poppins.variable}`}>
        <Toaster />
        {children}
      </body>
    </html>
  )
}
