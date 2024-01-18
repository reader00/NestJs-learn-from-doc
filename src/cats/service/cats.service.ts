import { Injectable } from '@nestjs/common';
import { CatRepository, CreateCatDto, UpdateCatDto } from '../domain';
import { Cat } from '../domain/interfaces';

@Injectable()
export class CatsService extends CatRepository {
    private readonly cats: Cat[] = []

    private _lastId(): number {
        return this.cats.length ? this.cats[this.cats.length - 1].id : 0
    }
    private _getIndex(id: number): number {
        return this.cats.findIndex(cat => cat.id === id)
    }

    getCats(): Cat[] {
        return this.cats;
    }

    getCatById(id: number): Cat {
        const found = this.cats.filter(cat => cat.id === id)
        return found[0]
    }

    createCat(cat: CreateCatDto): Cat {
        const id = this._lastId() + 1
        const newCat = { ...cat, createdAt: +new Date(), id }
        this.cats.push(newCat)
        return newCat
    }

    updateCatById(id: number, cat: UpdateCatDto): Cat {
        const index = this._getIndex(id)
        if (index === -1) return
        const oldCat = this.cats[index]
        const updated = { ...oldCat, ...cat, id }
        oldCat[index] = updated
        return updated
    }

    deleteCatById(id: number): Cat {
        const index = this._getIndex(id)
        if (index === -1) return
        const deletedCat = this.cats[index]
        this.cats.splice(index, 1)
        return deletedCat
    }
}
