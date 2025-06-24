export const setLanguage = (value)=>{
    localStorage.setItem('cl', value);
}
export const getLanguage = ()=>{
    return localStorage.getItem('cl');
}