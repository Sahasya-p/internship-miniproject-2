import { useState } from "react";
import "./App.css";

export default function App() {
  const [books, setBooks] = useState([
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
  ]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [search, setSearch] = useState("");

  const goal = 20;

  const addBook = () => {
    if (!title || !author) return;

    const newBook = {
      id: Date.now(),
      title,
      author,
      image:
        "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
      rating: 3,
      status: "Want to Read",
      favorite: false,
    };

    setBooks([...books, newBook]);
    setTitle("");
    setAuthor("");
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const toggleFavorite = (id) => {
    setBooks(
      books.map((book) =>
        book.id === id
          ? { ...book, favorite: !book.favorite }
          : book
      )
    );
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
  );

  const completedBooks = books.filter(
    (book) => book.status === "Completed"
  ).length;

  const progress = (completedBooks / goal) * 100;

  return (
    <div className="app">
      <div className="overlay">
        <header>
          <h1>📚 My Library Dashboard</h1>
        </header>

        <div className="stats">
          <div className="card">
            <h2>{books.length}</h2>
            <p>Total Books</p>
          </div>

          <div className="card">
            <h2>{completedBooks}</h2>
            <p>Completed</p>
          </div>

          <div className="card">
            <h2>
              {books.filter((b) => b.favorite).length}
            </h2>
            <p>Favorites</p>
          </div>

          <div className="card">
            <h2>{goal}</h2>
            <p>Year Goal</p>
          </div>
        </div>

        <div className="form-section">
          <input
            placeholder="Book Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            placeholder="Author"
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
          />

          <button onClick={addBook}>
            Add Book
          </button>
        </div>

        <input
          className="search"
          placeholder="🔍 Search books..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <div className="goal-container">
          <h3>Reading Goal Progress</h3>

          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p>
            {completedBooks}/{goal} Books Completed
          </p>
        </div>

        <div className="book-grid">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="book-card"
            >
              <img
                src={book.image}
                alt={book.title}
              />

              <div className="content">
                <h3>{book.title}</h3>

                <p>{book.author}</p>

                <span className="status">
                  {book.status}
                </span>

                <div className="rating">
                  {"⭐".repeat(book.rating)}
                </div>

                <div className="actions">
                  <button
                    onClick={() =>
                      toggleFavorite(book.id)
                    }
                  >
                    {book.favorite
                      ? "❤️"
                      : "🤍"}
                  </button>

                  <button
                    onClick={() =>
                      deleteBook(book.id)
                    }
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}