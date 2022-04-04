import { videos, Video } from "./db";

export const videosRepository = {
    getVideos(): Video[] {
        return videos;
    },
    getVideoById(id: number): Video | null {
        const video = videos.find((video) => video.id === id);
        if (video) {
            return video;
        }
        return null;
    },
    deleteVideoById(id: number): boolean {
        const deletedVideoIndex = videos.findIndex((video) => video.id === id);

        if (deletedVideoIndex === -1) {
            return false;
        }

        videos.splice(deletedVideoIndex, 1);

        return true;
    },
    updateVideoById(id: number, title: string): Video[] {
        return videos.map((video) =>
            video.id === id ? { ...video, title } : video
        );
    },
    createVideo(title: string): Video {
        const newVideo = {
            id: +new Date(),
            title: title,
            author: "it-incubator.eu",
        };
        videos.push(newVideo);
        return newVideo;
    },
};
