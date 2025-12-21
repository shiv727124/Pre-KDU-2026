package com.example.bookinventory.service;

import com.example.bookinventory.model.Book;
import com.example.bookinventory.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class BookServiceTest {

    private BookService bookService;

    @BeforeEach
    void setUp() {
        bookService = new BookService(new BookRepository());
    }

    @Test
    void addBook_shouldSaveBookSuccessfully() {
        Book book = new Book(null, "Effective Java", "Joshua Bloch", new BigDecimal("450"));

        Book savedBook = bookService.addBook(book);

        assertNotNull(savedBook.getId());
        assertEquals("Effective Java", savedBook.getTitle());
    }

    @Test
    void getBookById_shouldReturnBook_whenBookExists() {
        Book book = new Book(null, "Java Concurrency", "Brian Goetz", new BigDecimal("550"));
        Book saved = bookService.addBook(book);

        Optional<Book> found = bookService.getBookById(saved.getId());

        assertTrue(found.isPresent());
        assertEquals("Java Concurrency", found.get().getTitle());
    }

    @Test
    void getBookById_shouldReturnEmpty_whenBookDoesNotExist() {
        Optional<Book> found = bookService.getBookById(999L);

        assertTrue(found.isEmpty());
    }

    @Test
    void addBook_shouldThrowException_whenPriceIsNegative() {
        Book book = new Book(null, "Bad Book", "Unknown", new BigDecimal("-10"));

        assertThrows(IllegalArgumentException.class, () -> bookService.addBook(book));
    }
}
