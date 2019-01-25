var app = new Vue({
    el: '#app',
    _and0: 0,
    _and1: 0,
    _or0: 0,
    _or1: 0,
    _xor0: 0,
    _xor1: 0,
    data() {
        return { and: '00000000', binary: '00000000', complement: '00000000', hex: '', or: '00000000', utf8: '', xor: '00000000'}
    },
    template: `
    <div>
        <div class="accordion" id="accordion">
            <one-card id='and' title='Complement (~)' v-on:bit-change="updateComplement">
                <one-byte id='complement'></one-byte>
                <div class="mx-auto content my-3" style="width:1000px">
                    {{binary}}<br>
                    {{complement}}
                </div>
            </one-card>
            <one-card id='or' title='Bitwise Or (|)' v-on:bit-change="updateAndOr">
                <one-byte id='or-0'></one-byte>
                <one-byte id='or-1'></one-byte>
                <div class="mx-auto content my-3" style="width:1000px">
                    {{or}}
                </div>
            </one-card>
            <one-card id='and' title='Bitwise And (&amp;)' v-on:bit-change="updateAndOr">
                <one-byte id='and-0'></one-byte>
                <one-byte id='and-1'></one-byte>
                <div class="mx-auto content my-3" style="width:1000px">
                    {{and}}
                </div>
            </one-card>
            <one-card id='xor' title='Bitwise Xor (^)' v-on:bit-change="updateAndOr">
                <one-byte id='xor-0'></one-byte>
                <one-byte id='xor-1'></one-byte>
                <div class="mx-auto content my-3" style="width:1000px">
                    {{xor}}
                </div>
            </one-card>
            <one-card id='hex' title='Hex' v-on:bit-change='updateHex'>
                <one-byte></one-byte>
                <div class="mx-auto content my-3" style="width:1000px">
                    {{hex}}
                </div>
            </one-card>
            <one-card id='utf8' title='UTF-8' v-on:bit-change='updateUtf8'>
                <one-byte></one-byte>
                <div class="mx-auto content my-3" style="width:1000px">
                    {{utf8}}
                </div>
            </one-card>
        </div>
    </div>
`,
    methods: {
        updateAndOr(val,id) {
            let prop = id.replace(/^(\w+)-(\d)$/,'_$1$2');
            this[prop] = parseInt(val);
            let and = this._and0 & this._and1;
            let or = this._or0 | this._or1;
            let xor = this._xor0 ^ this._xor1;
            this.and = this._makeBinaryString(and);
            this.or = this._makeBinaryString(or);
            this.xor = this._makeBinaryString(xor);
        },
        updateComplement(val) {
            this.binary = this._makeBinaryString(val);
            this.complement = this._makeBinaryString(~val);
        },
        updateHex(val) {
            let _hexMap = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
            this.hex = '#' + _hexMap[Math.floor(parseInt(val)/16)] + _hexMap[parseInt(val & 15)];
        },
        updateUtf8(val) {
            this.utf8 = String.fromCharCode(val);
        },
        _makeBinaryString(val) {
            let i;
            let mask = 128;
            let returnValue = '';
            for (i = 0; i < 8; i++) {
                returnValue += ((mask & val) !== 0) ? '1' : '0';
                mask = mask >> 1;
            }
            return returnValue;
        }
    }
});