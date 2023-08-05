import {Router} from 'express';
import publicRouter from './routes/public/index'
import adminRouter from './routes/admin/admin'
import projectRouter from './routes/projects/project'
import repositoryRouter from './routes/repository/repository'
import repositoryController from '../controller/repository.controller';
import passport from 'passport'

const router=Router();

router.use("/public", publicRouter)
router.use("/admin", adminRouter)

router.use("/projects", projectRouter)

router.post("/:project/repositories/create",
    passport.authenticate("jwt",{session:false}),
    repositoryController.createRepository
    )

router.post("/:project/repositories/",
    passport.authenticate("jwt",{session:false}),
    repositoryController.getAllRepositories
    )
router.post("/:project/:repository/files",
    passport.authenticate("jwt",{session:false}),
    repositoryController.getRepositoryFiles
    )


export default router;