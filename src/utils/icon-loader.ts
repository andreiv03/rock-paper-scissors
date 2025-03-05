export const icons = import.meta.glob("@assets/icons/*.svg", { eager: true }) as Record<
	string,
	{ default: string }
>;

export const getIconPath = (item: string): string => {
	const iconPath = icons[`/src/assets/icons/${item}.svg`];
	return iconPath ? iconPath.default : "";
};
