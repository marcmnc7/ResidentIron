class Weapon {
    constructor(damage, cadency, munition, maxDistance, regression, maxMunition) {
        this.cadency = cadency;
        this.damage = damage;
        this.munition = munition;
        this.maxDistance = maxDistance;
        this.regression = regression;
        this.maxMunition = maxMunition;
    }

}

class Metralleta extends Weapon {
    constructor(damage = 1, cadency = 200, munition = 20, maxDistance = 200, regression = 5, maxMunition = 200) {
        super(damage, cadency, munition, maxDistance, regression, maxMunition);
        this.name = "metralleta"
    }
}

class Revolver extends Weapon {
    constructor(damage = 3, cadency = 200, munition = 2, maxDistance = 500, regression = 15, maxMunition = 10) {
        super(damage, cadency, munition, maxDistance, regression, maxMunition);
        this.name = "revolver"
    }
}