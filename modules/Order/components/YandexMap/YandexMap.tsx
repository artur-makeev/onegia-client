import { Map, Placemark } from '@pbe/react-yandex-maps';
import { useContext } from 'react';
import { AddressOption, Branch } from '../../../../models/Models';
import { Context } from '../../../../pages/_app';

type Props = {
	ceterLatityde: number,
	centerLongitude: number,
	addresses: Branch[]
	setSelectedBranch: React.Dispatch<React.SetStateAction<AddressOption | null>>
};

export const YandexMap = ({ ceterLatityde, centerLongitude, addresses, setSelectedBranch }: Props): JSX.Element => {
	const { order } = useContext(Context);
	return (
		<Map
			state={{ center: [ceterLatityde, centerLongitude], zoom: 11, controls: ["zoomControl"] }}
			modules={["control.ZoomControl"]}
			width={334}
		>
			{addresses.map((branch: Branch) => {
				return (
					<Placemark
						key={branch.code}
						defaultGeometry={[branch.latitude, branch.longitude]}
						onClick={() => {
							setSelectedBranch(branch.address);
							order.setShippingType('cdek');
						}}
					/>);
			})}
		</Map>
	);
};
