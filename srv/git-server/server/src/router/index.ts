import {Router} from 'express';
import publicRouter from './routes/public/index'
import adminRouter from './routes/admin/admin'
import projectRouter from './routes/projects/project'
import settingsRouter from './routes/settings/settings.router'
import repositoryRouter from './routes/repository/repository'
import repositoryController from '../controller/repository.controller';
import passport from 'passport'
import repositoryService from '../servces/repository.service';
import settingsController from '../controller/settings.controller';

const router=Router();

router.use("/public", publicRouter)
router.use("/admin", adminRouter)

router.use("/projects", projectRouter)

router.use("/settings", settingsRouter)

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
router.post("/:project/:repository/commits",
    passport.authenticate("jwt",{session:false}),
    repositoryController.getRepositoryCommits
    )
router.post("/:project/:repository/branches",
    passport.authenticate("jwt",{session:false}),
    repositoryController.getRepositoryBranches)

// router.post("/settings/sshkey/add",
//     passport.authenticate("jwt",{session:false}),
//     settingsController.addSshKey)

// router.post("/settings/sshkey/list",
//     passport.authenticate("jwt",{session:false}),
//     settingsController.getSshKeys)

export default router;