const Button = (props) => {
  const { modifier, children, onClick } = props;

  return (
    <button onClick={onClick} className={`${Button} ${Button}_${modifier}`}>
      {children}
    </button>
  );
}

export default Button;
