export function getUrlParam(param) { //TODO: Mudar para funções globais
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get(param)
}