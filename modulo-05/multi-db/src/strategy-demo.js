// Criação de uma classe customizada de Error
class NotImplementedException extends Error {
    constructor() {
        super("Not implemented exception");
    }
}

/**
 * A classe ou interface Strategy, declara as operações comuns a todas as versões.
 * No nosso caso, a todos os databases
 */
class ICRUD {
    create(hero) {
        throw new NotImplementedException();
    }
}

/**
 * A Strategy concreta deverá implementar o algoritmo estabelecido na interface/classe.
 */
class Postgres extends ICRUD {
    constructor() {
        super();
    }

    create(hero) {
        console.log("[postgres-create]");
    }
}

class MongoDb extends ICRUD {
    constructor() {
        super();
    }

    create(hero) {
        console.log("[mongo-create]");
    }
}

/**
 * O Context define a interface de interesse do cliente
 */
class Context {
    constructor(databaseStrategy) {
        this._databaseStrategy = databaseStrategy;
    }

    setStrategy(strategy) {
        this._databaseStrategy = strategy;
    }

    create(hero) {
        this._databaseStrategy.create(hero);
    }
}

const postgresContext = new Context(new Postgres());
postgresContext.create();

const mongoContext = new Context(new MongoDb());
mongoContext.create();