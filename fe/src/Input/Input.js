const Input = (props) => {
  const { name, label } = props;

  return (
    <div>
      <label for={name}>{label}</label>
      <input name={name}></input>
    </div>
  )
}

export default Input;