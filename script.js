const cube = document.getElementById('cube');
const container = document.querySelector('.container');
const toggleButton = document.getElementById('toggleRotation');
const resetButton = document.getElementById('resetCube');

let isAutoRotating = true;
let isDragging = false;
let previousMouseX = 0;
let previousMouseY = 0;
let rotationX = 0;
let rotationY = 0;
let animationId = null;

// Start auto-rotation using requestAnimationFrame instead of CSS
function autoRotate() {
    if (isAutoRotating) {
        rotationX += 0.3;
        rotationY += 0.3;
        updateCubeRotation();
        animationId = requestAnimationFrame(autoRotate);
    }
}

// Start the auto-rotation
autoRotate();

// Toggle auto-rotation
toggleButton.addEventListener('click', () => {
    isAutoRotating = !isAutoRotating;
    
    if (isAutoRotating) {
        toggleButton.textContent = getButtonText('Pause', 'Space');
        autoRotate(); // Resume from current position
    } else {
        toggleButton.textContent = getButtonText('Resume', 'Space');
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }
});

// Reset cube to initial position
resetButton.addEventListener('click', () => {
    rotationX = 0;
    rotationY = 0;
    // Force front face to show
    cube.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

// Mouse down - start dragging
container.addEventListener('mousedown', (e) => {
    if (isAutoRotating) {
        isAutoRotating = false;
        toggleButton.textContent = getButtonText('Resume', 'Space');
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }
    
    isDragging = true;
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
});

// Mouse move - rotate cube
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - previousMouseX;
    const deltaY = e.clientY - previousMouseY;
    
    rotationY += deltaX * 0.5;
    rotationX -= deltaY * 0.5;
    
    updateCubeRotation();
    
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
});

// Mouse up - stop dragging
document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Touch support for mobile
container.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent scrolling when touching the cube
    
    if (isAutoRotating) {
        isAutoRotating = false;
        toggleButton.textContent = getButtonText('Resume', '');
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    }
    
    isDragging = true;
    const touch = e.touches[0];
    previousMouseX = touch.clientX;
    previousMouseY = touch.clientY;
}, { passive: false }); // Important: allows preventDefault to work

document.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    
    e.preventDefault(); // Prevent scrolling while dragging
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - previousMouseX;
    const deltaY = touch.clientY - previousMouseY;
    
    rotationY += deltaX * 0.5;
    rotationX -= deltaY * 0.5;
    
    updateCubeRotation();
    
    previousMouseX = touch.clientX;
    previousMouseY = touch.clientY;
}, { passive: false }); // Important: allows preventDefault to work

document.addEventListener('touchend', (e) => {
    isDragging = false;
});

// Keyboard controls
document.addEventListener('keydown', (e) => {
    // Space bar to toggle rotation
    if (e.code === 'Space') {
        e.preventDefault();
        toggleButton.click();
    }
    
    // R to reset (works anytime)
    if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        resetButton.click();
        return;
    }
    
    // Arrow keys to rotate (only when paused)
    if (!isAutoRotating) {
        const rotationSpeed = 5;
        
        switch(e.key) {
            case 'ArrowUp':
                rotationX -= rotationSpeed;
                updateCubeRotation();
                break;
            case 'ArrowDown':
                rotationX += rotationSpeed;
                updateCubeRotation();
                break;
            case 'ArrowLeft':
                rotationY -= rotationSpeed;
                updateCubeRotation();
                break;
            case 'ArrowRight':
                rotationY += rotationSpeed;
                updateCubeRotation();
                break;
        }
    }
});

// Update cube rotation
function updateCubeRotation() {
    cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
}

// Get button text based on device
function getButtonText(action, key) {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile || !key) {
        return action;
    }
    return `${action} (${key})`;
}

// Update instructions based on device
function updateInstructions() {
    const instructionText = document.getElementById('instructionText');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        instructionText.textContent = 'Touch and drag to rotate';
    } else {
        instructionText.textContent = 'Click and drag to rotate • Space to pause/resume • R to reset';
    }
}

// Initialize button text
toggleButton.textContent = getButtonText('Pause', 'Space');
resetButton.textContent = getButtonText('Reset', 'R');
updateInstructions();