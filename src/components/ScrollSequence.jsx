'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollSequence({ onProgress, onLoadingComplete, onFrameChange }) {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [frameCount, setFrameCount] = useState(0);
    const currentFrameRef = useRef(0);
    const targetFrameRef = useRef(0);
    const lastReportedFrameRef = useRef(-1);

    const onProgressRef = useRef(onProgress);
    const onLoadingCompleteRef = useRef(onLoadingComplete);
    const onFrameChangeRef = useRef(onFrameChange);

    // Sync callbacks to refs (done at render time — safe since refs are mutable)
    onProgressRef.current = onProgress;
    onLoadingCompleteRef.current = onLoadingComplete;
    onFrameChangeRef.current = onFrameChange;

    // Preload all frames sequentially
    useEffect(() => {
        const frameURLs = [];
        // frame1: 6 to 720
        for (let i = 6; i <= 720; i++) {
            frameURLs.push(`/frame1/frame_${String(i).padStart(6, '0')}.webp`);
        }
        // frame2: 1 to 601
        for (let i = 1; i <= 601; i++) {
            frameURLs.push(`/frame2/frame_${String(i).padStart(6, '0')}.webp`);
        }
        // frame3: 1 to 839
        for (let i = 1; i <= 839; i++) {
            frameURLs.push(`/frame3/frame_${String(i).padStart(6, '0')}.webp`);
        }

        const totalFrames = frameURLs.length;
        setFrameCount(totalFrames);

        // Initial progress callback with 0 loaded
        if (onProgressRef.current) {
            onProgressRef.current(0, totalFrames);
        }

        const loadedImages = [];
        let count = 0;

        for (let i = 0; i < totalFrames; i++) {
            const img = new Image();
            img.src = frameURLs[i];
            
            const handleLoad = () => {
                count++;
                setLoadedCount(count);
                if (onProgressRef.current) {
                    onProgressRef.current(count, totalFrames);
                }
                if (count === totalFrames) {
                    setIsLoading(false);
                    if (onLoadingCompleteRef.current) onLoadingCompleteRef.current();
                }
            };
            
            img.onload = handleLoad;
            img.onerror = handleLoad; // Fail-safe

            loadedImages.push(img);
        }

        setImages(loadedImages);
    }, []);

    // Handle scroll coordinate mapping and frame lerping
    useEffect(() => {
        if (isLoading || images.length === 0) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Center-cropped fit logic
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            drawFrame(Math.round(currentFrameRef.current));
        };

        const drawFrame = (index) => {
            const img = images[index];
            if (!img || !img.complete) return;

            // Hide the canvas for frames 1 to 48, and fade in up to frame 58
            const displayFrame = index + 1;
            if (displayFrame <= 48) {
                canvas.style.opacity = '0';
                canvas.style.pointerEvents = 'none';
            } else if (displayFrame < 58) {
                const opacity = (displayFrame - 48) / 10;
                canvas.style.opacity = String(opacity);
                canvas.style.pointerEvents = 'auto';
            } else {
                canvas.style.opacity = '1';
                canvas.style.pointerEvents = 'auto';
            }

            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const imgWidth = img.width;
            const imgHeight = img.height;

            const imgRatio = imgWidth / imgHeight;
            const canvasRatio = canvasWidth / canvasHeight;

            let drawWidth, drawHeight, drawX, drawY;

            if (canvasRatio > imgRatio) {
                drawWidth = canvasWidth;
                drawHeight = canvasWidth / imgRatio;
                drawX = 0;
                drawY = (canvasHeight - drawHeight) / 2;
            } else {
                drawHeight = canvasHeight;
                drawWidth = canvasHeight * imgRatio;
                drawX = (canvasWidth - drawWidth) / 2;
                drawY = 0;
            }

            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = maxScroll > 0 ? scrollY / maxScroll : 0;

            // Maps scroll progress to the entire coordinate range
            targetFrameRef.current = Math.min(images.length - 1, Math.max(0, scrollPercent * (images.length - 1)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Linear interpolation frame loop for 60fps cinematic fluidity
        let animationFrameId;
        const updateFrame = () => {
            const ease = 0.15;
            const diff = targetFrameRef.current - currentFrameRef.current;

            if (Math.abs(diff) > 0.05) {
                currentFrameRef.current += diff * ease;
                const frameIndex = Math.round(currentFrameRef.current);
                drawFrame(frameIndex);

                // Report frame change to parent (throttled to avoid spam)
                if (frameIndex !== lastReportedFrameRef.current) {
                    lastReportedFrameRef.current = frameIndex;
                    if (onFrameChangeRef.current) {
                        onFrameChangeRef.current(frameIndex, images.length);
                    }
                }
            }

            animationFrameId = requestAnimationFrame(updateFrame);
        };

        updateFrame();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isLoading, images]);


    return (
        <canvas 
            ref={canvasRef} 
            className="fixed inset-0 w-full h-full object-cover z-0 bg-[#000]"
        />
    );
}
