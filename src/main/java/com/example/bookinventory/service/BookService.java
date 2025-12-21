package com.example.bookinventory.service;

import com.example.bookinventory.model.Book;
import com.example.bookinventory.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book addBook(Book book) {
        if (book.getPrice().doubleValue() < 0) {
            throw new IllegalArgumentException("Price cannot be negative");
        }
        return bookRepository.save(book);
    }

    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }
}
