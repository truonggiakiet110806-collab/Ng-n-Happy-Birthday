// Thiết lập thời gian mục tiêu (29/04/2026, 00:00:00)
const targetDate = new Date(2026, 3, 29, 0, 0, 0); 
const fullText = `Happy Brithday Nguyễn Bảo Ngân nhé! 🎉\n Chút cậu bước sang tuổi mới vẫn luôn xinh đẹp, giỏi giang và đặt biệt là luôn hạnh phúc với những gì mình lựa chọn.\n Hy vọng hôm nay sẽ là một ngày thật đáng nhớ - tràn ngập niềm vui, tiếng cười và những điều bất ngờ dễ thương dành riêng cho cậu.\n Tỏa sáng thật rực rỡ nhé! 💙✨\n Mong rằng mọi điều tuyệt vời nhất sẽ luôn đến với cậu, không chỉ hôm nay mà cả những ngày sau nữa! 🌷\n ..... \n "À mà nè... thử nhập tên và password là ngày sinh của cậu xem sao, biết đâu có bất ngờ đang chờ phía sau đó 😆💙"`;
// Cập nhật đồng hồ
function updateClock() {
    const now = new Date();
    document.getElementById('date').innerText = now.toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('time').innerText = now.toLocaleTimeString('vi-VN');

    // Chuyển cảnh nếu đến giờ
    if (now >= targetDate && document.getElementById('screen-clock').style.display !== 'none') {
        fadeOutClockAndShowWish();
    }
}
setInterval(updateClock, 1000);
updateClock();

// Hiệu ứng tắt đồng hồ mượt mà
function fadeOutClockAndShowWish() {
    const clockScreen = document.getElementById('screen-clock');
    clockScreen.style.transition = 'opacity 1.5s ease, transform 1.5s ease'; // Hiệu ứng mờ và thu nhỏ
    clockScreen.style.opacity = '0';
    clockScreen.style.transform = 'scale(0.8)'; // Thu nhỏ lại

    // Sau khi mờ hẳn (1.5s), thì hiện lời chúc
    setTimeout(showWish, 1500); 
}

// Hiệu ứng chữ (Typewriter)
function showWish() {
    const clockScreen = document.getElementById('screen-clock');
    clockScreen.style.display = 'none'; // Ẩn hẳn đồng hồ

    const wishScreen = document.getElementById('screen-wish');
    wishScreen.style.display = 'flex';
    wishScreen.style.opacity = 1;

    let i = 0;
    const textElement = document.getElementById('typewriter-text');
    const chars = [...fullText]; // 🔥 tách đúng Unicode

    let result = ""; // tránh lỗi lặp

    function type() {
        if (i < chars.length) {
            result += (chars[i] === '\n') ? '<br>' : chars[i];
            textElement.innerHTML = result; // ✅ luôn gán lại, không dùng +=
            i++;
            setTimeout(type, 50);
        } else {
            const btn = document.getElementById('btn-continue');
            btn.style.display = 'block';
            btn.style.opacity = 1;
        }
    }

    type();
}

function showLogin() {
    const wishScreen = document.getElementById('screen-wish');
    wishScreen.style.transition = 'opacity 1s ease'; // Hiệu ứng mờ
    wishScreen.style.opacity = '0';

    setTimeout(() => {
        wishScreen.style.display = 'none';
        const loginScreen = document.getElementById('screen-login');
        loginScreen.style.display = 'flex';
        loginScreen.style.opacity = 1;
    }, 1000);
}

// --- JAVASCRIPT CHO HIỆU ỨNG ĐĂNG NHẬP MƯỢT MÀ ---

/* --- CHỖ CẦN SỬA --- */

// --- JAVASCRIPT CHO HIỆU ỨNG ĐĂNG NHẬP MƯỢT MÀ ---

