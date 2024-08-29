import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, ModalFooter, Button } from "@chakra-ui/react";
import { addUsers } from "../services/userService";

function SignUpForm({ isOpen, onClose, refreshUsers }) {

    const [user, setUser] = useState({ firstName: '', lastName: '', email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async () => {
        await addUsers(user);
        refreshUsers();
        onClose();
    }

    return (

        <Modal isOpen={isOpen} onClose={onClose}>

            <ModalOverlay />

            <ModalContent>

                <ModalHeader>Sign Up</ModalHeader>

                <ModalCloseButton />

                <ModalBody>

                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input name="firstName" value={user.firstName} onChange={handleChange} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Last Name</FormLabel>
                        <Input name="lastName" value={user.lastName} onChange={handleChange} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input name="email" type="email" value={user.email} onChange={handleChange} />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input name="password" type="password" value={user.password} onChange={handleChange} />
                    </FormControl>

                </ModalBody>

                <ModalFooter>

                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>Save</Button>
                    <Button variant="ghost" onClick={onClose}>Cancel</Button>

                </ModalFooter>

            </ModalContent>

        </Modal>

    )

}

export default SignUpForm;