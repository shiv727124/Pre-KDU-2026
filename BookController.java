package com.example.bookinventory.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/books")
public class LibraryController {

    private  List<Book> libraryData = new ArrayList<>();

    @GetMapping("/search")
    public ResponseEntity<?> searchBooksByAuthor(
            @RequestParam(required = false) String author) {

        try {
            if (author == null || author.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("Author query parameter is required");
            }

            List<Book> matchedBooks = libraryData.stream()
                    .filter(book ->
                            book.getAuthor() != null &&
                                    book.getAuthor().toLowerCase()
                                            .contains(author.trim().toLowerCase())
                    )
                    .collect(Collectors.toList());

            return ResponseEntity.ok(matchedBooks);

        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Internal server error");
        }
    }
}
