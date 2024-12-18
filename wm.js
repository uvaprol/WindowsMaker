const wm_drag = document.getElementsByClassName('wm_drag')
const wm_res = document.getElementsByClassName('wm_res')
const wm_all = document.getElementsByClassName('wm_all')
const body = document.getElementsByTagName('body')[0]
const RB = 7
let active_div = undefined
let mX, mY

document.addEventListener('mouseup', function() {
    active_div = undefined
})
document.addEventListener('mousemove', function (event) {
    active_div.style.right = `${mX - event.clientX}px`
    active_div.style.bottom = `${mY - event.clientY}px`
})

function Focus(d){
    d.style.position = 'relative'
    d.addEventListener('mousedown', function(event){
        for (a of wm_drag){
            a.style.zIndex = 0
        }
        for (a of wm_all){
            a.style.zIndex = 0
        }
        for (a of wm_res){
            a.style.zIndex = 0
        }
        this.style.zIndex = 1
    })
}


function Drag(d){
    d.style.cursor = 'move'
    d.addEventListener('mousedown', function(event){
        mX = Number((getComputedStyle(this).right).slice(0, -2)) + event.clientX
        mY = Number((getComputedStyle(this).bottom).slice(0, -2)) + event.clientY
        active_div = this
    })
}

function Resize(d, mode){
    d.addEventListener('mousemove', function (event) {
        // this.innerText = `${event.clientX - this.getBoundingClientRect()['x']} | ${event.clientY - this.getBoundingClientRect()['y']}`
        const mXp = event.clientX - this.getBoundingClientRect()['x']
        const mYp = event.clientY - this.getBoundingClientRect()['y']
        const sX = Number((getComputedStyle(this).width).slice(0, -2))
        const sY = Number((getComputedStyle(this).height).slice(0, -2))
        const a = active_div
        active_div = undefined
        if (mXp < RB && mYp < RB){
            this.style.cursor = 'nw-resize'
        }
        else if (mXp < RB && sY - mYp < RB) {
            this.style.cursor = 'ne-resize'
        }
        else if (sX - mXp < RB && mYp < RB){
            this.style.cursor = 'sw-resize'
        }
        else if (sX - mXp < RB && sY - mYp < RB){
            this.style.cursor = 'se-resize'
        }
        else if (mXp < RB ||  sX - mXp < RB){
            this.style.cursor = 'w-resize'
        }
        else if (mYp < RB || sY - mYp < RB){
            this.style.cursor = 'n-resize'
        }
        else{
            active_div = a
            if (mode === 'res'){
                this.style.cursor = 'default'
            }
            else if (mode === 'all'){
                this.style.cursor = 'move'
            }
        }
    })
}

for (d of wm_drag){
    Focus(d)
    Drag(d)
}
for (d of wm_all){
    Focus(d)
    Drag(d)
    Resize(d, 'all')
}
for (d of wm_res){
    Focus(d)
    Resize(d, 'res')
}