import { useEffect, useState } from "react";
import { Container, Button, Typography, Box } from "@mui/material";
import Header from "@/components/Header";
import PostTable from "@/components/PostTable";
import AddPostModal from "@/components/AddPostModal";
import api from "@/lib/auth";
import { useRouter } from "next/router";

interface Post {
  id: number;
  title: string;
  authorName: string;
}

interface User {
  id: number;
  email: string;
}

const Home = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
      fetchPosts();
    } catch {
      router.push("/login");
      setUser(null);
    }
  };

  const fetchPosts = async () => {
    const res = await api.get("/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleAddPost = async ({
    title,
    content,
  }: {
    title: string;
    content: string;
  }) => {
    await api.post("/posts", { title, content });
    fetchPosts();
  };

  const handleLogout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    router.push("/login");
  };

  return (
    <>
      <Header user={user} onLogout={handleLogout} />

      <Container sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">Posts</Typography>
          {user && (
            <Button variant="contained" onClick={() => setShowModal(true)}>
              Add Post
            </Button>
          )}
        </Box>

        <PostTable posts={posts} />

        <AddPostModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={handleAddPost}
        />
      </Container>
    </>
  );
};

export default Home;
