class one{
    list = [];
    constructor(){
        //assigning variables
        this.inputElement = document.querySelector("input")
        this.listElement = document.getElementById("list")
        this.itemCount = document.getElementById("itemCount")
        this.image = document.getElementById("weatherImage")
        
        this.initializeToDo()
        this.render()
    }

    addToDo(toDo){
        toDo = toDo.trim()
        if(!toDo){
            return 
        }
        this.inputElement.value = ""

        //creating new elements
        let newListItem = document.createElement("li")
        let newListLabel = document.createElement("label")
        let newListInput = document.createElement("input")
        let newListSpan = document.createElement("span")
        let newListButton = document.createElement("button")
        let itemState = {
            listItem: newListItem,
            completed: false,
            id: Date.now()
        }

        //creating attributes for input tag
        newListInput.type = "checkbox"
        newListInput.id = itemState.id
        newListLabel.htmlFor = itemState.id
        newListLabel.classList.add("checkbox")

        //adding to html
        newListSpan.innerHTML = toDo
        newListButton.innerHTML = "X"

        //appending elements
        newListItem.appendChild(newListInput)
        newListLabel.appendChild(newListSpan)
        newListItem.appendChild(newListLabel)
        newListItem.appendChild(newListButton)

        //adding event listener
        newListButton.addEventListener("click", (e)=>{
            this.list = this.list.filter((item)=>{
                if(item.id === itemState.id){
                    return false
                }else {
                    return true
                }
            })
            this.render(this.list)
        })
        
        newListInput.addEventListener("change", (e)=>{
            this.list = this.list.map((item)=>{
                if(item.id === itemState.id){
                    if(e.target.checked){
                        newListLabel.classList.add("active")
                    }else {
                        newListLabel.classList.remove("active")
                    }
                    return {
                        ...item, 
                        completed: e.target.checked? true : false
                    }
                }else { 
                    return item
                }
            })
            this.render(this.list)
        })

        this.list.unshift(itemState)
        return this.render(this.list)
    }

    filterToDo(filter){
        switch (filter) {
            case "active": return this.list.filter((item)=>!item.completed)
            case "completed": return this.list.filter((item)=>item.completed)
            default: return this.list
        }
    }

    initializeToDo(){
        document.getElementById("all").addEventListener("click", ()=> this.render(this.filterToDo()))
        document.getElementById("completed").addEventListener("click", ()=> this.render(this.filterToDo("completed"), "completed"))
        document.getElementById("active").addEventListener("click", ()=> this.render(this.filterToDo("active"), "active"))
        document.getElementById("clear").addEventListener("click", ()=> {
            this.list = this.filterToDo("active")
            this.render(this.list)
            alert("Good job, you've cleared your completed tasks 💃")
        })
        document.getElementById("weather").addEventListener("click", ()=>{
            let isNight = document.body.classList.toggle("night")
            this.image.src = isNight? "./images/icon-sun.svg": "./images/icon-moon.svg"
        })


        this.inputElement.addEventListener("change", (e)=>{
            const inputText = e.target.value
            this.addToDo(inputText)
        })
    }

    render(list, view){
        let activeCount = this.filterToDo("active").length
        this.itemCount.style.display = "inline-block"
        if(activeCount === 1){
            this.itemCount.innerHTML = activeCount + " item left"
        } else if(activeCount > 1){
            this.itemCount.innerHTML = activeCount + " items left"
        } else{
            this.itemCount.style.display = "none"
        }

        if(!list || list.length < 1){
            this.listElement.innerHTML = `<i class="jsSpan">${view === "completed"?
             "You're yet to complete a task!": view === "active"?
             "Add an item to your todo list!": "Make a Todo List!"
             }</i>`

            return
        }
        this.listElement.innerHTML = ""
        for (let item of  list){
            this.listElement.appendChild(item.listItem)
        }
        
    }
}
window.addEventListener("DOMContentLoaded", ()=>{
    new one()
})

