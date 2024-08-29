import { saveAs } from 'file-saver';
import './App.css';
import React, { useEffect, useState } from 'react';
import { Box, Button, ChakraProvider, Checkbox, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react';
import { AtSignIcon, DeleteIcon, DownloadIcon, SpinnerIcon } from '@chakra-ui/icons';
import axios from 'axios';

function App() {

  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/users').then(res => setUsers(res.data));
  }, []);

  const handleSignUp = () => {
    axios.post('http://localhost:5000/users', newUser).then(() => {
      toast({ title: 'User added', status: 'success' });
      onClose();
    })
  }

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`).then(() => {
      toast({ title: 'User deleted', status: 'success' });
      onClose();
    })
  }

  const handleExport = async () => {
    if (selectedUsers.length === 0) return;

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/export', {
        responseType: 'blob',
        params: { users: selectedUsers }
      });

      // Create a new blob object and save it
      const blob = new Blob([response.data], { type: 'text/csv' });
      saveAs(blob, 'users.csv');

      toast({ title: 'Export successful', status: 'success' });
    } catch (error) {
      toast({ title: 'Export failed', description: error.message, status: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (

    <ChakraProvider>

      <Box p={5}>

        <Button onClick={onOpen} colorScheme='blue' mr={5} leftIcon={<AtSignIcon />}>SIGN UP</Button>
        <Button onClick={handleExport} disabled={selectedUsers.length === 0} colorScheme='teal' leftIcon={<DownloadIcon />}>EXPORT</Button>

        <Table mt={10} mb={10}>

          <Thead>

            <Tr>
              <Th>Select</Th>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Actions</Th>
            </Tr>

          </Thead>

          <Tbody>

            {users.map(user => (

              <Tr key={user._id}>
                <Td><Checkbox /></Td>
                <Td>{user.firstName}</Td>
                <Td>{user.lastName}</Td>
                <Td>{user.email}</Td>
                <Td><Button onClick={() => handleDelete(user._id)} colorScheme='red' leftIcon={<DeleteIcon />}>DELETE</Button></Td>
              </Tr>

            ))}

          </Tbody>

        </Table>

        <Button onClick={handleExport} disabled={selectedUsers.length === 0} colorScheme='teal'>
          {loading ? <SpinnerIcon /> : 'EXPORT'}
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>

          <ModalOverlay />

          <ModalContent>

            <ModalHeader>Sign Up</ModalHeader>

            <ModalCloseButton />

            <ModalBody>

              <Input placeholder='Email' type='email' onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} mb={2} />
              <Input placeholder='First Name' onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} mb={2} />
              <Input placeholder='Last Name' onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} mb={2} />
              <Input placeholder='Password' type='password' onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} mb={2} />

            </ModalBody>

            <ModalFooter>

              <Button onClick={handleSignUp} colorScheme='blue' mr={5}>Sign Up</Button>
              <Button onClick={onClose} colorScheme='red'>Cancel</Button>

            </ModalFooter>

          </ModalContent>

        </Modal>

      </Box>

    </ChakraProvider>

  );
}

export default App;
