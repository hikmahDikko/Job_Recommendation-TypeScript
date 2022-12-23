import express from 'express';
import controller from '../controllers/user';
import { schema, validateSchema } from '../middleware/validateSchema';

const router = express.Router();

router.post('/create', validateSchema(schema.user.create), controller.createUser);
router.post('/login', validateSchema(schema.user.login), controller.loginUser);
router.get('/get/:userId', controller.readUser);
router.get('/get', controller.readAll);
router.patch('/update/:userId', validateSchema(schema.user.update), controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);

export = router;
