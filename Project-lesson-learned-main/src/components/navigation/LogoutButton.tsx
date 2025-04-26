import { Button } from '@mui/material';
import { useAuth } from '../../features/auth/useAuth';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Button 
      color="inherit"
      onClick={handleLogout}
      sx={{ ml: 2 }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;