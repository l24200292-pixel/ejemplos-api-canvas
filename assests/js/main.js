function resizeCanvas(canvas, container) {
  const rect = container.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

function draw() {
  const canvas = document.getElementById("canvas");
  const container = canvas.parentElement;
  if (!canvas.getContext) return;
  resizeCanvas(canvas, container);
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const topY = H * 0.10;

  // ===== 1. RECTÁNGULOS =====
  const size = W * 0.12;
  const innerSize = size * 0.5;
  const borderWidth = 4;
  const x = W * 0.05;
  const y = topY - size / 2;
  ctx.fillStyle = "#2d94d4";
  ctx.fillRect(x, y, size, size);
  const innerX = x + (size - innerSize) / 2;
  const innerY = y + (size - innerSize) / 2;
  ctx.clearRect(innerX, innerY, innerSize, innerSize);
  ctx.strokeStyle = "#270c81";
  ctx.lineWidth = borderWidth;
  ctx.strokeRect(innerX, innerY, innerSize, innerSize);

  // ===== 2. TRIÁNGULO =====
  const triangleX = x + size + 20;
  const triangleHeight = size;
  ctx.beginPath();
  ctx.moveTo(triangleX, topY);
  ctx.lineTo(triangleX + size * 0.6, topY + triangleHeight / 2);
  ctx.lineTo(triangleX + size * 0.6, topY - triangleHeight / 2);
  ctx.closePath();
  ctx.fillStyle = "#16a9f9";
  ctx.fill();

  // ===== 3. CARITA =====
  const faceX = W * 0.35;
  const faceY = topY;
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.arc(faceX, faceY, 50, 0, Math.PI * 2);
  ctx.moveTo(faceX + 35, faceY);
  ctx.arc(faceX, faceY, 35, 0, Math.PI, false);
  ctx.moveTo(faceX - 10, faceY - 15);
  ctx.arc(faceX - 15, faceY - 15, 5, 0, Math.PI * 2);
  ctx.moveTo(faceX + 20, faceY - 15);
  ctx.arc(faceX + 15, faceY - 15, 5, 0, Math.PI * 2);
  ctx.strokeStyle = "#000000";
  ctx.stroke();

  // ===== 4. TRIÁNGULOS PROPORCIONALES =====
  const tX = W * 0.45;
  const tY = H * 0.03;
  const tSize = W * 0.10;
  const offset = tSize * 0.1;
  ctx.beginPath();
  ctx.moveTo(tX, tY);
  ctx.lineTo(tX + tSize, tY);
  ctx.lineTo(tX, tY + tSize);
  ctx.closePath();
  ctx.fillStyle = "#78a9f7";
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(tX + offset, tY + tSize + offset);
  ctx.lineTo(tX + tSize + offset, tY + tSize + offset);
  ctx.lineTo(tX + tSize + offset, tY + offset);
  ctx.closePath();
  ctx.strokeStyle = "#04000b";
  ctx.lineWidth = 2;
  ctx.stroke();

  // ===== 5. CORAZÓN =====
  ctx.save();
  const heartX = W * 0.65;
  const heartY = H * 0.05;
  const scale = (Math.min(W, H) / 800) * 0.8;
  ctx.beginPath();
  ctx.moveTo(heartX, heartY);
  ctx.bezierCurveTo(
    heartX - 50 * scale, heartY - 60 * scale,
    heartX - 150 * scale, heartY + 20 * scale,
    heartX, heartY + 130 * scale
  );
  ctx.bezierCurveTo(
    heartX + 150 * scale, heartY + 20 * scale,
    heartX + 50 * scale, heartY - 60 * scale,
    heartX, heartY
  );
  ctx.fillStyle = "#a1c7df";
  ctx.fill();
  ctx.restore();

  // ===== 6. GRID ARCOS =====
  const gridCenterX = W * 0.20;
  const gridStartY = H * 0.25;
  const spacingX = 90;
  const spacingY = 80;
  const radius = 22;
  const cols = 3;
  const rows = 4;
  const gridWidth = (cols - 1) * spacingX;
  const startX = gridCenterX - gridWidth / 2;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const xPos = startX + j * spacingX;
      const yPos = gridStartY + i * spacingY;
      ctx.beginPath();
      const endAngle = Math.PI + (Math.PI * j) / 2;
      const ccw = i % 2 !== 0;
      ctx.arc(xPos, yPos, radius, 0, endAngle, ccw);
      if (i < 2) {
        ctx.strokeStyle = "#84cefc";
        ctx.lineWidth = 3;
        ctx.stroke();
      } else {
        ctx.fillStyle = "#3b82f6";
        ctx.fill();
      }
    }
  }

