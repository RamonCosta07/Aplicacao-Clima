import { SlMagnifier } from "react-icons/sl";

interface IForm {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  search: string;
  handleSearch: React.ChangeEventHandler<HTMLInputElement>;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}

const Form = ({ handleSubmit, search, handleSearch, handleKeyDown }: IForm) => {
  return (
    <form onSubmit={handleSubmit}>
      <h3>Pesquisar o clima de uma cidade</h3>
      <div className="form-input-container">
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
          placeholder="Digite a cidade"
        />
        <div className="btnInput">
          <button type="submit" className="btn">
            <SlMagnifier />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
