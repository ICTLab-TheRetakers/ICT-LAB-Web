import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    public data: { key: string, value: any }[] = [];

    constructor() { }

    setData(key: string, data: any) {
        this.data.push({ key: key, value: data });
    }

    getData(key: string): { key: string, value: any } {
        return this.data.filter(f => f.key == key)[0];
    }

    removeItem(key: string) {
        var index = this.data.indexOf(this.data.filter(f => f.key == key)[0]);
        if (index != -1) {
            this.data.splice(index, 1);
        }
    }
    
    clearData() {
        this.data = [];
    }
}
