export type VideoFrameProps = {
    type: 'local' | 'youtube';
    src: string;
    title?: string;
};

export function VideoFrame({
    type,
    src,
    title = 'Video',
}: VideoFrameProps) {
    if (type === 'local') {
        return (
            <div className="aspect-video w-full overflow-hidden bg-black">
                <video
                    className="h-full w-full object-cover"
                    controls
                    playsInline
                    title={title}
                >
                    <source src={src} />
                    Trình duyệt của bạn không hỗ trợ video.
                </video>
            </div>
        );
    }

    return (
        <div className="aspect-video w-full overflow-hidden bg-black">
            <iframe
                src={src}
                title={title}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </div>
    );
}
