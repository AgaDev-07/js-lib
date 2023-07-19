import {
	Token as Token_Type,
} from '../tokenize.fn.d.ts';
import { scope, valid_var, LikeNumber } from './types.d.ts';

export const enum TokenType {
	Number,
	Operator,
	OpenParen,
	CloseParen,
	OpenBracket,
	CloseBracket,
	OpenBrace,
	CloseBrace,
	Constant,
	Variable,
}

export interface ParseComplexResultVariable {
	type: 'variable';
	value: LikeNumber;
	name: valid_var;
}
export interface ParseComplexResultConstant {
	type: 'constant';
	name: 'i' | 'e' | 'π';
}
export interface ParseComplexResultNumber {
	type: 'number';
	value: LikeNumber;
}
export interface ParseComplexResultOperator {
	type: 'operator';
	value: string;
	left: ParseComplexResult;
	right: ParseComplexResult;
}
export interface ParseComplexResultList {
	type: 'list';
	value: LikeNumber[];
}

export type ParseComplexResultValue =
	| ParseComplexResultNumber
	| ParseComplexResultVariable
	| ParseComplexResultConstant;
export type ParseComplexResult =
	| ParseComplexResultValue
	| ParseComplexResultOperator
	| ParseComplexResultList;

type Token = Token_Type<TokenType>;

export default class Parser {
	tokens: Token[];
	constructor(source: string)
	protected at(): Token
	protected eat():Token
	protected next(): Token
	protected parseVariable(): ParseComplexResultVariable
	protected parseConstant(): ParseComplexResultConstant
	protected parseValue(): ParseComplexResult
	protected powerValue(): ParseComplexResult
	protected power(): ParseComplexResult
	protected multiplication(): ParseComplexResult
	protected addition(): ParseComplexResult
	protected parseExpression(): ParseComplexResult
	public parse(): ParseComplexResult
	static evaluate(
		parse: ParseComplexResult,
		scope: scope
	): LikeNumber | LikeNumber[]
	static simplify(parse: ParseComplexResult, scope: scope): ParseComplexResult
}
export function eval_complex(value: string, scope: scope): LikeNumber | LikeNumber[]

export function divide_var(
	_left: ParseComplexResult,
	_right: ParseComplexResult,
	scope: scope
): ParseComplexResult
export function multiply_var(
	_left: ParseComplexResult,
	_right: ParseComplexResult,
	scope: scope
): ParseComplexResult
export function add_var(
	_left: ParseComplexResult,
	_right: ParseComplexResult,
	scope: scope
): ParseComplexResult
export function subtract_var(
	_left: ParseComplexResult,
	_right: ParseComplexResult,
	scope: scope
): ParseComplexResult
export function power_var(
	_left: ParseComplexResult,
	_right: ParseComplexResult,
	scope: scope
): ParseComplexResult
export function multiple_power_var(
	right:
		| ParseComplexResultNumber
		| ParseComplexResultConstant
		| ParseComplexResultList,
	exponent: LikeNumber
): ParseComplexResultNumber | ParseComplexResultList

export function getValue(parse: ParseComplexResult): LikeNumber | LikeNumber[]
