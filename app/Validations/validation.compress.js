function isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) && !isNaN(parseFloat(str))
}

module.exports = function validation(quality, extension, width, height, fileName) {
    let reg = new RegExp("[\/.](gif|jpg|jpeg|tiff|webp|png)$");
    if (!reg.test(fileName)) {
        return `Selecione um arquivo de imagem: (.jpg, .png, .jpeg, .gif, .webp ou .tiff). Arquivo não é valido: ${fileName}`;
    }

    if (quality === undefined || quality === null || extension === null || extension === undefined) {
        return 'quality e extension são obrigatorios.';
    }

    if (!extension.startsWith('.')) {
        return 'extension no formato errado.';
    }

    if (!isNumeric(quality)) {
        return 'quality não é um numero valido.';
    }

    if (width !== undefined && width !== null && width !== '') {
        if (!isNumeric(width)) {
            return 'width não é um numero valido.';
        }
    }

    if (height !== undefined && height !== null && height !== '') {
        if (!isNumeric(height)) {
            return 'height não é um numero valido.';
        }
    }

    return undefined;
};


