import {
  Container, Header, ListContainer, Card,
} from './styles';
import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function ContactsList() {
  return (
    <Container>
      <Header>
        <strong>3 contatos</strong>
        <a href="/">Novo contato</a>
      </Header>
      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow" />
          </button>
        </header>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Ruan Pablo</strong>
              <small>instagram</small>
            </div>
            <span>ruan@email.com</span>
            <span>(21) 99999-9999</span>
          </div>

          <div className="actions">
            <a href="/">
              <img src={edit} alt="edit" />
            </a>
            <button type="button">
              <img src={trash} alt="delete" />
            </button>
          </div>
        </Card>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Ruan Pablo</strong>
              <small>instagram</small>
            </div>
            <span>ruan@email.com</span>
            <span>(21) 99999-9999</span>
          </div>

          <div className="actions">
            <a href="/">
              <img src={edit} alt="edit" />
            </a>
            <button type="button">
              <img src={trash} alt="delete" />
            </button>
          </div>
        </Card>

        <Card>
          <div className="info">
            <div className="contact-name">
              <strong>Ruan Pablo</strong>
              <small>instagram</small>
            </div>
            <span>ruan@email.com</span>
            <span>(21) 99999-9999</span>
          </div>

          <div className="actions">
            <a href="/">
              <img src={edit} alt="edit" />
            </a>
            <button type="button">
              <img src={trash} alt="delete" />
            </button>
          </div>
        </Card>
      </ListContainer>
    </Container>
  );
}
