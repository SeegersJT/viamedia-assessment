export class Utils {
	static roundUp(value: number, decimals: number = 0): number {
		const factor = Math.pow(10, decimals)
		return Math.ceil(value * factor) / factor
	}
}
