import { makeAutoObservable } from 'mobx';
import { fetchProducts } from '../api/productApi';
import { ProductCategory, Product } from '../../../models/Models';

export class ProductStore {
	_categories: ProductCategory[];
	_products: Product[];
	_selectedCategory: ProductCategory;
	_page: number;
	_totalCount: number;
	_limit: number;
	constructor() {
		this._categories = [];
		this._products = [];
		this._selectedCategory = { id: 0, name: '' };
		this._page = 1;
		this._totalCount = 0;
		this._limit = 10;
		makeAutoObservable(this);
	}

	setCategories(categories: ProductCategory[]): void {
		this._categories = categories;
	}

	setProducts(products: Product[]): void {
		this._products = products;
	}

	setSelectedCategory(category: ProductCategory): void {
		this.setPage(1);
		this._selectedCategory = category;
	}

	setPage(page: number): void {
		this._page = page;
	}

	setTotalCount(totalCount: number): void {
		this._totalCount = totalCount;
	}

	loadAllProducts(): void {
		fetch(process.env.REACT_APP_API_URL + '/api/category').then(data => this.setCategories(data as unknown as ProductCategory[]));
		fetchProducts(null, 1, 10)
			.then(data => {
				this.setProducts(data.rows);
				this.setTotalCount(data.count);
			});
	}

	loadProductsByCategory(): void {
		if (this.selectedCategory.id) {
			fetchProducts(this.selectedCategory.id, this.page, this.limit)
				.then(data => {
					this.setProducts(data.rows);
					this.setTotalCount(data.count);
				});
		} else {
			this.loadAllProducts();
		}
	}

	get categories() {
		return this._categories;
	}

	get products() {
		return this._products;
	}

	get selectedCategory() {
		return this._selectedCategory;
	}

	get page() {
		return this._page;
	}

	get totalCount() {
		return this._totalCount;
	}

	get limit() {
		return this._limit;
	}

}