import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

interface HeaderProps {
  user: { id: number; email: string } | null;
  onLogout: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Blog
        </Typography>

        {user ? (
          <Box display="flex" alignItems="center">
            <Typography mr={2}>Hello, {user.email}</Typography>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Link href="/login" passHref>
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
