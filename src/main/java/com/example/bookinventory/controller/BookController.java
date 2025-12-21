package com.example.bookinventory.controller;

import com.example.bookinventory.model.Book;
import com.example.bookinventory.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // POST - Add a book
    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        Book savedBook = bookService.addBook(book);
        return new ResponseEntity<>(savedBook, HttpStatus.CREATED);
    }

    // GET - Find book by ID
    @GetMapping("/{id}")
    public ResponseEntity<String> getBookInEnglish(@PathVariable Long id) {
        return bookService.getBookById(id)
                .map(book -> ResponseEntity.ok(
                        "Book ID " + book.getId() + ": '" + book.getTitle() + "' by "
                                + book.getAuthor() + " costs $" + book.getPrice()
                ))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Sorry, no book found with ID " + id));
    }

}
