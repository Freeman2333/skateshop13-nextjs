import { makeAutoObservable, toJS } from "mobx";
import { makePersistable } from "mobx-persist-store";

import { isEqualObjects, getTotalCount, getTotalPrice } from "@/utils";

const carryTotalCountPrice = (fn1, fn2) => (items) => {
  const totalCount = fn1(items);
  const totalPrice = fn2(items, totalCount);

  return { totalCount, totalPrice };
};

const carryCountPrice = carryTotalCountPrice(getTotalCount, getTotalPrice);

class CartStore {
  items;
  totalPrice;
  totalCount;

  constructor() {
    this.items = [];
    this.totalPrice = 0;
    this.totalCount = 0;

    makeAutoObservable(this);

    makePersistable(this, {
      name: "mobx-store",
      properties: ["items", "totalPrice", "totalCount"],
      storage: window ? window.localStorage : null,
    });
  }

  addProductToCart(newObj, count) {
    const cartItem = toJS(this.items);

    const findItemIndexCart = cartItem.findIndex((item) =>
      isEqualObjects(item, newObj, "countItem")
    );

    const currentProductItems =
      findItemIndexCart === -1
        ? [...cartItem, { ...newObj, countItem: 1 }]
        : cartItem.map((item, index) => {
            return index === findItemIndexCart
              ? { ...item, countItem: count || item.countItem + 1 }
              : item;
          });

    this._updateData(currentProductItems);
  }

  removeCartItem(index) {
    const newItems = JSON.parse(JSON.stringify(toJS(this.items))); // deep copy

    // remove form item array. Use index element
    newItems.splice(index, 1);

    this._updateData(newItems);
  }

  plusCartItem(index) {
    const newItems = [
      ...this.items.slice(0, index),
      {
        ...this.items[index],
        countItem: this.items[index].countItem + 1,
      },
      ...this.items.slice(index + 1),
    ];

    this._updateData(newItems);
  }

  minusCartItem(index) {
    if (this.items[index].countItem > 1) {
      const newItems = [
        ...this.items.slice(0, index),
        {
          ...this.items[index],
          countItem: this.items[index].countItem - 1,
        },
        ...this.items.slice(index + 1),
      ];

      this._updateData(newItems);
    }
  }

  updateCartItem(countItem, index) {
    if (this.items[index].countItem > 1) {
      const newItems = [
        ...this.items.slice(0, index),
        {
          ...this.items[index],
          countItem,
        },
        ...this.items.slice(index + 1),
      ];

      this._updateData(newItems);
    }
  }

  _updateData(newObject) {
    this.items = newObject;

    const { totalCount, totalPrice } = carryCountPrice(newObject);

    this.totalCount = totalCount;
    this.totalPrice = totalPrice;
  }

  clearCart() {
    this.totalPrice = 0;
    this.totalCount = 0;
    this.items = [];
  }
}

const cartStore = new CartStore();
export default cartStore;
