import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/goods.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { Good } from '../shared/models/good';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public goods: Good[] = []
  public goodForm: FormGroup;
  constructor(private goodsService: GoodsService, private router: Router) {
    this.goodForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      status: new FormControl(false),
    });
  }

  async ngOnInit() {
    try {
      const goods = await this.goodsService.getGoods();
      this.goods = (isNullOrUndefined(goods)) ? [] : goods;
    } catch (err) {
      console.log(err);
    }
  }

  async onGoodFormSubmit() {
    try {
      const good = this.goodForm.value;
      await this.goodsService.postGood(good);
      await this.router.navigate(['/list']);
    } catch (err) {
      console.log(err);
    }
  }
}
