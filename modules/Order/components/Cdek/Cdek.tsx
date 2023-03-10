import styles from './Cdek.module.css';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { CityOption, RegionOption, Region, City, AddressOption, Branch, Coords, ShippingType } from '../../../../models/Models';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { calculateDelivery } from '../../api/cdekApi';
import MenuItem from '@mui/material/MenuItem';
import { useProductsIdsWithCount } from '../../../Basket/store/BasketComputedValues';
import { useOrderStore } from '../../store/OrderStore';

type Props = {
	setCdekApiError: React.Dispatch<React.SetStateAction<boolean>>
	setCityCenter: React.Dispatch<React.SetStateAction<Coords>>
	setShowMap: React.Dispatch<React.SetStateAction<boolean>>
	addresses: React.MutableRefObject<Branch[]>,
	selectedBranch: AddressOption | null,
	setSelectedBranch: React.Dispatch<React.SetStateAction<string | null>>
};

export const Cdek = ({ setCdekApiError, setCityCenter, setShowMap, addresses, selectedBranch, setSelectedBranch }: Props): JSX.Element => {

	// Order store
	const shippingType = useOrderStore(state => state.shippingType);
	const setShippingType = useOrderStore(state => state.setShippingType);
	const setDeliveryTime = useOrderStore(state => state.setDeliveryTime);
	const setDeliveryPrice = useOrderStore(state => state.setDeliveryPrice);

	// Basket store
	const [productsIdsWithCount] = useProductsIdsWithCount();

	const regions = useRef<Region[]>([]);
	const [regionOptions, setRegionOptions] = useState<RegionOption[]>([]);
	const [selectedRegion, setSelectedRegion] = useState<RegionOption | null>(null);
	const [citiesOptions, setCitiesOptions] = useState<CityOption[]>([]);
	const cities = useRef<City[]>([]);
	const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);
	const [addressesOptions, setAddressesOptions] = useState<AddressOption[]>([]);

	const [localDelivery, setLocalDelivery] = useState<boolean>(false);

	const [branchesLoaded, setBranchesLoaded] = useState<boolean>(false);

	const fetchPlus = (url: string, retries: number): Promise<[]> =>
		fetch(url)
			.then(response => {
				if (response.ok) {
					return response.json();
				}
				if (retries > 0) {
					return fetchPlus(url, retries - 1);
				}
				setCdekApiError(true);
				throw new Error(response.status.toString());
			})
			.catch(error => console.error(error.message));

	useEffect(() => {
		try {
			fetchPlus(`${process.env.NEXT_PUBLIC_API_URL}/api/cdek/regions`, 3)
				.then((response) => {
					regions.current = response as unknown as Region[];
					return response;
				})
				.then((response) => {
					if (Array.isArray(response)) {
						setRegionOptions(Array.from(new Set(response.map((region: Region) => region.region))));
					} else {
						setCdekApiError(true);
					}
				});
		} catch (e) {
			setCdekApiError(true);
			console.log(e);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		let regionCode = null;
		if (selectedRegion &&
			regions.current.some((region) => {
				if (region.region === selectedRegion as unknown as string) {
					regionCode = region.region_code;
					return true;
				} else {
					return false;
				}
			})
		) {
			try {
				fetchPlus(`${process.env.NEXT_PUBLIC_API_URL}/api/cdek/cities?region_code=${regionCode}`, 3)
					.then((response) => {
						cities.current = response as unknown as City[];
						return response;
					})
					.then(response => {
						setCitiesOptions(Array.from(new Set(response.map((city: City) => city.city))));
					}
					);
			} catch (e) {
				setCdekApiError(true);
				console.log(e);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedRegion]);

	useEffect(() => {
		let cityCode = null;

		if (selectedCity && cities.current.some((city: City) => {

			if (city.city === selectedCity as unknown as string) {
				cityCode = city.code;
				setCityCenter({ latitude: city.latitude, longitude: city.longitude });
				return true;
			} else {
				return false;
			}

		})
		) {
			try {
				fetchPlus(`${process.env.NEXT_PUBLIC_API_URL}/api/cdek/addresses?city_code=${cityCode}`, 3)
					.then((response) => {
						addresses.current = response;
						return response;
					})
					.then(response => {
						setAddressesOptions(Array.from(new Set(response.map((address: Branch) => address.address))));
						setBranchesLoaded(true);
					});
			} catch (e) {
				setCdekApiError(true);
				console.log(e);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCity, setCdekApiError, setCityCenter, addresses]);

	useEffect(() => {
		if (selectedBranch) {
			calculateDelivery({ to_address: selectedBranch, packageProducts: productsIdsWithCount })
				.then(res => {
					setDeliveryPrice(Math.floor(res.total_sum));
					setDeliveryTime(res.period_max);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedBranch]);

	useEffect(() => {
		if (!selectedCity) {
			setSelectedBranch(null);
			setBranchesLoaded(false);
			setLocalDelivery(false);
			setShippingType('');
			setDeliveryPrice(0);
		}

		if (!selectedRegion) {
			setSelectedBranch(null);
			setSelectedCity(null);
			setBranchesLoaded(false);
			setLocalDelivery(false);
			setShippingType('');
			setDeliveryPrice(0);
		}

		if (!selectedBranch) {
			setDeliveryPrice(0);
		}

		if (!selectedBranch && !localDelivery) {
			setShippingType('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedRegion, selectedCity, selectedBranch, setSelectedBranch, shippingType]);

	useEffect(() => {
		if (localDelivery) {
			setShowMap(false);
		} else {
			if (!localDelivery) {
				setShowMap((selectedCity && !selectedBranch && branchesLoaded && addressesOptions.length > 0) as boolean);
			}
		}

		if (shippingType === 'pickup') {
			setShowMap(false);
		}
	}, [selectedCity, selectedBranch, addressesOptions, setShowMap, branchesLoaded, localDelivery, shippingType]);

	return (
		<>
			<Autocomplete
				value={selectedRegion}
				onChange={(event: React.FormEvent, newValue: RegionOption | null) => {
					setSelectedRegion(newValue);
				}}
				disablePortal
				id="region"
				options={regionOptions}
				renderInput={(params) => <TextField {...params} label="????????????" />}
			/>
			{selectedRegion && citiesOptions.length > 0 &&
				<Autocomplete
					value={selectedCity}
					onChange={(event: React.FormEvent, newValue: CityOption | null) => {
						setSelectedCity(newValue);
						newValue === '????????????????????????' ? setLocalDelivery(true) : setLocalDelivery(false);
					}}
					disablePortal
					id="city"
					options={citiesOptions}
					renderInput={(params) => <TextField {...params} label="??????????" />}
				/>
			}
			{localDelivery && selectedCity && selectedRegion &&
				<TextField
					required
					label='?????? ???? ???????????? ???????????????? ???????????'
					variant='outlined'
					value={shippingType}
					onChange={(e) => setShippingType(e.target.value as ShippingType)}
					select
				>
					<MenuItem className={styles.shippingItem} value={'pickup'}>??????????????????</MenuItem>
					<MenuItem className={styles.shippingItem} value={'yandex'}>???????????? ????????????????</MenuItem>
				</TextField>
			}
			{selectedCity && branchesLoaded && addressesOptions.length < 1 &&
				<div className={styles.error}>
					?? ???????????? {selectedCity} ?????? ?????????????? ????????
				</div>
			}
			{!localDelivery && selectedCity && addressesOptions.length > 0 &&
				<Autocomplete
					value={selectedBranch}
					onChange={(event: React.FormEvent, newValue: AddressOption | null) => {
						setSelectedBranch(newValue);
						setShippingType('cdek');
					}}
					disablePortal
					id="address"
					options={addressesOptions}
					renderInput={(params) => (
						<TextField {...params} multiline label="?????????? ???????????? ????????" />
					)}
				/>
			}
		</>
	);
};

