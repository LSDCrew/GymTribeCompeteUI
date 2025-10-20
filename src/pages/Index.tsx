import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to About page on initial load
    navigate("/about");
  }, [navigate]);

  return null;
};

export default Index;
