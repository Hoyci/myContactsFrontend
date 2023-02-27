import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactsForm';

import ContactsService from '../../service/ContactsService';

export default function NewContact() {
  const handleSubmit = async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      const response = await ContactsService.createContact(contact);
      console.log('handleSubmit => newContact', response);
    } catch {
      alert('Ocorreu um erro ao cadastrar usuário!');
    }
  };

  return (
    <>
      <PageHeader title="Novo contato" />
      <ContactForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
