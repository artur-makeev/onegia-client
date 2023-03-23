import styles from './AddressForm.module.css';
import type { MutableRefObject } from 'react';
import { useEffect, useRef } from 'react';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { YandexMap } from '../YandexMap/YandexMap';
import { Cdek } from '../Cdek/Cdek';
import { useOrderStore } from '../../store/OrderStore';
import type { Contact } from '../../models/Contact';
import type { BranchOption } from '../../models/Branch';
import type { Branch } from '../../models/Branch';
import type { Coords } from '../../models/Coords';

type Props = {
	setFormValid: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddressForm = ({ setFormValid }: Props): JSX.Element => {
	const shippingType = useOrderStore((state) => state.shippingType);
	const setClientInfo = useOrderStore((state) => state.setClientInfo);

	const [lastName, setLastName] = useState('');
	const [firstName, setFirstName] = useState('');
	const [fatherName, setFatherName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');

	const [contact, setContact] = useState<Contact>('whatsup');

	const [emailDirty, setEmailDirty] = useState(false);
	const [emailIncorrect, setEmailIncorrect] = useState(false);
	const [emailError, setEmailError] = useState('');

	const [cdekApiError, setCdekApiError] = useState(false);

	const addresses = useRef([]) as MutableRefObject<Branch[]>;
	const [selectedBranch, setSelectedBranch] = useState<BranchOption | null>(
		null
	);

	const [cityCenter, setCityCenter] = useState<Coords>({
		latitude: 61.789263,
		longitude: 34.372298,
	});
	const [showMap, setShowMap] = useState<boolean>(false);

	const emailHandler = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		setEmail(e.target.value);

		const re = /^\S+@\S+\.\S+$/;

		if (!re.test(String(e.target.value).toLowerCase())) {
			setEmailError('Некорректный email');
			setEmailIncorrect(true);
		} else {
			setEmailError('');
			setEmailIncorrect(false);
		}
	};

	// form validation
	useEffect(() => {
		if (
			(lastName &&
				firstName &&
				fatherName &&
				email &&
				phone &&
				selectedBranch) ||
			shippingType === 'pickup' ||
			(shippingType === 'yandex' && emailError === '' && contact)
		) {
			setFormValid(true);
		} else {
			setFormValid(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		lastName,
		firstName,
		fatherName,
		email,
		phone,
		selectedBranch,
		contact,
		shippingType,
	]);

	const updateAddressData = () => {
		setClientInfo({
			lastName: lastName,
			firstName: firstName,
			fatherName: fatherName,
			email: email,
			phone: phone,
			address: !cdekApiError ? (selectedBranch as string) : address,
			contact: contact,
		});
	};

	useEffect(() => {
		updateAddressData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lastName, firstName, fatherName, email, phone, selectedBranch, contact]);

	return (
		<Box
			className={styles.container}
			component='form'
			sx={{
				'& > :not(style)': { m: 1 },
			}}
			noValidate
			autoComplete='off'
		>
			<TextField
				required
				label='Фамилия'
				value={lastName}
				onChange={(e) => setLastName(e.target.value)}
				variant='outlined'
			/>
			<TextField
				required
				label='Имя'
				value={firstName}
				onChange={(e) => setFirstName(e.target.value)}
				variant='outlined'
			/>
			<TextField
				required
				label='Отчество'
				value={fatherName}
				onChange={(e) => setFatherName(e.target.value)}
				variant='outlined'
			/>
			<TextField
				required
				label='Телефон'
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				variant='outlined'
			/>
			<TextField
				required
				label='Email'
				variant='outlined'
				value={email}
				onChange={(e) => {
					emailHandler(e);
				}}
				onBlur={() => setEmailDirty(true)}
				error={emailDirty && emailIncorrect}
			/>
			<TextField
				required
				label='Как с вами связаться'
				variant='outlined'
				value={contact}
				onChange={(e) => setContact(e.target.value as Contact)}
				select
			>
				<MenuItem className={styles.contactItem} value={'call'}>
					Позвонить
				</MenuItem>
				<MenuItem className={styles.contactItem} value={'whatsup'}>
					Whatsup
				</MenuItem>
				<MenuItem className={styles.contactItem} value={'telegram'}>
					Telegram
				</MenuItem>
				<MenuItem className={styles.contactItem} value={'email'}>
					Email
				</MenuItem>
			</TextField>
			{!cdekApiError ? (
				<Cdek
					setCdekApiError={setCdekApiError}
					setCityCenter={setCityCenter}
					setShowMap={setShowMap}
					addresses={addresses}
					selectedBranch={selectedBranch}
					setSelectedBranch={setSelectedBranch}
				/>
			) : (
				<TextField
					required
					multiline
					rows={2}
					label='Адрес доставки'
					variant='outlined'
					value={address}
					inputProps={{ maxLength: 255 }}
					onChange={(e) => setAddress(e.target.value)}
				/>
			)}
			{showMap && (
				<div className={styles.map}>
					<YandexMap
						centerLongitude={cityCenter.longitude}
						ceterLatityde={cityCenter.latitude}
						addresses={addresses.current}
						setSelectedBranch={setSelectedBranch}
					/>
				</div>
			)}
		</Box>
	);
};
