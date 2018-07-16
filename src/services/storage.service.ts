import { Injectable } from "@angular/core";
import { LocalUser } from "../models/local_user";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Cart } from "../models/cart";

@Injectable()
export class StorageService {
  getLocalUser() {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    }
    return JSON.parse(usr);
  }

  setLocalUser(obj: LocalUser) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    }
    localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
  }

  getCart() {
    let str = localStorage.getItem(STORAGE_KEYS.cart);
    if (str == null) {
      return null;
    }
    return JSON.parse(str);
  }

  setCart(obj: Cart) {
    if (obj == null) {
      localStorage.removeItem(STORAGE_KEYS.cart);
    }
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
  }
}
