import styles from './Button.module.css';
import type { ButtonProps } from './Button.props';
import cn from 'classnames';

export const Button = ({
	size,
	children,
	className,
	...props
}: ButtonProps) => (
	<button
		className={cn(styles.button, className, {
			[styles.small]: size === 'small',
		})}
		{...props}
	>
		{children}
	</button>
);
