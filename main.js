// gsap.config({nullTargetWarn: false});

// let tl = gsap.timeline({
//     scrollTrigger :{
//         trigger : "#home",
//         pin: '#home', 
//         triggerHook: 0,
//         scrub: 0.1,
//         start : "top top",
//         end: '+200',
 
//     }
// })


// tl.fromTo('.right-logo',5, {x:"0%"},{x:"140%"},"first")
// tl.fromTo('.left-logo',5, {x:"0%"},{x:"-100%"},"first")
// tl.from('.wlecom h1',5, {opacity:'0'},"second")
// tl.from('.wlecom p',5, {opacity:'0'},"third")
// tl.fromTo('.box',2, {width:'0%'},{width:'95%'},'forth')
// tl.to('.wlecom',5, { opacity:'0',display:"none"},"fif")
// tl.to('.second-message',5, {y:"30%",opacity:'1',display:"block"},"six")
// tl.to('.second-message',5, { opacity:'0',display:"none"},"sev")
// tl.to('.third-message',5, {y:"30%",opacity:'1',display:"block"},"egh")
// tl.to('.third-message',5, { opacity:'0',display:"none"},"nine")
// tl.to('.right-logo',5, {scale: 1.5, opacity:'0',display:"none"},"h")
// tl.to('.left-logo',5, {scale:1.5, opacity:'0',display:"none"},"h")
// tl.to('.mouse',5, {scale:1.5, opacity:'0',display:"none"},"h")


var canvas = document.getElementById("canvas"),
ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var stars = [], // Array that contains the stars
FPS = 60, // Frames per second
x = 100, // Number of stars
mouse = {
  x: 0,
  y: 0
};  // mouse location

// Push stars to array

for (var i = 0; i < x; i++) {
stars.push({
x: Math.random() * canvas.width,
y: Math.random() * canvas.height,
radius: Math.random() * 1 + 1,
vx: Math.floor(Math.random() * 50) - 25,
vy: Math.floor(Math.random() * 50) - 25
});
}

// Draw the scene

function draw() {
ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.globalCompositeOperation = "lighter";

for (var i = 0, x = stars.length; i < x; i++) {
var s = stars[i];

ctx.fillStyle = "#0076B5";
ctx.beginPath();
ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
ctx.fill();
ctx.fillStyle = '#0076B5';
ctx.stroke();
}

ctx.beginPath();
for (var i = 0, x = stars.length; i < x; i++) {
var starI = stars[i];
ctx.moveTo(starI.x,starI.y); 
if(distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
for (var j = 0, x = stars.length; j < x; j++) {
  var starII = stars[j];
  if(distance(starI, starII) < 150) {
    //ctx.globalAlpha = (1 / 150 * distance(starI, starII).toFixed(1));
    ctx.lineTo(starII.x,starII.y); 
  }
}
}
ctx.lineWidth = 0.07;
ctx.strokeStyle = '#0076B5';
ctx.stroke();
}

function distance( point1, point2 ){
var xs = 0;
var ys = 0;

xs = point2.x - point1.x;
xs = xs * xs;

ys = point2.y - point1.y;
ys = ys * ys;

return Math.sqrt( xs + ys );
}

// Update star locations

function update() {
for (var i = 0, x = stars.length; i < x; i++) {
var s = stars[i];

s.x += s.vx / FPS;
s.y += s.vy / FPS;

if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
}
}

canvas.addEventListener('mousemove', function(e){
mouse.x = e.clientX;
mouse.y = e.clientY;
});

// Update and draw

function tick() {
draw();
update();
requestAnimationFrame(tick);
}

tick();


$(window).scroll(function(){console.log($(window).scrollTop());
    if($(window).scrollTop() > 200)
    {
        $('#pc').css('height','60px')
        $('.logo').css('width','80px')
    }else{
        $('#pc').css('height','100px')
        $('.logo').css('width','150px')
    }
});