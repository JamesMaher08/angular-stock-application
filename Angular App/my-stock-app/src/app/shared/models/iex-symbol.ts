// This class is an attempt to fix the issue with the large json payload being exported
// in the mock-all-symbol-names-payloads.ts - it can probably be removed

export class IEXSymbol {
    symbol: string;
    name: string;
    date: string;
    isEnabled: boolean;
    type: string;
    iexId: any;

    constructor(init?:Partial<IEXSymbol>) {
        Object.assign(this, init);
    }
}