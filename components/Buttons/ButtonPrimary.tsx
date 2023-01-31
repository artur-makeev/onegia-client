import { forwardRef } from 'react';
import styles from './ButtonPrimary.module.css';

type CallbackFunctionOnEvent = (argument: React.KeyboardEvent) => void;

interface Props {
	name: string | number,
	onClick?: React.MouseEventHandler<HTMLElement>,
	onBlur?: React.FocusEventHandler<HTMLButtonElement>,
	onKeyDown?: CallbackFunctionOnEvent,
	onKeyUp?: CallbackFunctionOnEvent,
	disabled?: boolean,
	size?: string,
	width?: string,
	hide?: boolean,
	className?: string
	children?: React.ReactNode
}

type Ref = HTMLButtonElement;

const ButtonPrimary = forwardRef<Ref, Props>((props, ref): JSX.Element => {
	const { name, onClick, onBlur, onKeyDown, onKeyUp, disabled, size, width, hide, className } = props;
	return (
		<button
			className={`${className} ${size === 'small' ? styles.primarySmall : styles.primary}`}
			onClick={onClick}
			onBlur={onBlur}
			onKeyDown={onKeyDown}
			onKeyUp={onKeyUp}
			disabled={disabled}
			ref={ref}
			style={{ width: `${width}`, display: hide ? 'none' : 'inline-block' }}
		>
			{name}
		</button>
	);
});

export default ButtonPrimary;
