import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { deleteUsers, exportUsers, getUsers } from '../services/userService';

function UserTable({ onSignUpClick }) {

    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const res = await getUsers();
        setUsers(res.data);
    }

    const handleDelete = async (id) => {
        await deleteUsers(id);
        fetchUsers();
    }

    const handleSelectUser = (id) => {
        setSelectedUsers(prev =>
            prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]
        );
    };

    const handleExport = async () => {

        const res = await exportUsers(selectedUsers);
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'users.csv');
        document.body.appendChild(link);
        link.click();

    };

    return (

        <>

            <Table variant="simple">

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
                            <Td>
                                <Checkbox onChange={() => handleSelectUser(user._id)} />
                            </Td>
                            <Td>{user.firstName}</Td>
                            <Td>{user.lastName}</Td>
                            <Td>{user.email}</Td>
                            <Td>
                                <Button colorScheme='red' onClick={() => handleDelete(user._id)}>Delete</Button>
                            </Td>
                        </Tr>

                    ))}

                </Tbody>

            </Table>

            <Button mt={4} colorScheme='blue' onClick={onSignUpClick}>Sign Up</Button>

            <Button mt={4} ml={4} colorScheme='teal' onClick={handleExport} disabled={!selectedUsers.length}>Export</Button>

        </>

    )

}

export default UserTable;