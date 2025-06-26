import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { Typography } from '@mui/material';
import { useLocation } from 'react-router';

const CategoryLayout = () => {
  const location = useLocation();

  const categoryFullSlug = location.pathname.split('/');

  const categorySlug = categoryFullSlug[categoryFullSlug.length - 1];

  return (
    <Wrapper>
      <Typography variant="h2">{categorySlug}</Typography>
    </Wrapper>
  );
};

export default CategoryLayout;
