import React, { ReactNode } from 'react'

import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'outline' | 'icon'
	size?: 'sm' | 'md' | 'lg' | 'iconOnly'
	loading?: boolean
	icon?: ReactNode
	loadingIcon?: ReactNode
}

const Button: React.FC<ButtonProps> = ({
	children,
	variant = 'primary',
	size = 'md',
	loading = false,
	icon,
	loadingIcon,
	className,
	...props
}) => {
	const baseClasses =
		'rounded-2xl cursor-pointer font-inter font-semibold transition-colors duration-200 ease-in-out flex items-center justify-center'

	const sizeClasses = clsx(
		{
			sm: 'px-4 py-2 text-sm',
			md: 'px-6 py-3 text-base',
			lg: 'px-8.5 py-6 text-lg',
			iconOnly: 'p-1'
		}[size]
	)

	const variantClasses = clsx(
		{
			primary:
				'relative  bg-[#FF5F00] hover:bg-[#FF9E59] active:bg-[#FF3D00] text-white  text-base leading-4',
			secondary:
				'bg-white text-[#FF5F00] border-2 border-[#FF5F00] hover:border-[#FF3D00] hover:text-[#FF3D00] active:bg-[#FF5F00] active:text-white',
			outline:
				'font-medium text-[16px] leading-[16px] tracking-[0em]  underline text-[#078691]  hover:text-[#7E7E7E] active:text-[#31393C]',
			icon: 'rounded-full hover:bg-gray-200'
		}[variant]
	)

	return (
		<button
			className={clsx(
				baseClasses,
				sizeClasses,
				variantClasses,
				className,
				loading && 'opacity-70 cursor-not-allowed'
			)}
			disabled={loading || props.disabled}
			{...props}
		>
			{loading && <div className="pr-2 pl-9.5">{loadingIcon}</div>}
			{icon && <span className="mr-2">{icon}</span>}
			{children}
		</button>
	)
}

export default Button
