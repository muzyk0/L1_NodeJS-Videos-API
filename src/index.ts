import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

let videos = [
    { id: 1, title: "About JS - 01", author: "it-incubator.eu" },
    { id: 2, title: "About JS - 02", author: "it-incubator.eu" },
    { id: 3, title: "About JS - 03", author: "it-incubator.eu" },
    { id: 4, title: "About JS - 04", author: "it-incubator.eu" },
    { id: 5, title: "About JS - 05", author: "it-incubator.eu" },
];

app.get("/", (req: Request, res: Response) => {
    res.send("Hello: World!");
});

app.get("/videos", (req: Request, res: Response) => {
    res.send(videos);
});
app.get("/videos/:id", (req: Request, res: Response) => {
    const video = videos.find((video) => video.id === parseInt(req.params.id));

    if (video) {
        res.send(video);
    } else {
        res.sendStatus(404);
    }
});
app.post("/videos", (req: Request, res: Response) => {
    if (req.body.title.length === 0) {
        res.sendStatus(400);
        return;
    }
    const newVideo = {
        id: +new Date(),
        title: req.body.title,
        author: "it-incubator.eu",
    };
    videos.push(newVideo);

    res.status(201).send(newVideo);
});

app.put("/videos/:id", (req: Request<{ id: string }>, res: Response) => {
    const id = parseInt(req.params.id);

    const video = videos.find((video) => video.id === id);

    if (req.body.title.length === 0) {
        res.sendStatus(400);
        return;
    }

    if (!video) {
        res.sendStatus(404);
        return;
    }

    video.title = req.body.title;

    res.status(200);
    res.send(videos);
});

app.delete("/videos/:id", (req: Request, res: Response) => {
    const deletedVideoIndex = videos.findIndex(
        (video) => video.id === parseInt(req.params.id)
    );

    if (deletedVideoIndex === -1) {
        res.sendStatus(404);
        return;
    }

    videos.splice(deletedVideoIndex, 1);

    res.status(204);
    res.send(videos);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
