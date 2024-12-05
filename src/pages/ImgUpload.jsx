import React, { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'

const storage = getStorage()
const ImgUpload = () => {
  const [file, setFile] = useState()

  const handelFileUpload = (file) => {
    if (!file) {
      console.log('no file selected')
      return
    }

    // --- insert firebase storage code to return the url
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    console.log('File type:', selectedFile.type)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(file)
    handelFileUpload(file)
  }
  return (
    <div>
      <h4>image upload...</h4>
      <form onSubmit={handleSubmit} className="form temp-form">
        <input onChange={handleFileChange} type="file" />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

export default ImgUpload
