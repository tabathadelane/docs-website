import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  GlobalHeader,
  Layout,
  Link,
  Logo,
  MobileHeader,
  useLayout,
  Icon,
  Button,
  SearchInput,
  useTranslation,
} from '@newrelic/gatsby-theme-newrelic';
import { css } from '@emotion/react';
import { scroller } from 'react-scroll';
import SEO from '../components/SEO';
import RootNavigation from '../components/RootNavigation';
import NavFooter from '../components/NavFooter';
import { useLocation, navigate } from '@reach/router';

const MainLayout = ({ children, pageContext }) => {
  const { sidebarWidth, contentPadding } = useLayout();
  const { locale, slug } = pageContext;
  const location = useLocation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebar, setSidebar] = useState(true);
  const { t } = useTranslation();
  const navHeaderHeight = '100px';
  const isStyleGuide =
    slug.match(/\/docs\/style-guide/) || slug.match(/\/docs\/agile-handbook/);
  const addTrailingSlash = (path) => {
    if (path.endsWith('/')) {
      return path;
    } else {
      return path.concat('/');
    }
  };

  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [location.pathname]);

  return (
    <>
      <SEO location={location} />
      <GlobalHeader
        hideSearch
        customStyles={{ navLeftMargin: '150px', searchRightMargin: '30px' }}
      />
      <MobileHeader>
        <RootNavigation locale={locale} isStyleGuide={isStyleGuide} />
      </MobileHeader>

      <Layout
        css={css`
          --sidebar-width: ${sidebar ? sidebarWidth : '50px'};
          -webkit-font-smoothing: antialiased;
          font-size: 1.125rem;
          @media screen and (max-width: 1240px) {
            --sidebar-width: ${sidebar ? '278px' : '50px'};
          }
        `}
      >
        <Layout.Sidebar
          css={css`
            padding: 0;
            > div {
              height: 100%;
              overflow: hidden;
            }
            background: var(--erno-black);

            ${!sidebar &&
            css`
              border: none;
              background: var(--primary-background-color);
              & > div {
                padding: ${contentPadding} 0;
              }
            `}
            hr {
              border: none;
              height: 1rem;
              margin: 0;
            }
          `}
        >
          <div
            css={css`
              height: ${navHeaderHeight};
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <Link
                to="/"
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  text-decoration: none;
                  color: var(--system-text-primary-dark);
                  &:hover {
                    color: var(--system-text-primary-dark);
                  }
                `}
              >
                <Logo
                  css={css`
                    ${!sidebar &&
                    css`
                      display: none;
                    `}
                  `}
                />
              </Link>
              <Button
                variant={Button.VARIANT.PRIMARY}
                css={css`
                  height: 40px;
                  width: 40px;
                  padding: 0;
                  border-radius: 50%;
                `}
                onClick={() => setSidebar(!sidebar)}
              >
                <Icon
                  name="nr-nav-collapse"
                  size="1rem"
                  css={
                    !sidebar &&
                    css`
                      transform: rotateZ(180deg);
                    `
                  }
                />
              </Button>
            </div>
            {sidebar && (
              <SearchInput
                placeholder={t('home.search.placeholder')}
                value={searchTerm || ''}
                iconName={SearchInput.ICONS.SEARCH}
                isIconClickable
                alignIcon={SearchInput.ICON_ALIGNMENT.RIGHT}
                onChange={(e) => setSearchTerm(e.target.value)}
                onSubmit={() => navigate(`?q=${searchTerm || ''}`)}
                css={css`
                  margin: 1.5rem 0 2rem;
                  svg {
                    color: var(--primary-text-color);
                  }
                `}
              />
            )}
          </div>
          {sidebar && (
            <>
              <RootNavigation
                isStyleGuide={isStyleGuide}
                locale={locale}
                css={css`
                  overflow-x: hidden;
                  height: calc(
                    100vh - ${navHeaderHeight} - var(--global-header-height) -
                      4rem
                  );
                `}
              />
              <NavFooter
                css={css`
                  width: calc(var(--sidebar-width) - 1px);
                `}
              />
            </>
          )}
        </Layout.Sidebar>
        <Layout.Main
          css={css`
            display: ${isMobileNavOpen ? 'none' : 'block'};
          `}
        >
          {children}
        </Layout.Main>
        <Layout.Footer
          fileRelativePath={pageContext.fileRelativePath}
          css={css`
            height: 60px;
          `}
        />
      </Layout>
    </>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
  pageContext: PropTypes.object,
};

export default MainLayout;