// Câu chúc viết tay (Nên to và rõ)
const wishText = `Ngân ơi, Chúc cậu tuổi mới luôn tỏa sáng như ánh sao, xinh đẹp như những bông hoa, và quan trọng nhất là luôn tìm thấy niềm vui trong mỗi việc mình làm nhé!`;

// --- HÀM KIỂM TRA ĐĂNG NHẬP ---
function checkLogin() {
    // 1. Lấy giá trị
    const u = document.getElementById('username').value.trim().toLowerCase();
    const p = document.getElementById('password').value.trim();

    // 2. Kiểm tra thông tin
    if (u === "nguyễn bảo ngân" && p === "29042006") {
        // Đăng nhập đúng -> Gọi hàm chạy quà tặng
        startGift(); 
        

        startCountdown(() => {
            showWishText();
        });


    } else {
        // Đăng nhập sai -> Hiện popup lỗi
        const errorPopup = document.getElementById('error-popup');
        errorPopup.style.display = 'flex';
    }
}

// --- HÀM ĐÓNG POPUP LỖI ---
function closeErrorPopup() {
    document.getElementById('error-popup').style.display = 'none';
}

// --- HÀM QUÀ TẶNG (GỌI KHI ĐÚNG MẬT KHẨU) ---
// Hàm tạo delay để code dừng lại chờ
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function startGift() {
    // 1. Ẩn màn hình đăng nhập, hiện canvas
    document.getElementById('screen-login').style.display = 'none';
    document.getElementById('final-gift-screen').style.display = 'flex';
    
    // 2. Chạy hiệu ứng nền
    initRainEffect();
    initHeartEffect();
    
    // 3. Đếm ngược 3 - 2 - 1
    const textElement = document.getElementById('text-display');
    const countdown = ["3", "2", "1"];
    
    for (let num of countdown) {
        textElement.style.fontFamily = "'Orbitron', sans-serif";
        textElement.innerText = num;
        textElement.style.opacity = '1';
        await sleep(1000); // Hiện 1 giây
        textElement.style.opacity = '0';
        await sleep(300); // Nghỉ 0.3 giây
    }
    
    // 4. Mảng các lời chúc
    const messages = [
        "Happy Birthday",
        "Nguyễn Bảo Ngân",
        "29.04.2006",
        "Happy 20+"
    ];
    
    // 5. Chạy lần lượt các lời chúc
    for (let i = 0; i < messages.length; i++) {
        await runSimpleText(messages[i]);
    }

    // 👉 chạy xong hết mới chuyển GIF
    await sleep(4000);
    await showGifScreen();


    setTimeout(() => {
        const gif = document.getElementById('gif-screen');

    // 👉 thêm class để chạy animation biến mất
        gif.classList.add("hide");

    // ⏳ chờ animation xong rồi mới chuyển
        setTimeout(() => {
            startTextRain();
        }, 1000);

    }, 6000);
}

// --- HÀM TRÁI TIM ---
function initHeartLogic() {
    const canvas = document.getElementById('heart-canvas');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let trails = [], heartPath = [];

    for (let i = 0; i < 60; i++) {
        const t = (i / 60) * 6.28;
        heartPath.push([
            width/2 + 160 * Math.pow(Math.sin(t), 3),
            height/2 + 10 * (-(15 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)))
        ]);
    }

    for (let i = 0; i < 40; i++) {
        trails.push({ x: Math.random()*width, y: Math.random()*height, velX: 0, velY: 0 });
    }

    function loop() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.fillRect(0, 0, width, height);
        
        trails.forEach((p, i) => {
            let target = heartPath[i % heartPath.length];
            p.velX += (target[0] - p.x) * 0.012;
            p.velY += (target[1] - p.y) * 0.012;
            p.x += p.velX; p.y += p.velY;
            p.velX *= 0.9; p.velY *= 0.9;
            
            ctx.fillStyle = "#FF80AB";
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(loop);
    }
    loop();
}

