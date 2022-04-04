import { Request, Response, Router } from "express";
import { videosRepository } from "../repositories/videos-repository";
import { body, validationResult } from "express-validator";
import { inputValidatorMiddleware } from "../middlewares/input-validator-middleware";

// put here array with videos
export const videosRouter = Router({});

// bind here videosRouter with all handlers

videosRouter
    .get("/", (req: Request, res: Response) => {
        const videos = videosRepository.getVideos();
        res.send(videos);
    })
    .get("/:id", (req: Request, res: Response) => {
        const video = videosRepository.getVideoById(req.body.id);

        if (video) {
            res.send(video);
        } else {
            res.sendStatus(404);
        }
    })
    .post(
        "/",
        body("title")
            .isLength({ max: 15, min: 5 })
            .withMessage("Max 5-15 symbols")
            .matches(/^[\w ]*$/),
        inputValidatorMiddleware,
        (req: Request<{}, {}, { title: string }>, res: Response) => {
            const newVideo = videosRepository.createVideo(req.body.title);

            res.status(201).send(newVideo);
        }
    )
    .put("/:id", (req: Request<{ id: string }>, res: Response) => {
        const id = parseInt(req.params.id);

        if (req.body.title.length === 0) {
            res.sendStatus(400);
            return;
        }

        const video = videosRepository.updateVideoById(id, req.body.title);

        if (!video) {
            res.sendStatus(404);
            return;
        }

        res.status(200);
        res.send(video);
    })
    .delete("/:id", (req: Request, res: Response) => {
        const videos = videosRepository.deleteVideoById(req.body.id);

        res.status(204);
        res.send(videos);
    });
