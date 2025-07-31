const Upload = ({title}) => {
  return (
    <div>
        <details>
            <summary className="text-center">{title}</summary>
            <form /*action="/profile/changeProfilePhoto?_method=PUT"*/ encType="multipart/form-data" method="POST" className="bg-base-100 rounded-t-none p-2">
                <div>
                    <input type="file" name="file" className="file-input" />
                </div>
                <div>
                    <button type="submit" className="btn btn-neutral mt-4">Upload</button>
                </div>
            </form>
        </details>
    </div>
  )
}

export default Upload
