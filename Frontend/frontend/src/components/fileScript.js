const form = document.getElementById('uploadForm')

const sendFiles = async () => {
    // Object 
    const myFiles = document.getElementById('myFiles').files

    const formData = new FormData()

    Object.keys(myFiles).forEach(key => {
        formData.append(myFiles.item(key).name, myFiles.item(key))
    })

    const response = await fetch('http://localhost:3500/upload', {
        method: 'POST',
        body: formData
    })

    const json = await response.json()

    const h2 = document.querySelector('h2')
    h2.textContent = `Status: ${json?.status}`

    const h3 = document.querySelector('h3')
    h3.textContent = json?.message

    console.log(json)
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    sendFiles()
})
