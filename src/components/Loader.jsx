import { memo, useEffect, useState } from 'react'

const Loader = memo(function Loader() {
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
        >
          💖
        </div>
      ))}
    </div>
  );

  const heartbeatPath = "M0,50 L30,50 L35,50 L40,30 L45,70 L50,10 L55,90 L60,50 L90,50 L95,50 L100,35 L105,65 L110,15 L115,85 L120,50 L150,50 L155,50 L160,40 L165,60 L170,20 L175,80 L180,50 L210,50 L215,50 L220,45 L225,55 L230,25 L235,75 L240,50 L270,50 L275,50 L280,50 L300,50"

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <FloatingHearts />
    </div>
  )
})

export default Loader
