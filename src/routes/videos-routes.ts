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
        const id = parseInt(req.params.id);
        const video = videosRepository.getVideoById(id);

        if (video) {
            res.status(200).send(video);
        } else {
            res.sendStatus(404);
        }
    })
    .post(
        "/",
        body("title")
            .isLength({ max: 40, min: 4 })
            .withMessage("Max 5-15 symbols")
            .matches(/^[\w ]*$/),
        inputValidatorMiddleware,
        (req: Request<{}, {}, { title: string }>, res: Response) => {
            const newVideo = videosRepository.createVideo(req.body.title);

            res.status(201).send(newVideo);
        }
    )
    .put(
        "/:id",
        body("title")
            .isLength({ max: 40, min: 4 })
            .withMessage("Max 5-15 symbols")
            .matches(/^[\w ]*$/),
        inputValidatorMiddleware,
        (req: Request<{ id: string }>, res: Response) => {
            const id = parseInt(req.params.id);

            if (!req.body.title?.length) {
                const error = {
                    errorsMessages: [
                        {
                            message: "If the inputModel has incorrect values",
                            field: "title",
                        },
                    ],
                    resultCode: 0,
                };
                res.status(400).send(error);
                return;
            }

            const video = videosRepository.updateVideoById(id, req.body.title);

            if (!video) {
                res.sendStatus(404);
                return;
            }

            console.log("video ", video);

            res.sendStatus(204);
        }
    )
    .delete("/:id", (req: Request, res: Response) => {
        const id = parseInt(req.params.id);
        const videos = videosRepository.deleteVideoById(id);

        if (!videos) {
            res.sendStatus(404);
            return;
        }

        res.status(204);
        res.send(videos);
    });
