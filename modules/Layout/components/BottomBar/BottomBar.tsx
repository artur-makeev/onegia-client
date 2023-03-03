import styles from './BottomBar.module.css';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { BASKET_ROUTE, SHOP_ROUTE, VK_LINK, CONTACTS_ROUTE } from '../../../../utilities/consts';
import { Vkontakte } from '../../../../UI/Vkontakte/Vkontakte';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useBasketProductsQuantity } from '../../../Basket/store/BasketComputedValues';
import { useHasHydrated } from '../../hooks/useHasHydrated';

export const BottomBar = () => {
	const hasHydrated = useHasHydrated();

	const [productsQuantity] = useBasketProductsQuantity();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }} className={styles.bottomBar}>
			<Toolbar sx={{ justifyContent: 'space-around' }}>
				<IconButton
					onClick={handleClick}
					aria-controls={open ? 'basic-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					color="inherit"
					aria-label="open menu">
					<MenuIcon />
				</IconButton>
				<Menu
					id="menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'link',
					}}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'left',
					}}
					transformOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
				>
					<MenuItem onClick={handleClose}>
						<Link
							className={styles.dropdown}
							href={CONTACTS_ROUTE}
						>
							Контакты
						</Link>
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<Link
							className={styles.dropdown}
							href={SHOP_ROUTE}
						>
							Каталог
						</Link>
					</MenuItem>
					<MenuItem onClick={handleClose}>
						<Link
							className={styles.dropdown}
							href={BASKET_ROUTE}
						>
							Корзина
						</Link>
					</MenuItem>
				</Menu>
				<Link href={SHOP_ROUTE}>
					<IconButton aria-label='Каталог'>
						<StoreIcon className={styles.navLink} />
					</IconButton>
				</Link>
				<a href={VK_LINK} target='_blank'>
					<IconButton aria-label='Вконтакте'>
						<div className={styles.vkLogoContainer}>
							<Vkontakte hover={false} burgerMenu={false} />
						</div>
					</IconButton>
				</a>
				<Link href={BASKET_ROUTE}>
					<IconButton className={styles.navLink} aria-label='Корзина'>
						<Badge
							badgeContent={hasHydrated && productsQuantity}
							color='secondary'
						>
							<ShoppingCartIcon />
						</Badge>
					</IconButton>
				</Link>
			</Toolbar>
		</AppBar>
	);
};
