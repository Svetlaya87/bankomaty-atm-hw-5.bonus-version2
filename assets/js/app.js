
    const maxNotesLimit = 40;
    let ATMInfoCopy = [];

    let xhr = new XMLHttpRequest();

    xhr.open('GET', './data/atm-info.json');

    xhr.onload = function(){

        const ATMInfo = JSON.parse(this.response);

        console.log(ATMInfo);

        if (ATMInfo.length==10) {

            ATMInfoCopy = [...ATMInfo];
            console.log(ATMInfoCopy);

            return ATMInfo;


            
        }
        /* Вы можете разместить свой код здесь */

        

    }

    xhr.send();


    function calc(){

        let SumFromUser = SumInput.value.split('').map(currentValue => currentValue * 1 );
        SumFromUser.reverse();
        console.log(SumFromUser);
        console.log(ATMInfoCopy);
        let tempTis94i=0;
        let tempSotni=0;
        let tempDesatki=0;
        let edinicy=0;
        let SchetchicVsehCupur=0;
        let chislo=[];
        let chislo2=[];//здесь планируется кол-во купюр умномож на 1000, сотни на 100 и т.д
        let SumNaRuki=0;

       

            if (SumFromUser.length>5 || ( SumFromUser[SumFromUser.length-1]>5 && SumFromUser.length==5) ){

                resOutput.innerHTML='Количество банкнот превышают допустимые. Попробуйте снять деньги за несколько раз';
            
            

            } else {

                tempTis94i =SumFromUser.slice(3).reverse().join('')*1;//количество купюр в 1000
                chislo.push(tempTis94i);

              
                tempSotni=SumFromUser.slice(2,3).join('')*1;//количество купюр в 100
                chislo.push(tempSotni);
               
              
                tempDesatki=SumFromUser.slice(1,2).join('')*1;//количество купюр в 10
                chislo.push(tempDesatki);
              
                edinicy=SumFromUser.slice(0,1).join('')*1;//количество единиц
                chislo.push(edinicy);
              

                let a=1000; //множитель на 1000, после каждого деления на 10 получаем сотни, десятки, единцы
                for (let i=0; i<chislo.length; i++){
                    
               
                    chislo2.push( chislo[i]*a );
                    a=a/10;
                }

                
            }

            console.log(chislo); // было [12,5,4,6]
            console.log(chislo2);// после цикла стало [12000,500,40,6]


        let Chislo = 0;
        Chislo=chislo2.reduce((total, amount) => total + amount);
        console.log(Chislo);
            let RaznicaTisacha=0;
        

        a=1000;  
        SchetchicVsehCupur=0;  


        for ( let j=0; j<chislo.length; j++ ){
            

            for (i=0; i<ATMInfoCopy.length;i++){
                

                if (chislo[j]*a<ATMInfoCopy[i].denomination || ATMInfoCopy[i].quantity ==0){
                    continue;
                }

                else if (chislo[j]*a/ATMInfoCopy[i].denomination <=ATMInfoCopy[i].quantity){ //tempTis94i

                    SchetchicVsehCupur=SchetchicVsehCupur+chislo[j]*a/ATMInfoCopy[i].denomination ;//кол-во купюр 1000, если их меньше или равно кол-ву в банкомате
                    console.log(`${ATMInfoCopy[i].denomination} грн ${chislo[j]*a/ATMInfoCopy[i].denomination }`);
                    SumNaRuki=ATMInfoCopy[i].denomination*chislo[j]*a/ATMInfoCopy[i].denomination;
                    break;
                    
                }else {
                    

                    RaznicaTisacha=chislo[j]*a-ATMInfoCopy[i].denomination*ATMInfoCopy[i].quantity;

                
                    SchetchicVsehCupur=SchetchicVsehCupur+ATMInfoCopy[i].quantity;
                    
                    SumNaRuki=ATMInfoCopy[i].denomination *  ATMInfoCopy[i].quantity;
                    console.log(`${ATMInfoCopy[i].denomination} грн ${ATMInfoCopy[i].quantity}`);
                    console.log(RaznicaTisacha);
                    break;
                }
            }

            i++;

            a=a/10;
         
        
        }        
            for (let i=1; i<ATMInfoCopy.length && RaznicaTisacha !=0 &&  (maxNotesLimit-SchetchicVsehCupur)>=0 ; i++){    

                if (ATMInfoCopy[i].quantity ==0) {
                    continue;
                }
                
                if (RaznicaTisacha/ATMInfoCopy[i].denomination<=ATMInfoCopy[i].quantity){ //tempTis94i

                    SchetchicVsehCupur=SchetchicVsehCupur+RaznicaTisacha/ATMInfoCopy[i].denomination;//кол-во купюр 1000, если их меньше или равно кол-ву в банкомате
                    
                    SumNaRuki=SumNaRuki+ATMInfoCopy[i].denomination*RaznicaTisacha/ATMInfoCopy[i].denomination;
                    
                    console.log(`${ATMInfoCopy[i].denomination} грн ${RaznicaTisacha/ATMInfoCopy[i].denomination}`);
                    break;
                }else {
                    
                    
                    if (   (maxNotesLimit-SchetchicVsehCupur) < ATMInfoCopy[i].quantity   ) {

                        RaznicaTisacha=RaznicaTisacha-ATMInfoCopy[i].denomination*(maxNotesLimit-SchetchicVsehCupur);

                        SumNaRuki=SumNaRuki+ATMInfoCopy[i].denomination*(maxNotesLimit-SchetchicVsehCupur);
                        console.log(`${ATMInfoCopy[i].denomination} грн ${maxNotesLimit-SchetchicVsehCupur}`);

                        SchetchicVsehCupur=SchetchicVsehCupur+(maxNotesLimit-SchetchicVsehCupur);

                        
                        console.log(RaznicaTisacha);
                        console.log(SchetchicVsehCupur, (maxNotesLimit-SchetchicVsehCupur) );
                        break;

                    } else {
                        RaznicaTisacha=RaznicaTisacha-ATMInfoCopy[i].denomination*ATMInfoCopy[i].quantity;

                        
                        SchetchicVsehCupur=SchetchicVsehCupur+ATMInfoCopy[i].quantity;
                        
                        SumNaRuki=SumNaRuki+ATMInfoCopy[i].denomination*ATMInfoCopy[i].quantity;
                        console.log(`${ATMInfoCopy[i].denomination} грн ${ATMInfoCopy[i].quantity}`);
                        console.log(RaznicaTisacha);
                        console.log(SchetchicVsehCupur, (maxNotesLimit-SchetchicVsehCupur) );
                    }
                }    
            }   
        
        console.log('Сумма к выдаче', SumNaRuki);



       
           

            
            
         
          

           

        
        


    }
    

       

    


    