import { AppShell, AppShellProps } from '@mantine/core';
import Head from 'next/head';
import React from 'react';

export interface PageProps extends AppShellProps{
  title: string
  description: string
}

export function Page({ title, description, children, ...props }: PageProps) {
  return (
    <AppShell {...props}>
      <Head>
        <title key={0}>{title}</title>
        <meta key={0} name="description" content={description} />
        <link key={0} rel="icon" href="/favicon.ico" />
      </Head>

    </AppShell>
  );
}
