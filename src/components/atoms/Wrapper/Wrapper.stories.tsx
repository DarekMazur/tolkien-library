import { Button, Typography, Box, AlertTitle, Alert } from '@mui/material';
import Wrapper from './Wrapper';
import { faker } from '@faker-js/faker';

export default {
  title: 'Components/Atoms/Wrapper',
  component: Wrapper,
};

export const ShortContent = {
  args: {
    children: faker.lorem.paragraph(),
  },
};

export const ComplexContent = {
  args: {
    children: (
      <>
        <Typography variant="h4" gutterBottom>
          {faker.lorem.words({ min: 1, max: 3 })}
        </Typography>
        <Typography variant="body1">{faker.lorem.paragraph({ min: 4, max: 8 })}</Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary">
            Save
          </Button>
          <Button variant="outlined">Cancel</Button>
        </Box>
      </>
    ),
  },
};

export const LongContent = {
  args: {
    children: (
      <>
        <Typography variant="h3" gutterBottom>
          {faker.lorem.words({ min: 1, max: 3 })}
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1">{faker.lorem.paragraph({ min: 4, max: 8 })}</Typography>
        </Box>
        <Alert severity="info" sx={{ mb: '2rem' }}>
          <AlertTitle>{faker.lorem.word()}</AlertTitle>
          {faker.lorem.paragraph({ min: 10, max: 20 })}
        </Alert>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Box key={index} sx={{ mb: 2, p: 2, bgcolor: 'rgba(0,0,0,0.04)', borderRadius: 1 }}>
              <Typography variant="h6">
                {faker.lorem.words(1)} {index + 1}
              </Typography>
              <Typography variant="body2">{faker.lorem.paragraph({ min: 4, max: 8 })}</Typography>
            </Box>
          ))}
        <Alert severity="warning" sx={{ mb: '2rem' }}>
          <AlertTitle>{faker.lorem.word()}</AlertTitle>
          {faker.lorem.paragraph({ min: 10, max: 20 })}
        </Alert>
      </>
    ),
  },
};

export const CenteredContent = {
  args: {
    children: (
      <>
        <Typography variant="h4" gutterBottom>
          {faker.lorem.words({ min: 1, max: 3 })}
        </Typography>
        <Typography variant="body1">{faker.lorem.paragraph({ min: 4, max: 8 })}</Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary">
            Save
          </Button>
          <Button variant="outlined">Cancel</Button>
        </Box>
      </>
    ),
    isCenter: true,
  },
};

export const DarkContent = {
  args: {
    children: faker.lorem.paragraph(),
    isDark: true,
  },
};

export const CustomMarginsContent = {
  args: {
    children: faker.lorem.paragraph(),
    margin: 8,
  },
};

export const NoMarginsContent = {
  args: {
    children: faker.lorem.paragraph(),
    margin: 0,
  },
};
