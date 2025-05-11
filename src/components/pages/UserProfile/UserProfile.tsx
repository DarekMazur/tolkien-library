import {
  Avatar,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Box,
  Chip,
  Paper,
} from '@mui/material';
import Wrapper from '@/components/atoms/Wrapper/Wrapper.tsx';
import { faker } from '@faker-js/faker';

const UserProfile = () => {
  return (
    <Wrapper>
      <Card sx={{ maxWidth: 800, margin: '0 auto', borderRadius: 2, overflow: 'hidden' }}>
        <Paper
          sx={{
            p: 3,
            bgcolor: 'primary.light',
            color: 'primary.contrastText',
            borderRadius: 0,
          }}
        >
          <Typography variant="h4">Your profile</Typography>
          <Typography variant="subtitle1">Manage your data</Typography>
        </Paper>

        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={() => {}} noValidate>
            <Grid container spacing={4}>
              <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Avatar
                    src={faker.image.avatar()}
                    alt={faker.internet.username()}
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 2,
                      border: '4px solid',
                      borderColor: 'primary.light',
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {faker.internet.username()}
                  </Typography>
                </Box>
              </Grid>

              <Grid>
                <Grid container spacing={3}>
                  <Grid>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={faker.internet.username()}
                      onChange={() => {}}
                      disabled
                      variant="filled"
                    />
                  </Grid>
                  <Grid>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={faker.internet.email()}
                      disabled={true}
                      variant="filled"
                      helperText={
                        !faker.datatype.boolean({ probability: 0.2 })
                          ? 'Email has not been verified. Check your mailbox.'
                          : ''
                      }
                      error={!faker.datatype.boolean({ probability: 0.2 })}
                    />
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                      Role:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      <Chip
                        label={faker.datatype.boolean({ probability: 0.5 }) ? 'Admin' : 'User'}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Wrapper>
  );
};

export default UserProfile;
