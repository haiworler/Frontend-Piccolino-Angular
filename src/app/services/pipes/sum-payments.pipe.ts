import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sumPayments'
})
export class SumPaymentsPipe implements PipeTransform {
  transform(items: any[], attr: string): any {
    console.log(items);
    	var total = 0;
      items.forEach(item => {
			total += (parseInt(item.value));
		});
		return  total;

   
  }

}
