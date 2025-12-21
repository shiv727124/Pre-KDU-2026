package com.example.bookinventory.repository;

import com.example.bookinventory.model.Book;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Repository
public class BookRepository {

    private final Map<Long, Book> bookStore = new HashMap<>();
    private Long currentId = 1L;

    public Book save(Book book) {
        book.setId(currentId);
        bookStore.put(currentId, book);
        currentId++;
        return book;
    }

    public Optional<Book> findById(Long id) {
        return Optional.ofNullable(bookStore.get(id));
    }
}
