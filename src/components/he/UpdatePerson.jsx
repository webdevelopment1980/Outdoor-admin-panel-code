// import React, { useEffect, useState } from "react";
// import { Box, Text, Container, Grid, Image } from "@chakra-ui/react";
// import axios from "axios"; // Import axios for making API requests

// const FullNews = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [article, setArticle] = useState(null); // Define the setArticle function

//   useEffect(() => {
//     const fetchArticle = async () => {
//       try {
//         const response = await axios.get(
//           `https://news-so1v.onrender.com/api/article/${articleId}` // Replace with the actual article ID
//         );
//         setArticle(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setError(
//           (prev) =>
//             error.response.data.message ||
//             error.response.data.error ||
//             error.message ||
//             "Error while fetching the article"
//         );
//         setLoading(false);
//       }
//     };

//     // Replace 'articleId' with the actual ID of the article you want to display
//     const articleId = "653cbde312827299a9adaaf7";

//     fetchArticle();
//   }, []);

//   return (
//     <Container maxW="container.lg" mt={4}>
//       <Grid templateColumns="1fr 200px" gap={4}>
//         {loading ? (
//           <Text>Loading...</Text>
//         ) : error ? (
//           <Text>Error: {error}</Text>
//         ) : article ? (
//           <Box>
//             <Text fontSize="2xl" fontWeight="bold" mt={8}>
//               {article.title}
//             </Text>
//             <Image
//               src={article.photo}
//               alt={article.title}
//               maxH="400px"
//               maxW="100%"
//               mt={4}
//             />
//             <Text fontSize="md" color="gray.500" mt={4}>
//               {article.description}
//             </Text>
//           </Box>
//         ) : (
//           <Text>No article found</Text>
//         )}
//         <Box bg="gray.200" p={4} mt={8}>
//           <Text>Add Space</Text>
//         </Box>
//       </Grid>
//     </Container>
//   );
// };

// export default FullNews;
