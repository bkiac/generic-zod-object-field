import {z} from "zod"

export type PlainObject = {[key: string]: unknown}

export function TransactionPropsSchema<T extends PlainObject>() {
	return z.object({
		id: z.string(),
		rawData: z.custom<T>((data) => z.object({}).safeParse(data)),
	})
}

export type TransactionProps<RawData extends PlainObject = PlainObject> =
	z.infer<ReturnType<typeof TransactionPropsSchema<RawData>>>

export class Transaction<RawData extends PlainObject = PlainObject> {
	constructor(public props: TransactionProps<RawData>) {}

	get id() {
		return this.props.id
	}

	get rawData() {
		return this.props.rawData // Property 'rawData' does not exist on type ...
	}
}

const tx = new Transaction({
	id: "0",
	rawData: {},
})
const tx2 = new Transaction<{foo: "bar"}>({
	id: "1",
	rawData: {
		foo: "bar",
	},
})
