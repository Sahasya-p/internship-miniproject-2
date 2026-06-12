const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let books = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    rating: 5,
    status: "Completed",
    favorite: true,
  },
  {
    id: 2,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    rating: 4,
    status: "Reading",
    favorite: false,
  },
];

// GET all books
app.get("/books", (req, res) => {
  res.json(books);
});

// ADD a book
app.post("/books", (req, res) => {
  const {
    title,
    author,
    image,
    rating,
    status,
    favorite,
  } = req.body;

  const newBook = {
    id: Date.now(),
    title,
    author,
    image,
    rating: rating || 3,
    status: status || "Want to Read",
    favorite: favorite || false,
  };

  books.push(newBook);

  res.status(201).json(newBook);
});

// DELETE a book
app.delete("/books/:id", (req, res) => {
  const id = Number(req.params.id);

  books = books.filter(
    (book) => book.id !== id
  );

  res.json({
    message: "Book deleted successfully",
  });
});

// TOGGLE favorite
app.patch("/books/:id/favorite", (req, res) => {
  const id = Number(req.params.id);

  books = books.map((book) =>
    book.id === id
      ? {
          ...book,
          favorite: !book.favorite,
        }
      : book
  );

  res.json({
    message: "Favorite updated",
  });
});

// UPDATE reading status
app.patch("/books/:id/status", (req, res) => {
  const id = Number(req.params.id);

  const { status } = req.body;

  books = books.map((book) =>
    book.id === id
      ? { ...book, status }
      : book
  );

  res.json({
    message: "Status updated",
  });
});

// UPDATE rating
app.patch("/books/:id/rating", (req, res) => {
  const id = Number(req.params.id);

  const { rating } = req.body;

  books = books.map((book) =>
    book.id === id
      ? { ...book, rating }
      : book
  );

  res.json({
    message: "Rating updated",
  });
});

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});