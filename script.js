document.addEventListener("DOMContentLoaded", () => {
            gsap.registerPlugin(ScrollTrigger);

            const lenis = new Lenis({
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                direction: 'vertical',
                gestureDirection: 'vertical',
                smooth: true,
                mouseMultiplier: 1,
                smoothTouch: false,
                touchMultiplier: 2,
                infinite: false,
            })

            lenis.on('scroll', ScrollTrigger.update)

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000)
            })

            gsap.ticker.lagSmoothing(0)

            const texts = new SplitType('#hero-headline', { types: 'words, chars' })
            gsap.set('.char', { y: '115%' }); // reset manually

            function playEntranceAnim() {
                const tlEntrance = gsap.timeline({ defaults: { ease: "power4.out" } });

                tlEntrance.to('.char', {
                    y: '0%',
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.03,
                    delay: 0.1
                })
                    .to('.entrance-element', {
                        y: 0,
                        opacity: 1,
                        duration: 1.5,
                        stagger: 0.1
                    }, "-=0.8");
            }

            // ======================================
            // CANVAS IMAGE SEQUENCE SCRUBBING
            // ======================================
            const canvas = document.getElementById('hero-canvas');
            const ctx = canvas.getContext('2d', { alpha: false });

            const frameCount = 192; // Total de frames na pasta
            const currentFrame = index => (
                `./video_frames/frame_${(index + 1).toString().padStart(4, '0')}.jpg`
            );

            const images = [];
            const heroObj = { frame: 0 };

            function resizeCanvasToImage(img) {
                canvas.width = img.width;
                canvas.height = img.height;
            }

            let loadedImages = 0;

            // Inicia o loop de load das imagens
            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                img.src = currentFrame(i);
                img.onload = () => {
                    loadedImages++;

                    // Desenha o primeiro frame imediatamente como "capa"
                    if (i === 0) {
                        resizeCanvasToImage(img);
                        ctx.drawImage(img, 0, 0);
                    }

                    // Atualiza texto do preloader se quiser (opcional)
                    const progressStr = Math.floor((loadedImages / frameCount) * 100) + '%';
                    const preloaderText = document.querySelector('#preloader span');
                    if (preloaderText) preloaderText.innerText = `Carregando Vídeo... ${progressStr}`;

                    if (loadedImages === frameCount) {
                        initCanvasSequence();
                    }
                };
                images.push(img);
            }

            // Garante que o canvas redimensione se a janela mudar
            window.addEventListener('resize', () => {
                if (images[0]) resizeCanvasToImage(images[0]);
                if (images[heroObj.frame]) {
                    ctx.drawImage(images[heroObj.frame], 0, 0, canvas.width, canvas.height);
                }
            });

            function initCanvasSequence() {
                // Esconde o Preloader
                gsap.to('#preloader', {
                    opacity: 0, duration: 0.5, onComplete: () => {
                        document.getElementById('preloader').style.display = 'none';
                        canvas.style.opacity = 1;
                        playEntranceAnim();
                    }
                });

                let tlSequence = gsap.timeline({
                    scrollTrigger: {
                        trigger: "#main-scroll",
                        start: "top top",
                        end: "+=300%",
                        scrub: 1.5, // Suavidade (inertia)
                        pin: false,
                    }
                });

                // 1. Anima o index do frame baseado no scroll
                tlSequence.to(heroObj, {
                    frame: frameCount - 1,
                    snap: "frame",
                    ease: "none",
                    duration: 1, // Duração base para scroll
                    onUpdate: () => {
                        // Desenha o frame atual
                        ctx.drawImage(images[heroObj.frame], 0, 0, canvas.width, canvas.height);
                    }
                }, 0);

                // 2. Parallax fade do conteúdo de texto em cima
                tlSequence.to(['#hero-content', '#scroll-prompt'], {
                    opacity: 0,
                    x: -40,
                    scale: 0.98,
                    duration: 0.4, // Fading out nos primeiros 40% do scroll
                    ease: "power2.inOut"
                }, 0);
            }

        });

        // ======================================
        // LOGIC FOR FOLDS 2 AND 3
        // ======================================
        document.addEventListener("DOMContentLoaded", () => {

            // Animação da Dobra 2 (Engenharia)
            gsap.set('.eng-reveal', { y: 40, opacity: 0 });
            gsap.set('.eng-item', { x: 50, opacity: 0 });
            gsap.set('.eng-image-container', { scale: 0.9, opacity: 0 });

            ScrollTrigger.create({
                trigger: '#engineering',
                start: 'top 75%',
                onEnter: () => {
                    gsap.to('.eng-reveal', { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' });
                    gsap.to('.eng-image-container', { scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.2 });
                    gsap.to('.eng-item', { x: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.3 });
                }
            });

            // Animação da Dobra 3 (CTA Submundo)
            gsap.set('.cta-reveal', { y: 30, opacity: 0 });
            gsap.set('.cta-float-item', { scale: 0, opacity: 0, rotation: -30 });

            ScrollTrigger.create({
                trigger: '#cta-section',
                start: 'top 65%',
                onEnter: () => {
                    const ctaTl = gsap.timeline({ defaults: { ease: 'power4.out' } });

                    // Reveal title letters sequentially (Text Reveal Pattern)
                    ctaTl.to('.cta-title-part', { y: 0, opacity: 1, duration: 1.2, stagger: 0.15 })
                        // Fade in the subtitle and button
                        .to('.cta-reveal', { y: 0, opacity: 1, duration: 1, stagger: 0.2 }, "-=0.8")
                        // Pop in the floating background elements
                        .to('.cta-float-item', { scale: 1, opacity: 1, rotation: 0, duration: 1.5, stagger: 0.1, ease: 'back.out(1.5)' }, "-=1");
                }
            });

            // Animação da Dobra 4 (Garantia Glow)
            gsap.set('.warranty-reveal', { y: 60, opacity: 0, scale: 0.95 });

            ScrollTrigger.create({
                trigger: '#warranty-section',
                start: 'top 50%',
                onEnter: () => {
                    gsap.to('.warranty-reveal', { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: 'power4.out' });
                }
            });

        });

        // Flashlight Logic Tracker
        function updateFlashlight(e, element) {
            const rect = element.getBoundingClientRect();
            element.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            element.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        }