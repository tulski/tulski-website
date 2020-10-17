import React, { useRef } from 'react';
import { Helmet } from 'react-helmet';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { Link } from 'react-scroll';
import { useElementScroll, useCycle } from 'framer-motion';

import { colors, shadows, media, themes, typography } from 'utils';

import favicon from 'assets/icons/favicon.ico';

import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import DotsNavigation from 'components/DotsNavigation/DotsNavigation';
import SwipeArrow from 'components/SwipeArrow/SwipeArrow';
import HomeSection from 'sections/HomeSection';
import AboutSection from 'sections/AboutSection';
import ProjectsSection from 'sections/ProjectsSection';
import ContactSection from 'sections/ContactSection';

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

const Heading = styled(Link)`
  position: fixed;
  top: 2rem;
  left: 2rem;
  margin: 0;
  font-family: 'Fira Code', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  z-index: 100;
  cursor: pointer;

  ${media.tablet`
    top: 0;
    left: 0;
    padding: 2rem 2rem 0.5rem;
    width:100vw;
    background-color: ${({ theme }) => theme.primary};
  `}

  ${media.mobileL`
    line-height: 1;
    padding: 1rem 1rem 0.5rem;
    text-align: center;
  `}
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

const RootWrapper = styled.div`
  position: relative;
  height: 100vh;
  scroll-snap-type: y proximity;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const IndexPage = () => {
  const [themeMode, toggleThemeMode] = useCycle('light', 'dark');
  const rootEl = useRef();
  const { scrollYProgress } = useElementScroll(rootEl);

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
      <RootWrapper id="root" ref={rootEl}>
        <Heading to="home" containerId="root" smooth>
          tulski
        </Heading>
        <ThemeToggle themeMode={themeMode} toggleThemeMode={toggleThemeMode} />
        <Guidelines />
        <DotsNavigation scrollYProgress={scrollYProgress} />
        <SwipeArrow scrollYProgress={scrollYProgress} />
        <HomeSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </RootWrapper>
    </ThemeProvider>
  );
};

export default IndexPage;
