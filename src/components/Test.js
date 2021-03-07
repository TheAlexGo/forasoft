const {useParams} = require("react-router-dom");
const Test = () => {
  let { id } = useParams();
  return(
    <div>
      <h3>ID: {id}</h3>
    </div>
  )
}

export default Test
