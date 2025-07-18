import { Link as RouterLink, NavLink } from 'react-router';
import { Link, LinkProps as MuiLinkProps } from '@mui/material';
import { forwardRef, ReactNode } from 'react';
import { SxProps } from '@mui/system';

interface ICustomLinkProps extends Omit<MuiLinkProps, 'component' | 'href'> {
  href: string;
  children: ReactNode;
  styles?: SxProps;
  activeStyles?: SxProps;
  isNav?: boolean;
}

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

export default CustomLink;
