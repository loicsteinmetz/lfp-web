import React, {FC} from 'react';
import styled from 'styled-components';
import {Colors} from '../theme/colors';
import Head from 'next/head';
import {Spacings} from '../theme/spacings';
import Header from './Header';
import Footer from './Footer';
import {Devices} from '../theme/breakpoints';
import Maintenance from './Maintenance';

export interface LayoutProps {
  url: string;
  title?: string;
  description?: string;
  keywords?: string[];
  cover?: LFPMedia;
  pages: Page[];
  categories: Category[];
  types: Type[];
  general: General;
  children: React.ReactNode;
}

const Container = styled.main`
  padding: ${Spacings.S2} ${Spacings.S2} ${Spacings.S3} ${Spacings.S2};
  background-color: ${Colors.GREY['25']};
  max-width: 900px;
  margin: 0 auto;
  min-height: 50vh;

  @media (${Devices.TABLET}) {
    padding: ${Spacings.S3} ${Spacings.S4};
  }
`

const Layout: FC<LayoutProps> = ({url, title, description, cover, keywords, pages, categories, types, general, children}) => {
  if (general.maintenance) {
    return <Maintenance general={general}/>
  }

  return (
    <>
      <Head>
        <title>La Fabrique Populaire {title ? `| ${title}` : ''}</title>
        <link rel="icon" type="image/png" href={general.favicon!.url}/>
        <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        <meta charSet="utf-8"/>
        <meta name="description" content={description ?? general.description}/>
        <meta name="keywords" content={"journal saint-avold st-avold naborien militant association" + (keywords ? keywords.join(' ') : '')}/>
        {keywords && (<meta name="news_keywords" content={keywords.join(' ')}/>)}
        <meta property="og:title" content={title ?? 'La Fabrique Populaire'}/>
        <meta property="og:type" content="website"/>
        <meta property="og:url" content={url}/>
        <meta property="og:image:secure_url" content={cover?.url ?? general.cover?.url}/>
        <meta property="og:image" content={cover?.url ?? general.cover?.url}/>
        <meta property="og:image:type" content={cover?.mime ?? general.cover?.mime} />
        <meta property="og:image:width" content={String(cover?.width ?? general.cover?.width)} />
        <meta property="og:image:height" content={String(cover?.height ?? general.cover?.height)} />
        <meta property="og:description" content={description ?? general.description}/>
        <meta property="twitter:title" content={title ?? 'La Fabrique Populaire'}/>
        <meta name="twitter:url" content={url}/>
        <meta name="twitter:description" content={description ?? general.description}/>
        <meta name="twitter:image" content={cover?.url ?? general.cover?.url}/>
        <meta name="twitter:card" content="summary_large_image"/>
      </Head>
      <Header pages={pages} categories={categories} types={types} general={general}/>
      <Container>
        {children}
      </Container>
      <Footer general={general}/>
    </>
  )
}

export default Layout;
