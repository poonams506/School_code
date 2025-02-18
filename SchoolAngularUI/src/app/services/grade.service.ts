/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Grade } from '../modules/grade-and-division/grade-listing/grade-interface';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../directives/sortable.directive';
import { GRADES } from '../modules/grade-and-division/grade-listing/grade-data';

interface SearchResult {
	grades: Grade[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(grades: Grade[], column: SortColumn, direction: string): Grade[] {
	if (direction === '' || column === '') {
		return grades;
	} else {
		return [...grades].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(grade: Grade, term: string, pipe: PipeTransform) {
	return (
		grade.firstName.toLowerCase().includes(term.toLowerCase()) ||
        grade.lastName.toLowerCase().includes(term.toLowerCase()) ||
        grade.email.toLowerCase().includes(term.toLowerCase()) ||
        grade.address.toLowerCase().includes(term.toLowerCase()) ||
		//pipe.transform(order.area).includes(term) ||
		pipe.transform(grade.phone).includes(term)
	);
}

@Injectable({ providedIn: 'root' })
export class GradeService {
	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _grades$ = new BehaviorSubject<Grade[]>([]);
	private _total$ = new BehaviorSubject<number>(0);

	private _state: State = {
		page: 1,
		pageSize: 4,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};

	constructor(private pipe: DecimalPipe) {
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._grades$.next(result.grades);
				this._total$.next(result.total);
			});

		this._search$.next();
	}

	get grades$() {
		return this._grades$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let grades = sort(GRADES, sortColumn, sortDirection);

		// 2. filter
		grades = grades.filter((order) => matches(order, searchTerm, this.pipe));
		const total = grades.length;

		// 3. paginate
		grades = grades.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ grades, total });
	}
}
