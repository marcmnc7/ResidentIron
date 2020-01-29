class Weapon {
    constructor(damage, cadency, munition, maxDistance, regression) {
        this.cadency = cadency;
        this.damage = damage;
        this.munition = munition;
        this.maxDistance = maxDistance;
        this.regression = regression;
    }

}

class Metralleta extends Weapon {
    constructor(damage = 1, cadency = 200, munition = 100, maxDistance = 200, regression = 5) {
        super(damage, cadency, munition, maxDistance, regression);
    }
}

class Revolver extends Weapon {
    constructor(damage = 3, cadency = 2000, munition = 20, maxDistance = 500, regression = 15) {
        super(damage, cadency, munition, maxDistance, regression);
    }
}