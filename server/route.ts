const router = require('express').Router();
import User from './modules/User/userRoute'
import Pet from './modules/Pet/route'

router.use('/user', User);
router.use('/pet', Pet);

router.use((req: any, res: any, next: any) => {
    res.json('Not Found');
});

router.use((error: Error, req: any, res: any, next: any) => {
    res.status(500).json({error: " "+ error});
});

export default router;