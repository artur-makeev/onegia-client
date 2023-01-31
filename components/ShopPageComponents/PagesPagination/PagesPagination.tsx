import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ButtonPrimary from '../../../components/Buttons/ButtonPrimary';
import styles from './PagesPagination.module.css';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Context } from '../../../pages/_app';

export const PagesPagination = observer(() => {
	const { product } = useContext(Context);
	const pageCount = Math.ceil(product.totalCount / product.limit);
	const pages = [];

	for (let i = 0; i < pageCount; i++) {
		pages.push(i + 1);
	}

	const toPreviousPage = () => {
		if (product.page > 1) {
			product.setPage(product.page - 1);
		}
	};

	const toNextPage = () => {
		if (product.page !== pages.length) {
			product.setPage(product.page + 1);
		}
	};

	return (
		<div className={styles.container}>
			<ArrowBackIosIcon onClick={toPreviousPage} className={styles.arrowIcon} />
			{pages.map(page =>
				<div key={page} className={styles.paginationItemContainer}>
					<ButtonPrimary
						onClick={() => product.setPage(page)}
						name={page}
						size='small'
						className={product.page === page ? `${styles.paginationItem} ${styles.selected}` : styles.paginationItem}
					/>
				</div>
			)}
			<ArrowForwardIosIcon onClick={toNextPage} className={styles.arrowIcon} />
		</div>
	);
});