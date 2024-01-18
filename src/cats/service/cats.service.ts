import { Injectable } from '@nestjs/common';
import { CatRepository } from '../domain';
import { Cat } from '../domain/interfaces';

@Injectable()
export class CatsService extends CatRepository {

    getCats(): Cat[] {
        return
    }

    getCatById(): Cat {
        return
    }

    createCat(): Cat {
        return
    }

    updateCatById(): Cat {
        return
    }

    deleteCatById(): Cat {
        return
    }
}
