import React, { useRef } from 'react';
import loadable from '@loadable/component';
import { Helmet } from 'react-helmet';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Link } from 'react-scroll';
import { useElementScroll, useCycle } from 'framer-motion';

import { colors, shadows, media, themes, typography } from 'utils';
import favicon from 'assets/icons/favicon.ico';
import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import DotsNavigation from 'components/DotsNavigation/DotsNavigation';
import HomeSection from 'sections/HomeSection';
import ContactSection from 'sections/ContactSection';

const SwipeArrow = loadable(() => import('components/SwipeArrow/SwipeArrow'));
const AboutSection = loadable(() => import('sections/AboutSection'));

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Mulish', sans-serif;
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.secondary};
    overflow: hidden;
  }
`;

const Navbar = styled.nav`
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  margin: 0;
  padding: 2rem 2rem 0.5rem;
  z-index: 100;

  ${media.tablet`
    background-color: ${({ theme }) => theme.primary};
  `}

  ${media.mobileL`
    padding: 1rem 1rem 0.5rem;
  `};
`;

const Logo = styled(Link)`
  font-family: 'Fira Code', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  cursor: pointer;
`;

const Guidelines = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  height: 7.5rem;
  width: 7.5rem;
  border-top: solid transparent 0.25rem;
  border-right: solid transparent 0.25rem;
  border-bottom: solid ${({ theme }) => theme.secondary} 0.125rem;
  border-left: solid ${({ theme }) => theme.secondary} 0.125rem;

  ${media.tablet`
    bottom: 1rem;
    left: 1rem;
    height:4rem;
    width:4rem;
  `}
`;

const RootWrapper = styled.main`
  position: relative;
  height: 100vh;
  scroll-snap-type: y proximity;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const IndexPage = () => {
  const [themeMode, toggleThemeMode] = useCycle('light', 'dark');
  const rootRef = useRef();
  const { scrollYProgress } = useElementScroll(rootRef);

  return (
    <ThemeProvider
      theme={{
        ...colors,
        ...shadows,
        ...typography,
        ...themes[themeMode],
      }}
    >
      <Helmet>
        <html lang="en" />
        <title>tulski | aspiring web dev</title>
        <meta
          name="description"
          content="hi, my name is Michał Tułowiecki. Wanna-be web developer, cybersecurity student and coffee geek."
        />
        <link rel="icon" type="image/png" href={favicon} />
      </Helmet>
      <GlobalStyle />
      <Navbar>
        <Logo to="home" containerId="root" smooth>
          tulski
        </Logo>
      </Navbar>
      <Guidelines />
      <DotsNavigation scrollYProgress={scrollYProgress} />
      <RootWrapper id="root" ref={rootRef}>
        <ThemeToggle themeMode={themeMode} toggleThemeMode={toggleThemeMode} />
        <HomeSection />
        <SwipeArrow scrollYProgress={scrollYProgress} />
        <AboutSection />
        <ContactSection />
      </RootWrapper>
    </ThemeProvider>
  );
};

export default IndexPage;
