import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import api from "@/lib/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("");
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/login", { email, password });
      setNotification("Login successful! Redirecting...");
      router.push("/");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>

      {notification && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {notification}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          label="Password"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Box mt={3}>
          <Button type="submit" variant="contained" fullWidth>
            Login
          </Button>
        </Box>
      </form>

      <Box mt={2}>
        <Typography variant="body2">
          Don't have an account? <a href="/signup">Sign up</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
