import './App.css';
import { useState } from 'react';
import { Box, ChakraProvider, Heading } from '@chakra-ui/react';
import UserTable from './components/UserTable';
import SignUpForm from './components/SignUpForm';
import fetchUsers from './components/UserTable';

function App() {

  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const handleOpenSignUp = () => setIsSignUpOpen(true);
  const handleCloseSignUp = () => setIsSignUpOpen(false);

  return (

    <ChakraProvider>

      <Box p={4}>

        <Heading mb={4}>User Management System</Heading>
        <UserTable onSignUpClick={handleOpenSignUp} />
        <SignUpForm isOpen={isSignUpOpen} onClose={handleCloseSignUp} refreshUsers={fetchUsers} />

      </Box>

    </ChakraProvider>

  );
}

export default App;
