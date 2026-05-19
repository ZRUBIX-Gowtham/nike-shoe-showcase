'use client';

import { useEffect, useRef, useState } from 'react';

export default function ScrollSequence({ onLoadingComplete }) {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Chaining: frame1 (300) + frame2 (300) + frame3 (131) = 731 total frames
    const frameCount = 731; 
    const currentFrameRef = useRef(0);
    const targetFrameRef = useRef(0);

    // Preload all 731 frames sequentially
    useEffect(() => {
        const loadedImages = [];
        let count = 0;

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            
            let url = '';
            if (i <= 300) {
                // Frames 1-300 are loaded from the frame1 folder
                const padIndex = String(i).padStart(3, '0');
                url = `/frame1/ezgif-frame-${padIndex}.jpg`;
            } else if (i <= 600) {
                // Frames 301-600 are loaded from the frame2 folder (mapped to 001-300)
                const padIndex = String(i - 300).padStart(3, '0');
                url = `/frame2/ezgif-frame-${padIndex}.jpg`;
            } else {
                // Frames 601-731 are loaded from the frame3 folder (mapped to 001-131)
                const padIndex = String(i - 600).padStart(3, '0');
                url = `/frame3/ezgif-frame-${padIndex}.jpg`;
            }
            
            img.src = url;
            
            img.onload = () => {
                count++;
                setLoadedCount(count);
                if (count === frameCount) {
                    setIsLoading(false);
                    if (onLoadingComplete) onLoadingComplete();
                }
            };
            
            img.onerror = () => {
                // Fail-safe to avoid hanging in case a frame fails to load
                count++;
                setLoadedCount(count);
                if (count === frameCount) {
                    setIsLoading(false);
                    if (onLoadingComplete) onLoadingComplete();
                }
            };

            loadedImages.push(img);
        }

        setImages(loadedImages);
    }, [onLoadingComplete]);

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

            // Maps scroll progress to the entire 731-frame coordinate range
            targetFrameRef.current = Math.min(frameCount - 1, Math.max(0, scrollPercent * (frameCount - 1)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Linear interpolation frame loop for 60fps cinematic fluidity
        let animationFrameId;
        const updateFrame = () => {
            const ease = 0.15;
            const diff = targetFrameRef.current - currentFrameRef.current;

            if (Math.abs(diff) > 0.05) {
                currentFrameRef.current += diff * ease;
                drawFrame(Math.round(currentFrameRef.current));
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
