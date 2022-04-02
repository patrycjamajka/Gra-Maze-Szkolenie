// ZMIENNA
let zmienna = 1;
// STAŁA
const stala = 1;
// console.log("zmienna: "+zmienna)

// OBIEKT
const person = {
  name: "John",
  surname: "Doe",
  age : 31, 
  talk : function () {
    console.log("CZEŚĆ!");
  }

}

// person.talk()

// console.log(person)
// console.log(console)

// TABLICA (ARRAY)
const tablica = [
  "jeden",
  "dwa",
  "trzy"
];
// console.log(tablica[3])

// FUNKCJA
// function increment(x) {
//   x++
//   return x
// }

// FUNCKJA STRZAŁKOWA
const increment = x => {
  x++
  return x
}

// console.log(increment(1))




// DOM (DOCUMENT OBJECT MODEL)
// console.log(document)
const gamePlane = document.createElement("div");
// gamePlane.innerText = "GAMEPLANE";
// console.log(gamePlane.style)
// gamePlane.style.border = "2px dashed red";
gamePlane.style.cssText =
`background-image: url(img/tlo.jpg);
height:100vh;
width:100vw;
position:relative;`
document.body.append(gamePlane);

// TWORZENIE ŚCIANY (DO CHODZENIA)
function makeWall([w, h, x, y, typ = "wall"]){
  const wall = document.createElement("div");
  wall.style.cssText = `
    display:flex;
    justify-content:center;
    align-items:center;
    position:absolute;
    background-color: #C3EDFF;
    width: ${w}vw;
    height: ${h}vh;
    left:${x}vw;
    top:${y}vh;
  `;
  wall.className = typ;
  if( typ != "wall" ){
    wall.innerText = typ.toUpperCase();
  }
  gamePlane.append(wall);
}

const mapa = [
  [20, 50, 0, 25, 'start'],
  [30, 30, 20, 35],
  [30, 10, 50, 45],
  [20, 50, 80, 25, 'meta'],
]

for(const wall of mapa){
  makeWall(wall)
}




const startButton = document.querySelector(".start");
const metaButton = document.querySelector(".meta");
const allWalls = document.querySelectorAll(".meta, .start, .wall");
// WALLE
for(const singleWall of allWalls){
  singleWall.addEventListener("mousemove", e => {
    e.stopPropagation();
    // blokuje dostęp do event listenera z dokumentu
    // - nie przegrywa gry na niebieskich polach
  })
}




const game = {
  start(){
    console.log("GAME STARTED.")
    startButton.removeEventListener("click", game.start)
    metaButton.addEventListener("mouseover", game.over)
    document.addEventListener("mousemove",game.wallListening)
  },
  wallListening(e){
    game.over(false)
  },
  over(result){
    if( result ){
      guide.show("Wygrałeś!", "Ale możesz zagrać jeszcze raz!", true)
    }else{
      guide.show("Przegrałeś!", "Spróbuj jeszcze raz", true);
      const img = document.createElement("div");
      img.style.cssText = `
        position:absolute;
        top:0;
        height:100%; 
        width:100%;
        background-size:cover;
        background-position:center;
        background-image:url(https://wjactv.com/resources/media/d60d4f1c-9fcc-4ae4-8058-05e885080e19-large3x4_momo2.PNG?1551379953646)
      `
      document.body.append(img)
      setTimeout(()=>{ img.remove() },1500)
    }
    document.removeEventListener("mousemove",game.wallListening)
    startButton.addEventListener("click", game.start)
    metaButton.removeEventListener("mouseover", game.over)
  }
}
startButton.addEventListener("click", game.start)


const guide = {
  init(){
    this.dom = document.createElement("div");
    this.dom.className = "guide"
    this.wrapper = document.createElement("div");
    this.wrapper.style.cssText = `
      background-color:#780116;
      text-align:center;
      color:#fff;
      padding:30px;
      border-radius:20px;
      box-shadow: 0 0 20px #000;
    `
    this.title = document.createElement("h1");
    this.message = document.createElement("p")
    this.button = document.createElement("button")
    this.button.innerText = "OK"
    this.button.addEventListener("click", () => {
      this.close()
    })
    this.wrapper.append(this.title);
    this.wrapper.append(this.message);
    this.wrapper.append(this.button);

    this.dom.append(this.wrapper);
    document.body.append(this.dom);
  },
  close(){
    this.dom.style.display = "none"
  },
  show(title, message, showLink = false){
    this.title.innerText = title;
    this.message.innerText = message;
    this.dom.style.display = "flex";
    if(showLink){
        const a = document.createElement("a");
        
      a.href ="http://google.com";
      a.innerText = "Wróć do Google"
      this.wrapper.append(a);
    }

  }
}
guide.init();
guide.show(
  "Witaj w grze!",
  `Twoim zadaniem jest kliknąć na start 
  i dotrzeć kursorem po niebieskich polach do mety. `
);