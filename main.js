let mouseDown=false
let retracting=false
let play=true

let changeAtan2StartX,changeAtan2StartY

let i=1
let oldDeg=0
let index=0
let chosenNumber=99

const input=document.getElementsByClassName("input")

function eo(){
    console.log(chosenNumber)
}

dial.addEventListener("mousedown",(e)=>{
    if(e.button==0 && !retracting){
        changeAtan2StartX=dial.getBoundingClientRect().x+dial.getBoundingClientRect().width/2
        changeAtan2StartY=dial.getBoundingClientRect().y+dial.getBoundingClientRect().width/2
        
        let angle=(Math.atan2(e.pageY-changeAtan2StartY,e.pageX-changeAtan2StartX)*180/Math.PI+180).toFixed(0) //int deg
        
        if(angle>236 && angle<263)      chosenNumber=10
        else if(angle>268 && angle<292) chosenNumber=9
        else if(angle>299 && angle<322) chosenNumber=8
        else if(angle>329 && angle<351) chosenNumber=7
        else if(angle>0 && angle<23)    chosenNumber=6
        else if(angle>29 && angle<54)   chosenNumber=5
        else if(angle>58 && angle<82)   chosenNumber=4
        else if(angle>87 && angle<112)  chosenNumber=3
        else if(angle>117 && angle<142) chosenNumber=2
        else if(angle>147 && angle<172) chosenNumber=1
        else                            chosenNumber=99

        // [
        //     {
        //         min: 236,
        //         max: 263,
        //         choosen: 10
        //     }
        // ]

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
            i+=3
            oneClick()
        }else if(oldDeg>newDeg && i>1) {
            i-=3
            goBackSound()
        }
        oldDeg=newDeg
    }
})
function clearRotation(){
    setTimeout(()=>{
        if(i>1){
            retracting=true
            i-=2
            three.style.transform=`rotateZ(${i}deg)`  
            goBackSound()
            clearRotation()
        } else retracting=false
    },1000/30)
}
function startRotating(){
    setTimeout(()=>{
        if(mouseDown){
                if(i>28+30*chosenNumber){
                    document.dispatchEvent(
                        new MouseEvent("mouseup",{
                        button: 0
                    }))
                    if(chosenNumber==10) chosenNumber=0
                    input[index].value+=chosenNumber
                }
            three.style.transform=`rotateZ(${i}deg)`  
            startRotating()
        }
    },1000/30)
}
const audioContext = new (window.AudioContext || window.webkitAudioContext)()

function clearInput(){
    input[index].value=""
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
