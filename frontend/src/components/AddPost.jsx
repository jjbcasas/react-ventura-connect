import { useState } from "react"
import toast from 'react-hot-toast'

const AddPost = ({width='w-full', classNameOne='mx-auto', addPost, fileInputRef, divWidth = 'w-1/2'}) => {
    const [ title, setTitle] = useState('')
    const [ caption, setCaption] = useState('')
    const [ image, setImage] = useState(null)

    const handleSubmit = async(e) => {
        try {
            e.preventDefault()
    
            // if(!image){
            //     console.log('No file selected')
            //     return
            // }
            // const newPost = {
            //     title,
            //     caption,
            //     image
            // }

            const formData = new FormData(e.target)
            
            if(!formData.get('file')){
                console.log('No file selected')
                toast.error('Please select an image file.')
                return
            }
            
            // to log each property of newFormData
            // for( const [key, value] of newFormData.entries()){
            //     console.log(`${key}: `, value)
            // }
    
            addPost(formData)
            
            if( fileInputRef.current) {
                fileInputRef.current.value = ''
            }
           
            setTitle('')
            setCaption('')
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <>
        {/* // <div className="card bg-base-100 w-2/3 shadow-sm mb-4 mx-auto"> */}
            <h3 className={classNameOne}>Add a post</h3>
            <fieldset className={`fieldset ${width} bg-base-200 border border-base-300 p-4 rounded-box mx-auto`}>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="flex flex-wrap">
                        <div className={divWidth}>
                            <label htmlFor="title" className="fieldset-label">Title</label>
                            <input 
                                type="text" 
                                name="title" 
                                id="title" 
                                className="input"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className={divWidth}>
                            <label 
                                htmlFor="caption" className="fieldset-label">
                                Caption
                            </label>
                            <textarea 
                                name="caption" 
                                id="caption"  
                                className="input pt-2" 
                                required
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}/>

                        </div>
                        <div className={divWidth}>
                            <label 
                                htmlFor="imageUpload" className="fieldset-legend">
                                Image
                            </label>
                            <input 
                                type="file" 
                                name="file" 
                                id="imageUpload" className="file-input" 
                                // required
                                ref={ fileInputRef} />
                        </div>
                        <div className="w-1/3 pt-8 flex justify-end">
                            <button type="submit" className="btn btn-neutral">Post</button>
                        </div>
                    </div>
                </form>
            </fieldset>
        {/* // </div> */}
    </>
  )
}

export default AddPost
