import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { currencies } from './currencyCode';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit {
  public form: FormGroup;
  public api_key = 'ca642acfd2709b550116c694';
  public currencies = currencies;
  public result = '';
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      amount: [100, [Validators.required]],
      fromSelect: [currencies[0], [Validators.required]],
      toSelect: [currencies[0], [Validators.required]],
    });
  }

  submit(formValue: any) {
    let api = `https://v6.exchangerate-api.com/v6/${this.api_key}/latest/USD`;
    this.http.get(api).subscribe((res: any) => {
      console.log(formValue);
      let fromSelect = res.conversion_rates[formValue.fromSelect];
      let toSelect = res.conversion_rates[formValue.toSelect];
      let convertedAmount = (formValue.amount / fromSelect) * toSelect;
      this.result = `${formValue.amount} ${
        formValue.fromSelect
      } = ${convertedAmount.toFixed(2)} ${formValue.toSelect}`;
    });
  }
  ngOnInit(): void {}
}
