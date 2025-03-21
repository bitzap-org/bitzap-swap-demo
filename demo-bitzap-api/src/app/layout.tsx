import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { type ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'

import { getConfig } from '../wagmi'
import { Providers } from './providers'
import "@radix-ui/themes/styles.css";
import { Theme, ThemePanel } from "@radix-ui/themes";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Wagmi',
  description: 'Generated by create-wagmi',
}

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie'),
  )
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme accentColor="yellow">
          <Providers initialState={initialState}>
            <div style={{ height: '100vh', maxWidth: '900px', margin: '0 auto' }}>
              {props.children}
            </div>
          </Providers>
          {/* <ThemePanel /> */}
        </Theme>
      </body>
    </html>
  )
}
