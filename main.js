let mouseDown=false
let retracting=false
let play=true

let changeAtan2StartX,changeAtan2StartY

let rotationDegree=0
let oldDeg=0
let index=0
let chosenNumber=99

const input=document.getElementsByClassName("input")

const chars={
    capsOn:false,
    lastNumber: 99,
    characterIndex: 0,
    1:[" ","1"],
    2:["a","b","c","2"],
    3:["d","e","f","3"],
    4:["g","h","i","4"],
    5:["j","k","l","5"],
    6:["m","n","o","6"],
    7:["p","r","s","q","7"],
    8:["t","u","v","8"],
    9:["w","x","y","z","9"],
    0:["@",".","-","_","0"],
    displayCharacter(){
        if(chosenNumber==this.lastNumber && this[chosenNumber].length>=this.characterIndex+2){
            input[index].value=input[index].value.substring(0,input[index].value.length-1) 
            this.characterIndex++
        }else{
            this.characterIndex=0
        }
        this.lastNumber=chosenNumber
        if(this.capsOn){
            input[index].value+=this[chosenNumber][this.characterIndex].toUpperCase()
        }else{
            input[index].value+=this[chosenNumber][this.characterIndex]
        }
    },
    capsChange(){
        if(this.capsOn){
            caps.style.backgroundColor=""
            caps.style.color=""
            caps.style.textShadow=""
            caps.innerHTML="Caps OFF"
            this.capsOn=false
        }else {
            caps.style.backgroundColor="hsl(205, 86%, 45%)"
            caps.style.color="hsl(150, 100%, 60%)"
            caps.style.textShadow="0 0 10px yellow"
            caps.innerHTML="Caps ON"
            this.capsOn=true
        }
    },
}

rotating.addEventListener("mousedown",(e)=>{
    if(e.button==0 && !retracting){
        changeAtan2StartX=rotating.getBoundingClientRect().x+rotating.getBoundingClientRect().width/2
        changeAtan2StartY=rotating.getBoundingClientRect().y+rotating.getBoundingClientRect().width/2
        
        let angle=(Math.atan2(e.pageY-changeAtan2StartY,e.pageX-changeAtan2StartX)*180/Math.PI+180).toFixed(0) //int deg
        switch(true){
            case angle>236 && angle<263: chosenNumber=10; break
            case (angle>268 && angle<292): chosenNumber=9; break
            case (angle>299 && angle<322): chosenNumber=8; break
            case (angle>329 && angle<351): chosenNumber=7; break
            case (angle>0 && angle<23): chosenNumber=6; break
            case (angle>29 && angle<54): chosenNumber=5; break
            case (angle>58 && angle<82): chosenNumber=4; break
            case (angle>87 && angle<112): chosenNumber=3; break
            case (angle>117 && angle<142): chosenNumber=2; break
            case (angle>147 && angle<172): chosenNumber=1; break
            default: chosenNumber=99;break
        }
        mouseDown=true
        startRotating()
}
})
document.addEventListener("mouseup",(e)=>{
    if(e.button==0){
        clearRotation()
        mouseDown=false
    }
})
document.addEventListener("mousemove",(e)=>{
    if(mouseDown && chosenNumber<99){
        let newDeg=(Math.atan2(e.pageY-changeAtan2StartY,e.pageX-changeAtan2StartX)*180/Math.PI+180).toFixed(0)
        if(oldDeg<newDeg){
            rotationDegree+=3
            oneClick()
        }else if(oldDeg>newDeg && rotationDegree>0) {
            rotationDegree-=3
            goBackSound()
        }
        oldDeg=newDeg
    }
})
function clearRotation(){
    setTimeout(()=>{
        if(rotationDegree>0){
            retracting=true
            rotationDegree-=2
            bigCircle.style.transform=`rotateZ(${rotationDegree}deg)`  
            goBackSound()
            clearRotation()
        } else {
            retracting=false
            rotationDegree=0
            bigCircle.style.transform=`rotateZ(0deg)`  
        }
    },1000/30)
}
function startRotating(){
    setTimeout(()=>{
        if(mouseDown){
                if(rotationDegree>28+30*chosenNumber){
                    document.dispatchEvent(
                        new MouseEvent("mouseup",{
                        button: 0
                    }))
                    if(chosenNumber==10) chosenNumber=0
                    if(input[index].type=="tel" || input[index].type=="number"){
                        input[index].value+=chosenNumber
                    } else{
                        chars.displayCharacter()
                    }
                }
            bigCircle.style.transform=`rotateZ(${rotationDegree}deg)`  
            startRotating()
        }
    },1000/30)
}
function clearInput(){
    input[index].value=""
    chars.lastNumber=99
}
const audioContext = new (window.AudioContext || window.webkitAudioContext)()

function buttonClickSound(){
    const oscillator = audioContext.createOscillator()
    
    oscillator.type="sawtooth"
    oscillator.frequency.setValueAtTime(450,audioContext.currentTime)
    const gainNode = audioContext.createGain()
    
    gainNode.gain.setValueAtTime(.02, audioContext.currentTime)
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    oscillator.start(audioContext.currentTime)
    
    oscillator.stop(audioContext.currentTime+.1)
    
}
function oneClick(){
    if(play){
        const oscillator = audioContext.createOscillator()
    
        oscillator.type="sawtooth"
        oscillator.frequency.setValueAtTime(45,audioContext.currentTime)
        const gainNode = audioContext.createGain()
        
        gainNode.gain.setValueAtTime(5, audioContext.currentTime)
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        oscillator.start(audioContext.currentTime)
        
        oscillator.stop(audioContext.currentTime+.01)
        play=false
        setTimeout(()=>play=true,450)
    }
}
function goBackSound(){
    const oscillator = audioContext.createOscillator()
    oscillator.type="sawtooth"
    oscillator.frequency.setValueAtTime(10,audioContext.currentTime)

    const gainNode = audioContext.createGain();
    
    gainNode.gain.setValueAtTime(.1, audioContext.currentTime);  

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start()
    oscillator.stop(audioContext.currentTime+.02)
}