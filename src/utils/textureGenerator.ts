import * as THREE from 'three';

export function createProductTexture(productType: 'cheese-jalapeno' | 'truffle-pepper'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  if (!ctx) return new THREE.CanvasTexture(canvas);

  if (productType === 'cheese-jalapeno') {
    // Background Gradient: Bright Fiery Orange & Golden Yellow
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    bgGrad.addColorStop(0, '#f97316');
    bgGrad.addColorStop(0.35, '#fb923c');
    bgGrad.addColorStop(0.65, '#eab308');
    bgGrad.addColorStop(1, '#ea580c');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Dynamic sunburst rays in center
    ctx.save();
    ctx.translate(512, 512);
    ctx.fillStyle = 'rgba(254, 240, 138, 0.25)';
    for (let i = 0; i < 16; i++) {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 700, (i * Math.PI) / 8, ((i + 0.5) * Math.PI) / 8);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Top Crimp Seal Pattern
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    for (let x = 0; x < 1024; x += 12) {
      ctx.fillRect(x, 0, 6, 45);
      ctx.fillRect(x, 979, 6, 45);
    }

    // Top Badges
    // 150g e
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 32px sans-serif';
    ctx.fillText('150g e', 60, 90);

    // Natural Ingredients Badge
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.arc(920, 85, 45, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NATURAL', 920, 80);
    ctx.fillText('INGREDIENTS', 920, 100);

    // Brand Name: CRUNCHY BITES
    ctx.textAlign = 'center';

    // 3D Shadow for Brand
    ctx.fillStyle = '#1e3a8a';
    ctx.font = '900 92px "Arial Black", sans-serif';
    ctx.fillText('CRUNCHY', 516, 215);
    ctx.fillText('BITES', 516, 305);

    // Outer Stroke
    ctx.lineWidth = 14;
    ctx.strokeStyle = '#ffffff';
    ctx.strokeText('CRUNCHY', 512, 210);
    ctx.strokeText('BITES', 512, 300);

    // Inner Fill
    ctx.fillStyle = '#facc15';
    ctx.fillText('CRUNCHY', 512, 210);
    ctx.fillText('BITES', 512, 300);

    // Explosive Flavor Burst Banner behind Cheese & Jalapeño
    ctx.save();
    ctx.translate(512, 450);
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    const numPoints = 18;
    for (let i = 0; i < numPoints; i++) {
      const angle = (i * Math.PI * 2) / numPoints;
      const radius = i % 2 === 0 ? 320 : 250;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * (radius * 0.45);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#fef08a';
    ctx.stroke();
    ctx.restore();

    // Text: CHEESE & JALAPEÑO
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 78px "Arial Black", sans-serif';
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#000000';
    ctx.strokeText('CHEESE &', 512, 430);
    ctx.strokeText('JALAPEÑO', 512, 510);
    ctx.fillText('CHEESE &', 512, 430);
    ctx.fillText('JALAPEÑO', 512, 510);

    // Subtitle
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('Potato Chips • Fiery & Savory', 512, 580);

    // Drawn Jalapeño & Cheese Slice Graphics
    // Melted Cheese block right
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.ellipse(680, 720, 140, 90, -0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.ellipse(660, 700, 110, 70, -0.2, 0, Math.PI * 2);
    ctx.fill();

    // Melt drips
    ctx.beginPath();
    ctx.arc(620, 780, 25, 0, Math.PI * 2);
    ctx.arc(670, 810, 30, 0, Math.PI * 2);
    ctx.arc(730, 790, 20, 0, Math.PI * 2);
    ctx.fill();

    // Jalapeño Pepper on Left
    ctx.save();
    ctx.translate(320, 730);
    ctx.rotate(-0.4);
    ctx.fillStyle = '#15803d';
    ctx.beginPath();
    ctx.ellipse(0, 0, 130, 50, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.ellipse(-20, -10, 90, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    // Stem
    ctx.strokeStyle = '#14532d';
    ctx.lineWidth = 12;
    ctx.beginPath();
    ctx.moveTo(120, 0);
    ctx.quadraticCurveTo(150, -20, 160, -40);
    ctx.stroke();
    ctx.restore();

    // Sliced Jalapeño Rings
    [
      { x: 260, y: 880, r: 40 },
      { x: 512, y: 820, r: 45 },
      { x: 780, y: 860, r: 35 }
    ].forEach((ring) => {
      ctx.fillStyle = '#166534';
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#86efac';
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r * 0.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fef08a';
      for (let s = 0; s < 5; s++) {
        const sa = (s * Math.PI * 2) / 5;
        ctx.beginPath();
        ctx.arc(
          ring.x + Math.cos(sa) * (ring.r * 0.35),
          ring.y + Math.sin(sa) * (ring.r * 0.35),
          5,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });

    // Gold Ridged Potato Chip Artwork in Center
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.ellipse(512, 720, 130, 80, 0.1, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ca8a04';
    ctx.lineWidth = 4;
    for (let r = -100; r <= 100; r += 16) {
      ctx.beginPath();
      ctx.arc(512 + r, 720, 70, -0.8, 0.8);
      ctx.stroke();
    }

    // Bottom Banner
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 930, 1024, 94);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px sans-serif';
    ctx.fillText('NET WT. 150g • HIGH MONOUNSATURATED OIL', 512, 975);

  } else {
    // TERRA & TRUFFLE: Matte Black & Metallic Gold Foil Packaging
    const bgGrad = ctx.createLinearGradient(0, 0, 0, 1024);
    bgGrad.addColorStop(0, '#0d0d0d');
    bgGrad.addColorStop(0.3, '#171717');
    bgGrad.addColorStop(0.7, '#0a0a0a');
    bgGrad.addColorStop(1, '#111111');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1024, 1024);

    // Subtle Gold Dust Texture overlay
    ctx.fillStyle = 'rgba(216, 181, 108, 0.08)';
    for (let i = 0; i < 400; i++) {
      const px = Math.random() * 1024;
      const py = Math.random() * 1024;
      ctx.fillRect(px, py, 2, 2);
    }

    // Top Crimp Seal
    ctx.fillStyle = 'rgba(216, 181, 108, 0.2)';
    for (let x = 0; x < 1024; x += 10) {
      ctx.fillRect(x, 0, 5, 45);
      ctx.fillRect(x, 979, 5, 45);
    }

    // Top Gold Trim Bar
    const goldGrad = ctx.createLinearGradient(0, 0, 1024, 0);
    goldGrad.addColorStop(0, '#bf953f');
    goldGrad.addColorStop(0.25, '#fcf6ba');
    goldGrad.addColorStop(0.5, '#b38728');
    goldGrad.addColorStop(0.75, '#fbf5b7');
    goldGrad.addColorStop(1, '#aa771c');

    ctx.fillStyle = goldGrad;
    ctx.fillRect(0, 45, 1024, 12);
    ctx.fillRect(0, 967, 1024, 12);

    // Gourmet Series Seal Tag on left
    ctx.fillRect(60, 45, 80, 180);
    ctx.fillStyle = '#0a0a0a';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('GOURMET', 100, 100);
    ctx.fillText('SERIES', 100, 130);

    // Brand Name: TERRA & TRUFFLE
    ctx.fillStyle = goldGrad;
    ctx.font = 'bold 76px "Playfair Display", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('TERRA & TRUFFLE', 512, 180);

    // Subheader
    ctx.font = '600 24px sans-serif';
    ctx.fillStyle = '#d8b56c';
    ctx.fillText('A R T I S A N   P O T A T O   C H I P S', 512, 230);

    // Decorative Gold Filigree Line
    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 260);
    ctx.lineTo(430, 260);
    ctx.arc(512, 260, 6, 0, Math.PI * 2);
    ctx.moveTo(594, 260);
    ctx.lineTo(824, 260);
    ctx.stroke();

    // Flavor Header: TRUFFLE & BLACK PEPPER
    ctx.font = 'bold 82px "Playfair Display", Georgia, serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('TRUFFLE &', 512, 370);
    ctx.fillStyle = goldGrad;
    ctx.fillText('BLACK PEPPER', 512, 460);

    // Black Truffle & Pepper Graphic Artwork
    // Whole Black Truffle left
    ctx.save();
    ctx.translate(410, 640);
    const trufGrad = ctx.createRadialGradient(-20, -20, 10, 0, 0, 120);
    trufGrad.addColorStop(0, '#332921');
    trufGrad.addColorStop(0.6, '#1a130e');
    trufGrad.addColorStop(1, '#080503');
    ctx.fillStyle = trufGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, 110, 95, 0, 0, Math.PI * 2);
    ctx.fill();

    // Truffle knobby texture bumps
    ctx.fillStyle = '#261c14';
    for (let b = 0; b < 60; b++) {
      const bx = (Math.random() - 0.5) * 180;
      const by = (Math.random() - 0.5) * 150;
      ctx.beginPath();
      ctx.arc(bx, by, 8 + Math.random() * 8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Cut Truffle slice with marbled veins right
    ctx.save();
    ctx.translate(620, 620);
    ctx.fillStyle = '#2b2118';
    ctx.beginPath();
    ctx.ellipse(0, 0, 90, 75, 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#d8b56c';
    ctx.lineWidth = 1.5;
    // Marbling veins inside slice
    for (let v = 0; v < 12; v++) {
      ctx.beginPath();
      ctx.moveTo(-60 + v * 10, -50);
      ctx.bezierCurveTo(-20, -10 + v * 4, 20, 10 - v * 4, 60 - v * 10, 50);
      ctx.stroke();
    }
    ctx.restore();

    // Golden Hand-Cooked Chips in Foreground
    ctx.save();
    ctx.translate(512, 730);
    const chipGrad = ctx.createLinearGradient(-100, -50, 100, 50);
    chipGrad.addColorStop(0, '#fef08a');
    chipGrad.addColorStop(0.5, '#eab308');
    chipGrad.addColorStop(1, '#ca8a04');
    ctx.fillStyle = chipGrad;
    ctx.beginPath();
    ctx.ellipse(0, 0, 140, 70, -0.1, 0, Math.PI * 2);
    ctx.fill();

    // Cracked Black Pepper dots on chip
    ctx.fillStyle = '#0f172a';
    for (let p = 0; p < 70; p++) {
      const px = (Math.random() - 0.5) * 220;
      const py = (Math.random() - 0.5) * 100;
      ctx.fillRect(px, py, 3, 3);
    }
    ctx.restore();

    // Subtitle badges at bottom
    ctx.fillStyle = '#d8b56c';
    ctx.font = '600 24px sans-serif';
    ctx.fillText('PREMIUM HAND-COOKED  •  CRUNCHY & GOURMET', 512, 860);

    ctx.font = 'bold 30px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('150g e', 512, 920);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
