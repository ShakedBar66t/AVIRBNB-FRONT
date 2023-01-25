// Old way :
// function uploadImg(ev) {
//     const CLOUD_NAME = 'drld1bejg'
//     const UPLOAD_URL = `http://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

//     const formData = new FormData()
//     formData.append('file', ev.target.filed[0])
//     formData.append('upload_preset', 'hvxxl5tr')

//     return fetch(UPLOAD_URL, {
//         method: 'POST',
//         body: formData
//     })
//     .then(res => res.json())
//     .then(res => {
//         const elImg = document.createElement('img')
//         elImg.src = res.url
//         document.body.append(elImg)
//     })
//     .catch(err => console.lerror(err))
// }

export const uploadImg = async (input) => {
    if (input.files && input.files[0]) {
        const CLOUD_NAME = 'drld1bejg'
        const UPLOAD_PRESET = 'yn0j9nl2'
        const UPLOAD_URL = `http:/api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload/`
        const FORM_DATA = new FormData()

        //Building the request body
        FORM_DATA.append('file', input.files[0])
        FORM_DATA.append('upload_preset', UPLOAD_PRESET)
        //sending a post method request to cloudinary Api
        try {
            const res = await fetch(UPLOAD_URL, {
                method: 'POST',
                body: FORM_DATA
            })
            const { url } = await res.json()
            const elImg = document.createElement('img')
            elImg.src = url
            document.body.append(elImg)
        } catch (err) {
            console.error(err)
        }
    }
}
