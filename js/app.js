var app = new Vue({
    el: '#app',
    data() {
        return {
            // Thanks to: https://medium.com/vuejs-tips/tip-14-private-data-in-vue-js-3188b9f76f30
            add0$:0,
            add1$:0,
            and0$:0,
            and1$:0,
            or0$:0,
            or1$:0,
            sub0$:0,
            sub1$:0,
            xor0$:0,
            xor1$: 0,
            add: '00000000',
            and: '00000000',
            complement: '00000000',
            hex: '',
            or: '00000000',
            sub: '00000000',
            utf8: '',
            xor: '00000000'}
    },
    template: `
    <div>
        <div class="accordion" id="accordion">
            <one-card id='hex' title='Hex' text='Converts from binary to hex'>
                <template slot="input">
                    <one-byte v-on:bit-change='updateHex'></one-byte>
                </template>
                <template slot="output">
                    {{hex}}
                </template>
            </one-card>
            <one-card id='utf8' title='UTF-8' text='Display the UTF-8 value of the byte'>
                <template slot="input">
                    <one-byte v-on:bit-change='updateUtf8'></one-byte>
                </template>
                <template slot="output">
                    {{utf8}}
                </template>
            </one-card>
            <one-card id='and' title='Complement (~)' text='Complement reverses all the bits in a byte'>
                <template slot="input">
                    <one-byte id='complement' v-on:bit-change="updateComplement"></one-byte>
                </template>
                <template slot="output">
                    {{complement}}
                </template>
            </one-card>
            <one-card id='or' title='Bitwise OR (|)' text='If either or both of two bits are 1 when ORed, the result will be 1'>
                <template slot="input">
                    <one-byte id='or-0' v-on:bit-change="updateBinaryOperators"></one-byte>
                    <one-byte id='or-1' v-on:bit-change="updateBinaryOperators"></one-byte>
                </template>
                <template slot="output">
                    {{or}}
                </template>
            </one-card>
            <one-card id='and' title='Bitwise AND (&amp;)' text='If both bits are 1 when ANDed for the result to be 1'>
                <template slot="input">
                    <one-byte id='and-0' v-on:bit-change="updateBinaryOperators"></one-byte>
                    <one-byte id='and-1' v-on:bit-change="updateBinaryOperators"></one-byte>
                </template>
                <template slot="output">
                    {{and}}
                </template>
            </one-card>
            <one-card id='xor' title='Bitwise XOR (^)' v-on:bit-change="updateBinaryOperators" text='If either bit is 1, but not both, the XOR result will be 1'>
                <template slot="input">
                    <one-byte id='xor-0' v-on:bit-change="updateBinaryOperators"></one-byte>
                    <one-byte id='xor-1' v-on:bit-change="updateBinaryOperators"></one-byte>
                </template>
                <template slot="output">
                    {{xor}}
                </template>
            </one-card>
            <one-card id='add' title='Binary Addition (+)' text='C indicates a carry or overflow'>
                <template slot="input">
                    <one-byte id='add-0' v-on:bit-change="updateBinaryOperators"></one-byte>
                    <one-byte id='add-1' v-on:bit-change="updateBinaryOperators"></one-byte>
                </template>
                <template slot="output">
                    {{add}}
                </template>
            </one-card>
            <one-card id='sub' title='Binary Subtraction (-)' text='S means negative'>
                <template slot="input">
                    <one-byte id='sub-0' v-on:bit-change="updateBinaryOperators"></one-byte>
                    <one-byte id='sub-1' v-on:bit-change="updateBinaryOperators"></one-byte>
                </template>
                <template slot="output">
                    {{sub}}
                </template>
            </one-card>
        </div>
    </div>
`,
    methods: {
        updateBinaryOperators(val,id) {
            let prop = id.replace(/^(\w+)-(\d)$/,'$1$2$');
            this[prop] = parseInt(val);
            let add = this.add0$ + this.add1$;
            let and = this.and0$ & this.and1$;
            let or = this.or0$ | this.or1$;
            let sub = this.sub0$ - this.sub1$;
            let xor = this.xor0$ ^ this.xor1$;
            this.add = (add > 255 ? 'C ' : '') + this.$_app_makeBinaryString(add);
            this.and = this.$_app_makeBinaryString(and);
            this.or = this.$_app_makeBinaryString(or);
            this.sub = (sub < 0 ? 'S ' : '') + this.$_app_makeBinaryString(sub);
            this.xor = this.$_app_makeBinaryString(xor);
        },
        updateComplement(val) {
            this.complement = this.$_app_makeBinaryString(~val);
        },
        updateHex(val) {
            let hexMap$ = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
            this.hex = hexMap$[Math.floor(parseInt(val)/16)] + hexMap$[parseInt(val & 15)];
        },
        updateUtf8(val) {
            this.utf8 = String.fromCharCode(val);
        },
        $_app_makeBinaryString(val) {
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