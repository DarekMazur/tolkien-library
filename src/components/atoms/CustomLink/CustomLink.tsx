import { Link as RouterLink } from 'react-router';
import { Link } from '@mui/material';
import { ReactNode } from 'react';
import { SxProps } from '@mui/system';

const CustomLink = ({
  children,
  url,
  styles,
  onClick,
}: {
  url: string;
  children: ReactNode;
  styles?: SxProps;
  onClick?: () => void;
}) => {
  return (
    <RouterLink to={url} onClick={onClick}>
      <Link component="span" sx={styles}>
        {children}
      </Link>
    </RouterLink>
  );
};

export default CustomLink;
