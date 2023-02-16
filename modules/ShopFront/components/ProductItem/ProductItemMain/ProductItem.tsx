
import { fetchAromaCategories, fetchAromaInfos, fetchAromas } from '../../../api/aromaApi';
import { useState } from 'react';
import { CategoryChooseView2 } from '../CategoryChooseView2';
import { ProductView1 } from '../ProductView1';
import { Aroma, AromaCategory, AromaDescription, Product, ProductCategory } from '../../../../../models/Models';
import { AromaChooseView3 } from '../AromaChooseView3';
import { AromaInfoView4 } from '../AromaInfoView4';
import { QuantityChooseView5 } from '../QuandtityChooseView5';
import Paper from '@mui/material/Paper';
import styles from './ProductItem.module.css';

type Props = {
	product: Product
};

const ProductItem = ({ product }: Props) => {
	const [aromaCategories, setAromaCategories] = useState([]);
	const [selectedAromaCategory, setSelectedAromaCategory] = useState<ProductCategory>({ id: 0, name: '' });
	const [aromas, setAromas] = useState<Aroma[]>([]);
	const [selectedAroma, setSelectedAroma] = useState<Aroma>({ id: 0, name: '' });
	const [aromaDescription, setAromaDescription] = useState<AromaDescription>({ top: '', heart: '', base: '' });

	const [view, setView] = useState<number>(1);
	const toView1: React.Dispatch<React.SetStateAction<void>> = () => setView(1);
	const toNextView: React.Dispatch<React.SetStateAction<void>> = () => setView(view + 1);
	const toPreviousView: React.Dispatch<React.SetStateAction<void>> = () => {
		if (view === 3 && aromaCategories.length < 2) {
			setView(view - 2);
		} else {
			setView(view - 1);
		}
	};

	const productVariations = async () => {
		toNextView();
		const data = await fetchAromaCategories(product.categoryId);
		setAromaCategories(data);
		if (data.length < 2) {
			setSelectedAromaCategory(data[0]);
			setView(3);
			const aromas = await fetchAromas(data[0].id);
			setAromas(aromas);
		}
	};

	const chooseAromaCategory = async (aromaCategory: AromaCategory) => {
		setSelectedAromaCategory(aromaCategory);
		toNextView();
		const data = await fetchAromas(aromaCategory.id);
		setAromas(data);
	};

	const chooseAroma = async (aroma: Aroma) => {
		setSelectedAroma(aroma);
		toNextView();
		getAromaDescription(aroma.id);
	};

	const getAromaDescription = async (aromaId: number) => {
		const aromaInfo = await fetchAromaInfos(aromaId);
		setAromaDescription(aromaInfo);
	};

	return (
		<Paper className={styles.productWrapper}>
			<li>
				{view === 1 &&
					<ProductView1
						product={product}
						productVariations={productVariations}
					/>}

				{view === 2 &&
					<CategoryChooseView2
						product={product}
						aromaCategories={aromaCategories}
						chooseAromaCategory={chooseAromaCategory}
						toView1={() => toView1()}
						toPreviousView={() => toPreviousView()}
					/>}

				{view === 3 &&
					<AromaChooseView3
						product={product}
						selectedAromaCategory={selectedAromaCategory}
						aromas={aromas}
						chooseAroma={chooseAroma}
						toView1={() => toView1()}
						toPreviousView={() => toPreviousView()}
					/>}

				{view === 4 &&
					<AromaInfoView4
						product={product}
						selectedAroma={selectedAroma}
						aromaDescription={aromaDescription}
						toView1={() => toView1()}
						toPreviousView={() => toPreviousView()}
						toNextView={() => toNextView()}
					/>}

				{view === 5 &&
					<QuantityChooseView5
						product={product}
						selectedAroma={selectedAroma}
						toView1={() => toView1()}
						toPreviousView={() => toPreviousView()}
					/>}
			</li>
		</Paper>
	);
};


export default ProductItem;