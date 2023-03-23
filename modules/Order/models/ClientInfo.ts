export type Contact = 'call' | 'whatsup' | 'telegram' | 'email' | '';

export interface ClientInfo {
	lastName: string;
	firstName: string;
	fatherName: string;
	email: string;
	phone: string;
	address: string;
	contact: Contact;
}
