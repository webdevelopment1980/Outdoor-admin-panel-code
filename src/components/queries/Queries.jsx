import React, { useState, useEffect } from "react";
import {
    Box,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Spinner,
    Button,
    Heading,
    Center,
    useToast,
    HStack,
    IconButton
} from "@chakra-ui/react";
import axios from "axios";
import { AdminState } from "../context/context";
import { FaTrash } from "react-icons/fa";

const UserQuery = () => {
    const toast = useToast();
    const [makingCharges, setMakingCharges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { API_BASE_URL } = AdminState();

    useEffect(() => {
        fetchMakingCharges();
    }, []);


    const fetchMakingCharges = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/query/`);
            setMakingCharges(response.data);
            setLoading(false);
        } catch (error) {
            setError("Error while fetching making charges");
            setLoading(false);
        }
    };

    const handleDeleteQuery = async (bookingId) => {
        try {
            // Send a DELETE request to your API endpoint
            await axios.delete(`${API_BASE_URL}/api/query/delete/${bookingId}`, {
                // data: { bookingId }, // Send the bookingId in the request body
            });
            // Show a success toast
            toast({
                title: "Query Deleted",
                status: "success",
                duration: 3000, // Duration in milliseconds
                isClosable: true, // Allow the user to close the toast
                position: "top",
            });

            // Remove the deleted booking from the state
            setMakingCharges((prevBookings) =>
                prevBookings.filter((booking) => booking._id !== bookingId)
            );
        } catch (error) {
            toast({
                title: "Error while deleting the booking",
                status: "error",
                duration: 3000, // Duration in milliseconds
                isClosable: true, // Allow the user to close the toast
                position: "top",
            });
            setError("Error while deleting the booking");
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={8}>
                <Spinner size="xl" />
            </Box>
        );
    }

    return (
        <Box>
            <Center>
                <Heading as="h1" size="l" mb="4" mt="2">
                    USER QUERY LIST
                </Heading>
            </Center>
            <Box maxW={"100%"} minW={"100%"}>
                <Table variant="striped">
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Phone Number</Th>
                            <Th>Email</Th>
                            <Th>Location</Th>
                            <Th>Date</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {makingCharges.map((data) => (
                            <Tr key={data._id}>
                                <Td>{data.name}</Td>
                                <Td>{data.phone}</Td>
                                <Td>{data.email}</Td>
                                <Td>{data.add}</Td>
                                <Td>
                                    {new Date(data.createdAt).toLocaleString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric",
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                    })}
                                </Td>
                                <Td>
                                    <HStack>
                                        <IconButton
                                            icon={<FaTrash />}
                                            colorScheme="red"
                                            size="sm"
                                            onClick={() => handleDeleteQuery(data._id)}
                                        />
                                    </HStack>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Box>
    );
};

export default UserQuery;
