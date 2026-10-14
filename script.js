// ====================================
// HARISHWAR S - PORTFOLIO ANIMATIONS
// ====================================

// Find the particle canvas
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

// Store particles
let particles = [];
let width = 0;
let height = 0;

// Set up the canvas
function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * ratio;
    canvas.height = height * ratio;

    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const particleCount = Math.min(70, Math.floor(width / 15));

    particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.15,
        drift: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.2
    }));
}

// Animate the particles
function animateParticles() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((particle, index) => {
        // Move particles
        particle.y -= particle.speed;
        particle.x += particle.drift;

        // Return particles to the bottom
        if (particle.y < -5) {
            particle.y = height + 5;
            particle.x = Math.random() * width;
        }

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;

        // Draw glowing particles
        ctx.beginPath();

        ctx.arc(
            particle.x,
            particle.y,
            particle.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(115, 110, 255, ${particle.alpha})`;

        ctx.fill();

        // Connect nearby particles with lines
        for (let j = index + 1; j < particles.length; j++) {
            const other = particles[j];

            const dx = particle.x - other.x;
            const dy = particle.y - other.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();

                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(other.x, other.y);

                ctx.strokeStyle =
                    `rgba(80, 120, 255, ${0.12 * (1 - distance / 100)})`;

                ctx.stroke();
            }
        }
    });

    requestAnimationFrame(animateParticles);
}

// Display the current year in the footer
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Start the animations
resizeCanvas();

window.addEventListener("resize", resizeCanvas);

animateParticles();
