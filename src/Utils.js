export let timeStampToDate = (timeStamp) => {
    let date = new Date(timeStamp)

    let outputDate = date.getHours() + ":" + date.getMinutes() + " , "+date.getDate()+"/"
        +(date.getMonth()+1)+"/"+date.getFullYear()

    return outputDate


}

export let timeStampString = (timeStamp) => {
    let date = new Date(timeStamp)

    let year = date.getFullYear().toString().padStart(4,"0")
    let month = (date.getMonth()+1).toString().padStart(2,"0")
    let day = date.getDate().toString().padStart(2,"0")
    let hours = date.getHours().toString().padStart(2,"0")
    let minutes = date.getMinutes().toString().padStart(2,"0")
    let second = date.getSeconds().toString().padStart(2,"0")
    let millisecond = date.getMilliseconds().toString().padStart(3,"0")

    let outputString = year+"-"+month+"-"+day+"T"+hours+":"+minutes+":"+second+"."+millisecond
    return outputString
}