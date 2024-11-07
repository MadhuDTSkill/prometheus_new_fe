import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ReactTyped } from 'react-typed';

gsap.registerPlugin(TextPlugin);

const MainIntro = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ring1Ref = useRef(null);
    const ring2Ref = useRef(null);
    const particleBurstRef = useRef([]);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Title glitch and scale effect
        tl.fromTo(
            titleRef.current,
            { opacity: 0, scale: 0.8, y: -50 },
            { opacity: 1, scale: 1, y: 0, duration: 1.2 }
        );

        tl.to(titleRef.current, {
            text: "Prometheus",
            duration: 2.5,
            ease: "none",
            repeat: 1,
            yoyo: true,
            repeatDelay: 0.5,
        });

        // Rotating HUD Rings with pulsating animation
        gsap.to(ring1Ref.current, {
            rotation: 360,
            duration: 10,
            repeat: -1,
            ease: "linear",
        });
        gsap.to(ring2Ref.current, {
            rotation: -360,
            duration: 15,
            repeat: -1,
            ease: "linear",
        });

        gsap.fromTo(
            [ring1Ref.current, ring2Ref.current],
            { opacity: 0.5, scale: 0.95 },
            {
                opacity: 1,
                scale: 1,
                duration: 2,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
            }
        );

        // Subtitle flicker effect
        gsap.fromTo(
            subtitleRef.current,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 1.5, delay: 2 }
        );
        gsap.to(subtitleRef.current, {
            opacity: 0.7,
            duration: 0.5,
            yoyo: true,
            repeat: -1,
            repeatDelay: 1,
        });

        // Particle burst around title
        particleBurstRef.current.forEach((particle, index) => {
            gsap.fromTo(
                particle,
                { opacity: 0, x: 0, y: 0, scale: 0.5 },
                {
                    opacity: 1,
                    x: Math.cos(index) * 150,
                    y: Math.sin(index) * 150,
                    scale: 1,
                    duration: 1.5,
                    delay: index * 0.1,
                    repeat: -1,
                    yoyo: true,
                    ease: "power2.out",
                }
            );
        });
    }, []);

    // Add hover effect for title
    const handleMouseEnter = () => {
        gsap.to(titleRef.current, {
            scale: 1.1,
            duration: 0.5,
            ease: "power3.inOut",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(titleRef.current, {
            scale: 1,
            duration: 0.5,
            ease: "power3.inOut",
        });
    };

    return (
        <div className="h-full flex-1 overflow-auto flex flex-col justify-center items-center relative bg-black">
            {/* Rotating HUD Rings */}
            <div
                ref={ring1Ref}
                className='animate-pulse'
                style={{
                    position: 'absolute',
                    border: '3px dashed var(--color-main)',
                    borderRadius: '50%',
                    height: '300px',
                    width: '300px',
                    opacity: 0.3,
                    top: '-50px',
                    left: '-50px',
                }}
            ></div>

            <div
                ref={ring2Ref}
                style={{
                    position: 'absolute',
                    border: '5px dotted var(--color-main)',
                    borderRadius: '50%',
                    height: '400px',
                    width: '400px',
                    opacity: 0.2,
                    top: '-100px',
                    left: '-100px',
                }}
            ></div>

            {/* Particle Burst */}
            {[...Array(48)].map((_, i) => (
                <div
                    key={i}
                    ref={(el) => (particleBurstRef.current[i] = el)}
                    className=''
                    style={{
                        position: 'absolute',
                        height: '8px',
                        width: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-main)',
                        transition: 'transform 0.3s ease-in-out',
                    }}
                ></div>
            ))}

            {/* Main title with glitch and hover effect */}
            <h1
                ref={titleRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ color: 'var(--color-main)', filter: 'drop-shadow(0 0 10px var(--color-main))' }}
                className="text-center text-6xl font-semibold mb-5"
            >
                Prometheus
            </h1>

            {/* Subtitle with flicker effect */}
            <p
                ref={subtitleRef}
                style={{ color: 'var(--color-main)', filter: 'drop-shadow(0 0 5px var(--color-main))' }}
                className="text-center text-xl mb-6"
            >
                <ReactTyped
                    strings={[
                        "Your friendly AI chatbot, here to help you with all things AI!",
                        "Your AI assistant, here to guide you through the world of AI!",
                        "Bringing the power of AI to your fingertips, one question at a time!",
                        "Your virtual companion for all things artificial intelligence!",
                        "Exploring AI together - ask away and let's get started!"
                    ]}
                    typeSpeed={40}
                    backSpeed={1}
                    loop
                    backDelay={2000}
                />
            </p>
        </div>
    );
};

export default MainIntro;
