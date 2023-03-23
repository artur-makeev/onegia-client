import { Map, Placemark } from '@pbe/react-yandex-maps';
import type { BranchOption, Branch } from '../../models/Branch';
import { useOrderStore } from '../../store/OrderStore';
import { YMaps } from '@pbe/react-yandex-maps';

type Props = {
	ceterLatityde: number;
	centerLongitude: number;
	addresses: Branch[];
	setSelectedBranch: React.Dispatch<React.SetStateAction<BranchOption | null>>;
};

export const YandexMap = ({
	ceterLatityde,
	centerLongitude,
	addresses,
	setSelectedBranch,
}: Props): JSX.Element => {
	// Order store
	const setShippingType = useOrderStore((state) => state.setShippingType);

	return (
		<YMaps>
			<Map
				state={{
					center: [ceterLatityde, centerLongitude],
					zoom: 11,
					controls: ['zoomControl'],
				}}
				modules={['control.ZoomControl']}
				width={334}
			>
				{addresses.map((branch: Branch) => (
					<Placemark
						key={branch.code}
						defaultGeometry={[branch.latitude, branch.longitude]}
						onClick={() => {
							setSelectedBranch(branch.address);
							setShippingType('cdek');
						}}
					/>
				))}
			</Map>
		</YMaps>
	);
};
