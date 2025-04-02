import { useState } from "react";
import { Button, Card, Col, Container, Form, FormControl, Row } from "react-bootstrap";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovie = async () => {
    if (!title)
      return;
      // Fixing the API URL by using backticks (``) for template literals
      const API = `http://www.omdbapi.com/?s=${title}&apikey=dff6f08c`;
      try {
        const response = await axios.get(API);
        // Update the movies state
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
  };

  return (
    <Container className="mt-5" >
      <h1 className="text-center">MOVIE SEARCH APP</h1>
      <Form className="d-flex align-items-center justify-content-center">
        <FormControl
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Search for Movie..."
          className="w-50 mt-3 shadow-lg p-3"
        />
        <Button
          variant="warning"
          className="mt-3 ms-4 px-4 py-3 shadow-lg"
          onClick={searchMovie}
        >
          Search
        </Button>
      </Form>

      <Row className="mt-4">
        {movies.map((movie) => (
          <Col md={4} className="mb-3" key={movie.imdbID}>
            <Card>
              <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>Year: {movie.Year}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
