import controller from '../controllers/application';
import express from 'express';
import { schema, validateSchema } from '../middleware/validateSchema';
import { auth, checkRole } from '../middleware/authMiddleware';
import User from '../models/user';

const router = express.Router();

router.post('/create', auth(User), checkRole('employee'), validateSchema(schema.applicaion.create), controller.createApplication);
router.get('/get/:applicationId', auth(User), controller.readApplication);
router.get('/get', auth(User), controller.readAll);
router.patch('/update/:applicationId', auth(User), checkRole('employer'), validateSchema(schema.applicaion.update), controller.updateApplication);
router.delete('/delete/:applicationId', auth(User), checkRole('employee'), controller.deleteApplication);

export = router;