// ===== 7. PACMAN COLOREADO =====
  // Posicionamiento en el canvas
  const pacmanX = W * 0.38; 
  const pacmanY = H * 0.24; 
  drawPacman(ctx, pacmanX, pacmanY);
}

function drawPacman(ctx, offsetX, offsetY) {
  ctx.strokeStyle = "#270c81";
  ctx.fillStyle = "#3b82f6";
  ctx.lineWidth = 2;

  // 1. LABERINTO (Marcos exteriores)
  roundedRect(ctx, offsetX, offsetY, 150, 150, 15);      
  roundedRect(ctx, offsetX + 7, offsetY + 7, 136, 136, 9); 

  // 2. MUROS INTERNOS
  roundedRect(ctx, offsetX + 30, offsetY + 45, 40, 30, 10);  // Superior Izq
  roundedRect(ctx, offsetX + 85, offsetY + 45, 40, 30, 10);  // Superior Der
  roundedRect(ctx, offsetX + 30, offsetY + 105, 50, 16, 6);  // Inferior Horizontal
  roundedRect(ctx, offsetX + 105, offsetY + 95, 25, 35, 10); // Inferior Vertical

  // 3. PAC-MAN
  ctx.beginPath();
  ctx.arc(offsetX + 25, offsetY + 25, 11, Math.PI / 7, -Math.PI / 7, false);
  ctx.lineTo(offsetX + 20, offsetY + 25);
  ctx.fill();

  // 4. PUNTOS (COLOCACIÓN CORREGIDA POR PASILLOS)
  ctx.fillStyle = "#3b82f6";

  // Fila superior: rastro horizontal
  for (let i = 0; i < 6; i++) { 
    ctx.fillRect(offsetX + 55 + i * 15, offsetY + 23, 4, 4); 
  }

  // Pasillo vertical central: bajando por el hueco de en medio (x=75 aprox)
  for (let i = 0; i < 4; i++) { 
    ctx.fillRect(offsetX + 74, offsetY + 40 + i * 15, 4, 4); 
  }

  // Pasillo vertical derecho: bajando por el borde derecho (x=130 aprox)
  for (let i = 0; i < 4; i++) { 
    ctx.fillRect(offsetX + 130, offsetY + 45 + i * 12, 4, 4); 
  }

  // Punto extra cerca del fantasma
  ctx.fillRect(offsetX + 93, offsetY + 85, 4, 4);

  // 5. FANTASMA (Centrado)
  const fx = offsetX + 65; 
  const fy = offsetY + 90;
  ctx.beginPath();
  ctx.moveTo(fx, fy + 15);
  ctx.lineTo(fx, fy);
  ctx.bezierCurveTo(fx, fy - 10, fx + 22, fy - 10, fx + 22, fy);
  ctx.lineTo(fx + 22, fy + 15);
  ctx.lineTo(fx + 16.5, fy + 10);
  ctx.lineTo(fx + 11, fy + 15);
  ctx.lineTo(fx + 5.5, fy + 10);
  ctx.lineTo(fx, fy + 15);
  ctx.fill();

  // Ojos del Fantasma
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.arc(fx + 7, fy, 3, 0, Math.PI * 2);
  ctx.arc(fx + 15, fy, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "black";
  ctx.beginPath();
  ctx.arc(fx + 8, fy, 1.5, 0, Math.PI * 2);
  ctx.arc(fx + 16, fy, 1.5, 0, Math.PI * 2);
  ctx.fill();
}

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.stroke();
}
function resizeCanvas(canvas, container) {
  const rect = container.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
}

// Inicialización
window.addEventListener("resize", draw);
draw();