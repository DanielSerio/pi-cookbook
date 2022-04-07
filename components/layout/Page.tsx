import { AppShell, AppShellProps, createStyles, CSSObject, MantineTheme } from '@mantine/core';
import Head from 'next/head';
import React from 'react';
import { AppHeader, AppFooter } from '.';

export interface PageProps extends AppShellProps{
  title: string
  description: string
}

function createPageStyles(t: MantineTheme): Record<string, CSSObject> {
  return ({
    body: {
      minHeight: '100vh'
    }
  })
}

const usePageStyles = createStyles(createPageStyles)

export function Page({ title, description, children, ...props }: PageProps) {
  const { classes } = usePageStyles()
  return (
    <AppShell 
      classNames={classes}
      header={<AppHeader />} 
      footer={<AppFooter />}
      {...props}>
      <Head>
        <title key={0}>{title}</title>
        <meta key={0} name="description" content={description} />
        <link key={0} rel="icon" href="/favicon.ico" />
      </Head>

    </AppShell>
  );
}
