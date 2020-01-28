class Weapon {
    constructor(cadency, munition, maxDistance) {
        this.cadency = cadency;
        this.munition = munition;
        this.maxDistance = maxDistance;
    }

}

class Metralleta extends Weapon {
    constructor(cadency = 50, munition = 500, maxDistance = 200) {
        super(cadency, munition, maxDistance);
    }
}

class Revolver extends Weapon {
    constructor(cadency = 2000, munition = 20, maxDistance = 500) {
        super(cadency, munition, maxDistance);
    }
}