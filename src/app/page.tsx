import Link from 'next/link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

export default function Page() {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Link href="/order" className="container flex flex-col items-center m-10 p-4 max-w-fit">
          <p className="text-lg text-gray-700 p-3">
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Make order
            </Button>
          </p>
        </Link>

        <Link href="/pool" className="container flex flex-col items-center m-10 p-4 max-w-fit">
          <p className="text-lg text-gray-700 p-3">
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Explore orders
            </Button>
          </p>
        </Link>
      </Box>
    </Container>

  )
}
