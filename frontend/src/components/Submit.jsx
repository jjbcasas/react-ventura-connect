const Submit = ({ value, type }) => {
  return (
    <div>
        {/* <input type="submit" value="Log In" class="btn btn-neutral mt-4" /> */}
        <button type={type} className="btn btn-neutral mt-4">{value}</button>
    </div>
  )
}

export default Submit