// --- LOGIC TRÁI TIM BAY (Dọn dẹp code cho mượt) ---
function initHeartLogic() {
    const canvas = document.getElementById('c');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let trails = [], heartPath = [];

    // Tạo hình trái tim
    for (let i = 0; i < 60; i++) {
        const t = (i / 60) * 6.28;
        heartPath.push([
            width/2 + 160 * Math.pow(Math.sin(t), 3),
            height/2 + 10 * (-(15 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t)))
        ]);
    }

    // Tạo các hạt
    for (let i = 0; i < 40; i++) {
        trails.push({ x: Math.random()*width, y: Math.random()*height, velX: 0, velY: 0 });
    }

    function loop() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
        ctx.fillRect(0, 0, width, height);
        
        trails.forEach((p, i) => {
            let target = heartPath[i % heartPath.length];
            p.velX += (target[0] - p.x) * 0.012;
            p.velY += (target[1] - p.y) * 0.012;
            p.x += p.velX; p.y += p.velY;
            p.velX *= 0.9; p.velY *= 0.9;
            
            ctx.fillStyle = "#FF80AB"; // Màu hồng neon
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(loop);
    }
    loop();
}

//..........................

function showWishes() {
    const lines = [
        "Chúc mừng sinh nhật",
        "Nguyễn Bảo Ngân",
        "29.04.2006",
        "Happy 20+"
    ];
    
    lines.forEach((text, index) => {
        setTimeout(() => {
            const element = document.getElementById(`line${index + 1}`);
            if (element) {
                element.innerText = text;
                element.style.opacity = '1';
                element.style.transition = 'opacity 1s ease'; // Hiệu ứng hiện chữ từ từ
            }
        }, (index + 1) * 1200); // 1.2 giây mỗi dòng cho nhanh nhẹn
    });
}


// Hàm chạy chữ theo "Kịch bản": Hiện một lúc -> Ẩn -> Hiện câu tiếp
function showWishesInOrder() {
    const lines = [
        "line1", // Chúc mừng sinh nhật
        "line2", // Nguyễn Bảo Ngân
        "line3", // 29.04.2006
        "line4"  // Happy 20+
    ];
    
    // Tổng thời gian cho một câu hiện (Hiện 2.5s + Ẩn 1.5s = 4s)
    const timePerLine = 4000; 

    lines.forEach((id, index) => {
        // Tính toán thời gian bắt đầu cho từng câu
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                // 1. Hiện câu này lên
                element.classList.add('active');
                
                // 2. Sau một lúc (2.5s), thì ẩn nó đi
                setTimeout(() => {
                    element.classList.remove('active');
                }, 2500); 
            }
        }, index * timePerLine); // Các câu chạy nối tiếp nhau
    });
}


// Hàm để đóng bảng báo lỗi
function closeErrorPopup() {
    const errorPopup = document.getElementById('error-popup');
    errorPopup.style.display = 'none';
}

// HIỆU ỨNG TRÁI TIM BAY (Code tạo trái tim)
function createHearts() {
    const heartBar = document.querySelector('.heart-bar');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = Math.random() * 100 + 'vw'; // Vị trí ngẫu nhiên
    heart.style.animationDuration = Math.random() * 2 + 3 + 's'; // Tốc độ ngẫu nhiên
    heart.innerText = '💗'; // Ký tự trái tim
    heartBar.appendChild(heart);

    // Xóa trái tim sau khi bay xong
    setTimeout(() => {
        heart.remove();
    }, 5000);
}
setInterval(createHearts, 300); // Tạo trái tim mới mỗi 0.3 giây









