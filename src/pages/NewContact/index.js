import { useRef } from 'react';
import PageHeader from '../../components/PageHeader';
import ContactForm from '../../components/ContactsForm';

import ContactsService from '../../service/ContactsService';

import toast from '../../utils/toast';

export default function NewContact() {
  const contactFormRef = useRef(null);
  const handleSubmit = async (formData) => {
    try {
      const contact = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category_id: formData.categoryId,
      };

      await ContactsService.createContact(contact);

      contactFormRef.current.resetFields();

      toast({ type: 'success', text: 'Contato cadastrado com sucesso', duration: 3000 });
    } catch {
      toast({ type: 'danger', text: 'Ocorreu um erro ao cadastrar usuário!' });
    }
  };

  return (
    <>
      <PageHeader title="Novo contato" />
      <ContactForm
        ref={contactFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
