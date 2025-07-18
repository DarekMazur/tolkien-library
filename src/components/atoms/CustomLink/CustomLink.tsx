import { Link as RouterLink, NavLink } from 'react-router';
import { Link, LinkProps as MuiLinkProps } from '@mui/material';
import { forwardRef, ReactNode } from 'react';
import { SxProps } from '@mui/system';

/**
 * Props interface for CustomLink component
 * @interface ICustomLinkProps
 * @extends {Omit<MuiLinkProps, 'component' | 'href'>}
 */
interface ICustomLinkProps extends Omit<MuiLinkProps, 'component' | 'href'> {
  /** The URL or path to navigate to */
  href: string;
  /** The content to be rendered inside the link */
  children: ReactNode;
  /** Custom styles to apply to the link using MUI's sx prop */
  styles?: SxProps;
  /** Styles to apply when the link is active (only applicable when isNav is true) */
  activeStyles?: SxProps;
  /** Whether to use NavLink component for active state styling */
  isNav?: boolean;
}

/**
 * A custom link component that integrates React Router navigation with Material-UI styling
 *
 * @component
 * @example
 * // Basic usage as a regular link
 * <CustomLink href="/about">About Us</CustomLink>
 *
 * @example
 * // Usage as navigation link with active styling
 * <CustomLink
 *   href="/dashboard"
 *   isNav={true}
 *   styles={{ color: 'primary.main' }}
 *   activeStyles={{ fontWeight: 'bold' }}
 * >
 *   Dashboard
 * </CustomLink>
 *
 * @param {ICustomLinkProps} props - The props for the CustomLink component
 * @param {string} props.href - The URL or path to navigate to
 * @param {ReactNode} props.children - The content to be rendered inside the link
 * @param {SxProps} [props.styles] - Custom styles to apply to the link using MUI's sx prop
 * @param {SxProps} [props.activeStyles] - Styles to apply when the link is active (only applicable when isNav is true)
 * @param {boolean} [props.isNav=false] - Whether to use NavLink component for active state styling
 * @param {HTMLAnchorElement} ref - Forwarded ref to the underlying anchor element
 * @returns {JSX.Element} A styled link component that handles navigation
 *
 */
const CustomLink = forwardRef<HTMLAnchorElement, ICustomLinkProps>(
  ({ children, href, styles, isNav, ...muiProps }, ref) => {
    const RouterComponent = isNav ? NavLink : RouterLink;
    return (
      <Link component={RouterComponent} to={href} ref={ref} sx={styles} {...muiProps}>
        {children}
      </Link>
    );
  },
);

CustomLink.displayName = 'CustomLink';

export default CustomLink;