// --- HÀM 1: MƯA CHỮ HAPPY BIRTHDAY ---
// --- 1. MƯA CHỮ THƯA VÀ TINH TẾ HƠN ---
// --- 1. MƯA CHỮ DẦY VÀ ĐẬM ĐÀ HƠN (VỀ LẠI CŨ) ---
function initRainEffect() {
    const canvas = document.getElementById('canvas-rain');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Đặt lại khoảng cách cột (về 20) và tăng cỡ chữ để mưa dầy
    const fontSize = 18;
    const columns = canvas.width / 20; 
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Xóa nhanh hơn chút để giảm rối
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#FFB6C1'; // Màu hồng pastel nhẹ
        ctx.font = fontSize + 'px monospace';
        
        drops.forEach((y, i) => {
            const text = "HAPPYBIRTHDAY";
            const char = text.charAt(Math.floor(Math.random() * text.length));
            // Vẽ chữ dầy (trên mỗi 20px)
            ctx.fillText(char, i * 20, y * fontSize);
            
            // Tăng tỉ lệ xuất hiện mới (tăng lên 0.985 để mưa dầy)
            if (y * fontSize > canvas.height && Math.random() > 0.985) drops[i] = 0;
            drops[i]++;
        });
    }
    // Tốc độ vẽ nhanh hơn (40ms) để dầy hơn
    setInterval(draw, 40); 
}

// --- THAY THẾ HOÀN TOÀN HÀM NÀY TRONG SCRIPT.JS ---
function initHeartEffect() {
    const canvas = document.getElementById('heart-canvas');
    if (!canvas) return; // Bảo vệ nếu không tìm thấy canvas

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // --- CÁC ĐIỂM CỐ ĐỊNH CỦA TRÁI TIM ---
    const heartPoints = [];
    const totalPoints = 100;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const scale = 20; // Phóng to trái tim

    for (let i = 0; i < totalPoints; i++) {
        const t = (i / totalPoints) * Math.PI * 2;
        // Công thức toán học chuẩn vẽ trái tim
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        heartPoints.push({ x: x * scale + centerX, y: y * scale + centerY });
    }

    // --- BIẾN TRẠNG THÁI ---
    let particles = []; // Chứa các hạt phân rã
    let isDrawing = true; // Đang trong chế độ vẽ viền
    let currentDrawIndex = 0; // Hạt đang vẽ đến

    // Màu Neon rực rỡ (trùng màu với video bạn gửi)
    const neonColor = "#FF0055"; 

    function draw() {
        // 1. Làm sạch canvas (trong suốt) để lộ mưa chữ bên dưới
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 2. THIẾT LẬP HIỆU ỨNG NEON TOẢ SÁNG
        ctx.shadowBlur = 20; // Độ tỏa sáng (Bloom)
        ctx.shadowColor = neonColor;
        ctx.strokeStyle = neonColor;
        ctx.lineWidth = 5; // Độ dày nét vẽ
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        // --- TRẠNG THÁI 1: ĐANG VẼ VIỀN (DRAWING PATH) ---
        if (isDrawing) {
            ctx.beginPath();
            for (let i = 0; i < currentDrawIndex; i++) {
                if (i === 0) ctx.moveTo(heartPoints[i].x, heartPoints[i].y);
                else ctx.lineTo(heartPoints[i].x, heartPoints[i].y);
            }
            ctx.stroke();

            // Tăng dần điểm vẽ, khi xong thì chuyển trạng thái
            if (currentDrawIndex < heartPoints.length - 1) {
                currentDrawIndex += 0.5; // Tốc độ vẽ mượt
            } else {
                // Đã vẽ xong viền! Chờ 1 giây rồi phân rã
                isDrawing = false;
                
                // Khởi tạo các hạt phân rã tại chính các điểm của viền
                particles = heartPoints.map(p => ({
                    x: p.x, 
                    y: p.y, 
                    alpha: 1, // Độ mờ dần
                    size: 4, // Cỡ hạt
                    // Vận tốc bay ngẫu nhiên tỏa ra
                    vx: (Math.random() - 0.5) * 4, 
                    vy: (Math.random() - 0.5) * 4 + 1 // Bay lên nhẹ
                }));
            }
        } 
        
        // --- TRẠNG THÁI 2: ĐANG PHÂN RÃ TAN BIẾN (DECAY PARTICLES) ---
        else {
            // Vẽ các hạt ánh sáng
            ctx.shadowBlur = 10; // Giảm Bloom một chút cho hạt
            
            particles.forEach((p, i) => {
                // Di chuyển hạt
                p.x += p.vx;
                p.y += p.vy;
                // Mờ dần và thu nhỏ
                p.alpha -= 0.01; 
                p.size *= 0.98; 

                if (p.alpha > 0) {
                    // Vẽ hạt với độ tỏa sáng Neon
                    ctx.fillStyle = `rgba(255, 0, 85, ${p.alpha})`; // neonColor dạng RGBA
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                } else {
                    // Hạt tan biến hoàn toàn
                    particles.splice(i, 1);
                }
            });

            // Nếu tất cả các hạt đã tan biến, vẽ lại từ đầu
            if (particles.length === 0) {
                isDrawing = true;
                currentDrawIndex = 0;
            }
        }

        requestAnimationFrame(draw);
    }
    draw();
}




