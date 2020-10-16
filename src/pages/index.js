import React from 'react';
import { Helmet } from 'react-helmet';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useCycle } from 'framer-motion';

import { colors, shadows, media, themes, typography } from 'utils';

import ThemeToggle from 'components/ThemeToggle/ThemeToggle';
import HeroSection from 'sections/HeroSection';
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
    overflow:hidden;
  }
`;

const Heading = styled.h6`
  position: fixed;
  top: 2rem;
  left: 2rem;
  margin: 0;
  font-family: 'Fira Code', sans-serif;
  font-size: ${({ theme }) => theme.fontSize.m};
  font-weight: ${({ theme }) => theme.fontWeight.bold};

  ${media.mobileL`
  width:100vw;
  top: 0;
  left: 0;
  padding: 1rem 1rem 0.5rem;
  background-color: ${({ theme }) => theme.primary};
  z-index:50;
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
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-behavior: smooth;
`;

const IndexPage = () => {
  const [themeMode, toggleThemeMode] = useCycle('light', 'dark');
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
        <meta name="description" content="Some content." />
      </Helmet>
      <GlobalStyle />
      <Heading>tulski</Heading>
      <RootWrapper>
        <ThemeToggle themeMode={themeMode} toggleThemeMode={toggleThemeMode} />
        <Guidelines />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </RootWrapper>
    </ThemeProvider>
  );
};

export default IndexPage;
