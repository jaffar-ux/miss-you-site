import { memo, useEffect, useState } from 'react'

const BackgroundAnimation = memo(function BackgroundAnimation() {
    const [stars, setStars] = useState([]);
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const starArray = [...Array(80)].map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            duration: Math.random() * 4 + 3,
            delay: Math.random() * 3,
        }));
        setStars(starArray);
    }, []);

    useEffect(() => {
        const heartArray = [...Array(20)].map(() => ({
            left: Math.random() * 100,
            top: Math.random() * 100,
            fontSize: Math.random() * 10 + 10,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
        }));
        setHearts(heartArray);
    }, []);

    const FloatingHearts = () => (
        <div
            className="fixed inset-0 overflow-hidden pointer-events-none"
        >
            {hearts.map((heart, i) => (
                <div
                    key={i}
                    className="absolute text-pink-300/50"
                    style={{
                        left: `${heart.left}%`,
                        top: `${heart.top}%`,
                        fontSize: `${heart.fontSize}px`,
                    }}
                    animate={{
                        y: [-20, -60],
                        opacity: [0.2, 0.4, 0.2],
                        rotate: [0, 180],
                    }}
                    transition={{
                        duration: heart.duration,
                        repeat: Infinity,
                        delay: heart.delay,
                    }}
                >
                    ❤️
                </div>
            ))}
        </div>
    )

    const SubtleStars = () => (
        <div
            className="fixed inset-0 overflow-hidden pointer-events-none"
        >
            {stars.map((star, i) => (
                <div
                    key={i}
                    className="absolute w-0.5 h-0.5 bg-white rounded-full"
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                    }}
                    animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                    }}
                />
            ))}
        </div>
    )
    return (
        <div className='fixed min-h-screen'>
            <SubtleStars />
            <FloatingHearts />
        </div>
    )
})

export default BackgroundAnimation
