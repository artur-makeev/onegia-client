import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface PProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLParagraphElement>,
		HTMLParagraphElement
	> {
	size?: 'normal' | 'bold' | 'slider';
	children: ReactNode;
}
