// трансформирует русский язык - текст - в транслит
export const Translit = {
    methods: {
        rus_to_latin(str) {
            let ru = {
                    'а': 'a',
                    'б': 'b',
                    'в': 'v',
                    'г': 'g',
                    'д': 'd',
                    'е': 'e',
                    'ё': 'e',
                    'ж': 'j',
                    'з': 'z',
                    'и': 'i',
                    'к': 'k',
                    'л': 'l',
                    'м': 'm',
                    'н': 'n',
                    'о': 'o',
                    'п': 'p',
                    'р': 'r',
                    'с': 's',
                    'т': 't',
                    'у': 'u',
                    'ф': 'f',
                    'х': 'h',
                    'ц': 'c',
                    'ч': 'ch',
                    'ш': 'sh',
                    'щ': 'shch',
                    'ы': 'y',
                    'э': 'e',
                    'ю': 'u',
                    'я': 'ya',
                    ' ': '_'
                },
                n_str = [];
            str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');
            for (let i = 0; i < str.length; ++i) {
                n_str.push(
                    ru[str[i]] ||
                    ru[str[i].toLowerCase()] == undefined && str[i] ||
                    ru[str[i].toLowerCase()].toUpperCase()
                );
            }
            return n_str.join('');
        }
    },
}