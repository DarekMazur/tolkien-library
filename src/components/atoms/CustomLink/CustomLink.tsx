import { Link as RouterLink } from 'react-router';
import { Link } from '@mui/material';
import { ReactNode } from 'react';
import { SxProps } from '@mui/system';

const CustomLink = ({
  children,
  url,
  styles,
  isNav,
  onClick,
}: {
  url: string;
  children: ReactNode;
  styles?: SxProps;
  onClick?: () => void;
  isNav?: boolean;
}) => {
  const RouterComponent = isNav ? NavLink : RouterLink;

  return (
    <Link component={RouterComponent} to={url} onClick={onClick} sx={styles}>
      {children}
    </Link>
  );
};

export default CustomLink;
