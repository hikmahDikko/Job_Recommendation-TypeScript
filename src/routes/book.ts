import controller from '../controllers/book';
import express from 'express';
import { schema, validateSchema } from '../middleware/validateSchema';

const router = express.Router();

router.post('/create', validateSchema(schema.book.create), controller.createBook);
router.get('/get/:bookId', controller.readBook);
router.get('/get', controller.readAll);
router.patch('/update/:bookId', validateSchema(schema.book.create), controller.updateBook);
router.delete('/delete/:bookId', controller.deleteBook);

export = router;
