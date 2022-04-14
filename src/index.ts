import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import { videosRouter } from "./routes/videos-routes";
import { authMiddleware } from "./middlewares/auth-middleware";

const PORT = process.env.PORT ?? 5000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello: World!");
});

app.use("/videos", videosRouter);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