function showWishText() {
    const lines = document.querySelectorAll('.fade-text-wish');

    lines.forEach((line, index) => {
        setTimeout(() => {
            line.classList.add('show');
        }, index * 1200);
    });
}

function startCountdown(callback) {
    const el = document.getElementById("countdown");
    let numbers = [3, 2, 1];
    let i = 0;

    el.style.display = "block";

    function run() {
        el.textContent = numbers[i];

        // chạy animation
        el.classList.remove("show");
        void el.offsetWidth;
        el.classList.add("show");

        i++;

        // ⏱️ thời gian HIỆU ỨNG + ĐỨNG YÊN
        setTimeout(() => {
            if (i < numbers.length) {
                run();
            } else {
                el.style.display = "none";
                if (callback) callback();
            }
        }, 1500); // 💥 CHỖ QUAN TRỌNG (đứng lâu hơn)
    }

    run();
}




function createTextShape(text) {
    const tempCanvas = document.createElement("canvas");
    const tctx = tempCanvas.getContext("2d");

    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    tctx.fillStyle = "white";
    tctx.font = "bold 80px Arial";
    tctx.textAlign = "center";
    tctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const data = tctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let points = [];

    for (let y = 0; y < canvas.height; y += 6) {
        for (let x = 0; x < canvas.width; x += 6) {
            const i = (y * canvas.width + x) * 4;
            if (data[i + 3] > 128) {
                points.push({ x, y });
            }
        }
    }

    return points;
}

