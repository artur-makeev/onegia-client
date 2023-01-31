import { PProps } from './P.props';
import styles from './P.module.css';
import cn from 'classnames';

export const P = ({ size = 'normal', children, className, ...props }: PProps) => {
	return (
		<p
			className={cn(styles.p, className, styles[size])}
			{...props}
		>
			{children}
		</p>);

};