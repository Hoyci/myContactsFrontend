/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './styles';

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import formatPhone from '../../utils/formatPhone';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import ContactsService from '../../service/ContactsService';
import Modal from '../../components/Modal';

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);

  const filteredContacats = useMemo(
    () => contacts.filter(
      (contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    [contacts, searchTerm],
  );

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);
      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const handleToggleOrderBy = () => {
    setOrderBy((oldOrder) => (oldOrder === 'asc' ? 'desc' : 'asc'));
  };

  const handleChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTryAgain = () => {
    loadContacts();
  };

  const handleCloseModalVisible = () => {
    setIsDeleteModalVisible(false);
  };

  const handleDeleteContact = (contact) => {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDeleteContact = () => {
    console.log(contactBeingDeleted.id);
  };

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Tem certeza que você deseja remover o contato "${contactBeingDeleted?.name}"?`}
        confirmLabel="Deletar"
        onCancel={handleCloseModalVisible}
        onConfirm={handleConfirmDeleteContact}
      >
        <p>Está ação não poderá ser desfeita</p>
      </Modal>

      {(!hasError && contacts.length > 0) && (
        <InputSearchContainer>
          <input
            type="text"
            placeholder="Pesquise pelo nome"
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}
      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : (
              contacts.length > 0
                ? 'space-between'
                : 'center'
            )
        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacats.length}
            {filteredContacats.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt="Sad" />

          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>Tentar novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(contacts.length < 1 && !isLoading) && (
            <EmptyListContainer>
              <img src={emptyBox} alt="Empty box" />
              <p>
                Você ainda não tem nenhum contato cadastrado!
                Clique no botão <strong>&rdquo;Novo contato&rdquo;</strong> à cima para
                cadastrar o seu primeiro!
              </p>
            </EmptyListContainer>
          )}

          {contacts.length > 0 && filteredContacats.length < 1 && (
            <SearchNotFoundContainer>
              <img src={magnifierQuestion} alt="Magnifier question" />
              <span>Nenhum resultado foi encontrado para
                <strong> {searchTerm}</strong>
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacats.length > 0 && (
            <ListHeader orderBy={orderBy}>
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="Arrow" />
              </button>
            </ListHeader>
          )}

          {filteredContacats.map((contact) => (
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category_name && <small>{contact.category_name}</small>}
                </div>
                <span>{contact.email}</span>
                <span>{formatPhone(contact.phone)}</span>
              </div>

              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="edit" />
                </Link>
                <button type="button" onClick={() => handleDeleteContact(contact)}>
                  <img src={trash} alt="delete" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
}
