import controller from '../controllers/job';
import User from '../models/user';
import express from 'express';
import { schema, validateSchema } from '../middleware/validateSchema';
import { auth, checkRole } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/create', auth(User), checkRole('employer'), validateSchema(schema.job.create), controller.createJob);
router.get('/get/:jobId', auth(User), controller.readJob);
router.get('/get', auth(User), controller.readAll);
router.patch('/update/:jobId', auth(User), checkRole('employer'), validateSchema(schema.job.update), controller.updateJob);
router.delete('/delete/:jobId', auth(User), checkRole('employer'), controller.deleteJob);

export = router;
