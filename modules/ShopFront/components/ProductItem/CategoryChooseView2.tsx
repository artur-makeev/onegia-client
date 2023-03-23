import styles from './ProductItemMain/ProductItem.module.css';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Product } from '../../models/Product';
import type { AromaCategory } from '../../models/AromaCategory';
import type { Aroma } from '../../models/Aroma';
import { Button } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

type Props = {
	product: Product;
	aromaCategories: AromaCategory[];
	aromas: Aroma[];
	chooseAroma: (aroma: Aroma) => void;
	chooseAromaCategory: (arg: AromaCategory) => void;
	toView1: React.Dispatch<React.SetStateAction<void>>;
	toPreviousView: React.Dispatch<React.SetStateAction<void>>;
};

export const CategoryChooseView2 = ({
	product,
	aromaCategories,
	chooseAroma,
	aromas,
	chooseAromaCategory,
	toView1,
	toPreviousView,
}: Props): JSX.Element => {
	const aromaNames = aromas.map((aroma) => aroma.name);
	const [searchedAroma, setSearchedAroma] = useState<string | null>('');

	useEffect(() => {
		const selectedAroma = aromas.find((aroma) => aroma.name === searchedAroma);
		if (selectedAroma) {
			chooseAroma(selectedAroma);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchedAroma]);

	return (
		<>
			<div className={styles.productHeader}>
				<ArrowBackIcon
					className={styles.backIcon}
					onClick={() => toPreviousView()}
				/>
				<h3>{product.name}</h3>
				<CloseIcon className={styles.closeIcon} onClick={() => toView1()} />
			</div>
			<Autocomplete
				className={styles.aromaSearch}
				value={searchedAroma}
				onChange={(event: React.FormEvent, newValue: string | null) => {
					setSearchedAroma(newValue);
				}}
				disablePortal
				id='aroma'
				options={aromaNames}
				renderInput={(params) => <TextField {...params} label='Ароматы' />}
			/>
			<h3>Категории ароматов</h3>
			<div className={styles.aromaList}>
				{aromaCategories.map((aromaCategory: AromaCategory) => (
					<Button
						className={styles.categoryButton}
						key={aromaCategory.id}
						variant='outlined'
						color='secondary'
						onClick={() => chooseAromaCategory(aromaCategory)}
					>
						{aromaCategory.name}
					</Button>
				))}
			</div>
		</>
	);
};
