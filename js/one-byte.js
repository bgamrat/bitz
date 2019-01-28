Vue.component('one-byte', {
    data: function () {
        return {
            bits: [0, 0, 0, 0, 0, 0, 0, 0]
        }
    },
    methods: {
        clickHandler(evt) {
            evt.target.value = evt.target.value === '0' ? '1' : '0';
            let bits = this.$el.querySelectorAll('.bit');
            let i, l = bits.length;
            let val = 0;
            let shift = 7;
            for (i = 0; i < l; i++) {
                if (bits[i].value === '1') {
                    val += 1 << shift;
                }
                shift--;
            }
            this.$emit('bit-change', val, this.$attrs.id);
        }
    },
    render(createElement) {
        let i;
        let els = [];
        for (i = 0; i < 8; i++) {
            els.push(createElement('input',
                    {attrs: {'type': 'text',
                            minlength: 1,
                            maxlength: 1,
                            value: '0',
                            pattern: '[01]',
                            'class': 'bit border border-dark flex-fill text-center'},
                    on: {
			    click: this.clickHandler
			}}));
        }
        return createElement('div',
                {
                    attrs: {
                        'class': 'byte border border-secondary mx-auto my-2 d-flex'
                    }
                },
                els);
    }
});