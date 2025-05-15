import { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import api from "@/lib/auth";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotification("");
    setError("");

    try {
      await api.post("/auth/register", { email, password });
      setNotification("Sign up successful! You can now log in.");
      setEmail("");
      setPassword("");
      router.push("/login");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>

      {notification && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {notification}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
      )}

      <form onSubmit={handleSignup}>
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
            Sign Up
          </Button>
        </Box>
      </form>

      <Box mt={2}>
        <Typography variant="body2">
          Already have an account? <a href="/login">Login</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Signup;
