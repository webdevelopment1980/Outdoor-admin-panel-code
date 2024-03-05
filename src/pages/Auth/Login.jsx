import { useState } from "react";
import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  Image,
  HStack,
  InputGroup,
} from "@chakra-ui/react";
import LoginNav from "./LoginNav";
import { useNavigate } from "react-router-dom";
import { AdminState } from "../../components/context/context";
import { BeatLoader } from "react-spinners";
import { InputRightElement, IconButton } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = ({ setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigateTo = useNavigate();
  const { user, setUserAgain, API_BASE_URL } = AdminState();

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log(process.env.REACT_APP_BASE_URL);
    setLoading(true);
    console.log("email:", email, "password:", password);
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      const { token, User } = response.data;

      // Store token in local storage
      localStorage.setItem("token", JSON.stringify(token));
      // Store token in local storage
      localStorage.setItem("User", JSON.stringify(User));
      // fetch in adminstate
      setUserAgain((prev) => !prev);
      toast({
        title: "Login Successful.",
        description:
          "Info: " + response.data.message + " Account loggedIn successfully.",
        status: "success",
        duration: 7000,
        isClosable: true,
      });
      // Redirect or perform upon successful login
      setLoggedIn((prev) => true);
      setLoading(false);
      navigateTo("/");
    } catch (error) {
      console.error("Error logging in:", error);
      toast({
        title: "Login failed.",
        description:
          "Error: " +
          error.response.data.message +
          "!" +
          " Please check your credentials and try again. ",
        status: "error",
        duration: 7000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <LoginNav />
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} mt={-24} px={6}>
          <Stack align={"center"}></Stack>
          <Stack align={"center"}>
            <Heading fontSize={"xl"} mb={"0px"}>
              Log Into Your Account
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement width="3rem">
                    <IconButton
                      h="1.75rem"
                      size="sm"
                      onClick={togglePasswordVisibility}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  {/* <Link color={"blue.400"}>Forgot password?</Link> */}
                </Stack>
                <Button
                  bg={"#0a2351"}
                  color={"white"}
                  _hover={{
                    color: "white",
                    bg: "#3a5173",
                  }}
                  onClick={handleLogin}
                  isLoading={loading}
                  spinner={<BeatLoader size={8} color="white" />}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
