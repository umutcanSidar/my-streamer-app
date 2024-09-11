const Form = ({ onChange, onSubmit }) => {
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input
          name="email"
          id="email"
          type="email"
          onChange={(e) => onChange(e)}
        />
        <input
          name="password"
          id="password"
          type="password"
          onChange={(e) => onChange(e)}
        />
        <input type="submit" value={"Gönder"} />
      </form>
    </div>
  );
};

export default Form;