class Particle {
    constructor(x, y) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tx = x;
        this.ty = y;
        this.vx = 0;
        this.vy = 0;
        this.alpha = 1;
    }

    update() {
        let dx = this.tx - this.x;
        let dy = this.ty - this.y;

        this.vx += dx * 0.02;
        this.vy += dy * 0.02;

        this.vx *= 0.85;
        this.vy *= 0.85;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        ctx.fillStyle = `rgba(255, 80, 170, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
    }
}

async function runNanoText(text) {

    particles = [];
    targetPoints = createTextShape(text);

    for (let i = 0; i < targetPoints.length; i++) {
        particles.push(
            new Particle(targetPoints[i].x, targetPoints[i].y)
        );
    }

    // animation build
    for (let t = 0; t < 120; t++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        await sleep(16);
    }

    await sleep(800);

    // tan biến
    for (let t = 0; t < 80; t++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += (Math.random() - 0.5) * 5;
            p.y += (Math.random() - 0.5) * 5;
            p.alpha -= 0.02;
            p.draw();
        });

        await sleep(16);
    }
}


async function runSimpleText(text) {
    const el = document.getElementById("text-display");

    el.classList.remove("glow-show", "fade-out");

    el.innerText = text;

    // reset
    el.style.opacity = "1";

    // bật hiệu ứng xuất hiện
    el.classList.add("glow-show");

    await sleep(1800);

    // fade out
    el.classList.remove("glow-show");
    el.classList.add("fade-out");

    await sleep(600);
}


async function showGifScreen() {

    // 🔥 TẮT TẤT CẢ MÀN HÌNH CŨ
    document.getElementById("screen-login").style.display = "none";
    document.getElementById("screen-wish").style.display = "none";
    document.getElementById("final-gift-screen").style.display = "none";

    // 👉 hiện GIF screen
    const gif = document.getElementById("gif-screen");
    gif.style.display = "flex";

    // đổi nền cho chắc chắn không bị login lòi ra
    document.body.style.background =
        "linear-gradient(135deg, #ff9a9e, #fad0c4)";
}









function startTextRain() {
    document.getElementById('gif-screen').style.display = 'none';
    document.getElementById('text-rain-screen').style.display = 'block';

    const container = document.getElementById('text-container');
    container.innerHTML = "";

    const texts = [
        "🎂 Happy Birthday 🎂",
        "💙 Nguyễn Bảo Ngân 💙",
        "✨ Tuổi mới thật rực rỡ ✨",
        "🌸 Luôn xinh đẹp nhé 🌸",
        "🎉 Chúc cậu luôn hạnh phúc 🎉",
        "💫 Always be shining 💫",
        "🌷 Điều tốt đẹp sẽ đến 🌷",
        "🎁 Một ngày thật đặc biệt 🎁"
    ];

    const icons = ["💖","✨","🎉","🎂","🌸","💫","🎁","💙"];


    const colors = [
        "#ff80ab",
        "#ffd6e0",
        "#ff9aa2",
        "#a0e7e5",
        "#b4f8c8",
        "#fff5ba",
        "#cdb4db"
    ];

    for (let i = 0; i < 60; i++) {
        const el = document.createElement("div");

        // random chữ hoặc icon
        el.innerText = Math.random() > 0.7
            ? icons[Math.floor(Math.random() * icons.length)]
            : texts[Math.floor(Math.random() * texts.length)];

        el.className = "falling-text";
        el.style.color = colors[Math.floor(Math.random() * colors.length)];

        // vị trí ngang
        el.style.left = Math.random() * 100 + "vw";

        // delay rơi
        el.style.animationDelay = Math.random() * 5 + "s";

        // tốc độ rơi
        el.style.animationDuration = (5 + Math.random() * 5) + "s";

        // 🌟 CHIỀU SÂU (QUAN TRỌNG)
        const depth = Math.random();

        el.style.fontSize = (14 + depth * 20) + "px"; // nhỏ lại
        el.style.opacity = 0.4 + depth * 0.6;
        el.style.filter = `blur(${(1 - depth) * 1.5}px)`;

        container.appendChild(el);
    }

    // ❄️ thêm tuyết
    createSnow();
}


let isDragging = false;

document.addEventListener("mousedown", (e) => {
    if (e.button === 0) { // chuột trái
        isDragging = true;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return; // ❌ không giữ chuột thì không xoay

    const container = document.getElementById("text-container");

    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;

    container.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
});

function createSnow() {
    const container = document.getElementById("text-container");

    for (let i = 0; i < 60; i++) {
        const snow = document.createElement("div");
        snow.className = "snow";

        snow.style.left = Math.random() * 100 + "vw";
        snow.style.animationDuration = (5 + Math.random() * 5) + "s";
        snow.style.animationDelay = Math.random() * 5 + "s";

        const size = Math.random() * 5 + 2;
        snow.style.width = size + "px";
        snow.style.height = size + "px";

        container.appendChild(snow);
    }
}







let isPlaying = false;

function toggleMusic() {
    const music = document.getElementById("bg-music");
    const btn = document.getElementById("music-btn");

    if (!isPlaying) {
        music.play().then(() => {
            music.volume = 0.5;
            btn.innerText = "🔊";
            isPlaying = true;
        }).catch(() => {
            alert("Không phát được nhạc 😢");
        });
    } else {
        music.pause();
        btn.innerText = "🔇";
        isPlaying = false;
    }
}

