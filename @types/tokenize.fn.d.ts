export interface Token<TokenType> {
	type: TokenType;
	value: string;
	col: number;
	row: number;
}
type TokenOptionsCallback<TokenType> = (
	value: string,
	index: { col: number; row: number },
	line: string
) => [Token<TokenType> | null, number];
export type TokenOptions<TokenType> = [
	string | RegExp,
	TokenType | TokenOptionsCallback<TokenType>
][];

export default function tokenize<TokenType>(
	source: string,
	options: TokenOptions<TokenType>
): Token<TokenType>[];

export function skip(): [null, 0];
