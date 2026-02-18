function resizeCanvas(canvas, container) {
  // Ajusta el tamaño real (pixeles) a lo que se ve (CSS)
  const rect = container.getBoundingClientRect();
  canvas.width = Math.floor(rect.width);
  canvas.height = Math.floor(rect.height);
}

function draw() {
  const canvas = document.getElementById("canvas");
  const container = canvas.parentElement; // .canvas-wrap

  if (!canvas.getContext) return;

  resizeCanvas(canvas, container);

  const ctx = canvas.getContext("2d");

  // Limpia todo el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // (Opcional) color de relleno
  ctx.fillStyle = "#2dd4bf"; // verde-agua
  ctx.fillRect(25, 25, 100, 100);

  // Limpia un área interna
  ctx.clearRect(45, 45, 60, 60);

  // Contorno
  ctx.strokeStyle = "#111827";
  ctx.lineWidth = 3;
  ctx.strokeRect(50, 50, 50, 50);
}

function initUI() {
  // Año en footer
  document.getElementById("year").textContent = new Date().getFullYear();

  // Botón redibujar
  const btn = document.getElementById("btnRedraw");
  btn.addEventListener("click", draw);

  // Redibuja al cambiar tamaño de ventana (mantiene layout sin scroll)
  window.addEventListener("resize", draw);

  draw();
}

initUI();
