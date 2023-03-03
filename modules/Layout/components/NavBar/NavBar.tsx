import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import LogoIcon from '../../../../public/images/logo.svg';
import { BASKET_ROUTE, CONTACTS_ROUTE, SHOP_ROUTE, VK_LINK } from '../../../../utilities/consts';
import styles from './NavBar.module.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { Vkontakte } from '../../../../UI';
import { useBasketProductsQuantity } from '../../../Basket/store/BasketComputedValues';
import { useHasHydrated } from '../../hooks/useHasHydrated';
import { useSliderStore } from '../../../Slider/store/SlideStore';

export const NavBar = () => {
	const hasHydrated = useHasHydrated();
	const setSlideIndex = useSliderStore(state => state.setSlideIndex);
	const [productsQuantity] = useBasketProductsQuantity();

	const handleTab = (e: React.KeyboardEvent) => {
		if (e.key === 'Tab') {
			setSlideIndex(0);
		}
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar className={styles.navContent}>
					<div className={styles.logos}>
						<Link href="/" aria-label='главная страница'>
							<LogoIcon className={styles.logo} />
						</Link>
						<a className={styles.navLinks} href={VK_LINK} target='_blank'>
							<Button aria-label='вконтакте'>
								<div className={styles.vkLogoContainer}>
									<Vkontakte hover={false} burgerMenu={false} />
								</div>
							</Button>
						</a>
					</div>
					<div className={styles.navLinks}>
						<Link href={SHOP_ROUTE}>
							<Button className={styles.navLink}>Каталог</Button>
						</Link>
						<Link href={CONTACTS_ROUTE}>
							<Button className={styles.navLink}>Контакты</Button>
						</Link>
						<Link href={BASKET_ROUTE}>
							<Button className={styles.navLink} aria-label='корзина' onKeyDown={(e) => handleTab(e)}>
								<Badge
									badgeContent={hasHydrated && productsQuantity}
									color='secondary'
								>
									<ShoppingCartIcon />
								</Badge>
							</Button>
						</Link>
					</div>
				</Toolbar>
			</AppBar>
		</Box >
	);
};