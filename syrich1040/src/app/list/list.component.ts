import { Component, OnInit } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Good } from '../shared/models/good';
import { GoodsService } from '../services/goods.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  public goods: Good[] = []
  constructor(private goodsService: GoodsService) { }

  async ngOnInit() {
    try {
      const goods = await this.goodsService.getGoods();
      this.goods = (isNullOrUndefined(goods)) ? [] : goods;
      this.sortByName(goods, 1)
      this.sortByStatus(goods)
    } catch (err) {
      console.log(err);
    }
  }

  async changeStatus(id) {
    try {
      const good = await this.goodsService.getGoodById(id)
      good.status = !good.status
      await this.goodsService.putGoodById(id, good);
      this.ngOnInit()
    } catch (err) {
      console.log(err);
    }
  }

  sortByStatus(goods) {
    this.goods = goods.sort((x, y) => x.status - y.status);
  }

  sortByName(goods, flag) {
    if (flag == 1) {
      this.goods = goods.sort((x, y) => {
        let nameA = x.name.toLowerCase(), nameB = y.name.toLowerCase()
        if (nameA < nameB)
          return -1
        if (nameA > nameB)
          return 1
        return 0
      });
    } else if (flag == 2)  {
      this.goods = goods.sort((x, y) => {
        let nameA = x.name.toLowerCase(), nameB = y.name.toLowerCase()
        if (nameA < nameB)
          return 1
        if (nameA > nameB)
          return -1
        return 0
      });
    }
    this.sortByStatus(goods)
  }
}
