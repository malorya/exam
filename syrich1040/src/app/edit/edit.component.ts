import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../services/goods.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { Good } from '../shared/models/good';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public id: number;
  public selectedGood: Good
  public goods: Good[] = []
  public goodForm: FormGroup;
  constructor(private goodsService: GoodsService, private activatedRouter: ActivatedRoute, private router: Router) {
    this.goodForm = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required]),
      status: new FormControl(false),
    });
  }

  async ngOnInit() {
    try {
      let id;
      this.activatedRouter.params.subscribe(param => {
        id = param.id;
      });
      this.id = id
      const selectedGood = await this.goodsService.getGoodById(id);
      this.selectedGood = (isNullOrUndefined(selectedGood)) ? [] : selectedGood;
      this.goodForm.patchValue({
        id: this.selectedGood.id,
        name: this.selectedGood.name,
        amount: this.selectedGood.amount,
        status: this.selectedGood.status,
      });
    } catch (e) {
      console.log(e);
    }
  }
  async onGoodFormSubmit() {
    try {
      await this.goodsService.putGoodById(this.goodForm.value.id, this.goodForm.value);
      await this.router.navigate(['/list']);
    } catch (err) {
      console.log(err);
    }
  }
  async deleteGood(id) {
    try {
      console.log(id)
      await this.goodsService.deleteGoodById(id);
      await this.router.navigate(['/list']);
    } catch (err) {
      console.log(err);
    }
  }
}
