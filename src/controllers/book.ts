import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Book from '../models/book';

const createBook = (req: Request, res: Response, next: NextFunction) => {
    const { title, userId } = req.body;
    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
        title,
        userId
    });

    return book
        .save()
        .then(() => res.status(201).json({ book }))
        .catch((error) => res.status(500).json({ error }));
};

const readBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    return Book.findById(bookId)
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    const books = Book.find();
    return books.then((books) => res.status(200).json({ datas: books })).catch((error) => res.status(500).json({ error }));
};

const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.userId;
    return Book.findById(bookId)
        .select('-__v')
        .then((book) => {
            if (book) {
                book.set(req.body);
                return book
                    .save()
                    .then((book) => res.status(201).json({ book }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'Not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;
    return Book.findByIdAndDelete(bookId)
        .then((book) => (book ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'Not found' })))
        .catch((error) => res.status(500).json({ error }));
};
export default { createBook, readAll, readBook, updateBook, deleteBook };
