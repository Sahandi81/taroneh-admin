export const removeFristZeros = (code)=>{
        const convertCodeToStr = code;

        let retCode;
        let valid = true;
        for(let i = 0; i <= convertCodeToStr.length; i++ ){
                if(valid && convertCodeToStr[0] === '0'){
                   convertCodeToStr = convertCodeToStr.replace(0,''); 
                }else {
                    valid = false;
                }
        }
        console.log(convertCodeToStr)
        return retCode = convertCodeToStr;
}