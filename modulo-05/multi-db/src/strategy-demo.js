// Criação de uma classe customizada de Error
class NotImplementedException extends Error {
    constructor() {
        super("Not implemented exception");
    }
}

/**
 * A classe ou interface Strategy, declara as operações comuns a todas as estratégias.
 * No nosso caso, a todos os databases
 */
class ICRUD {
    create(hero) {
        throw new NotImplementedException();
    }

    read(query) {
        throw new NotImplementedException();
    }

    update(id, hero) {
        throw new NotImplementedException();
    }

    delete(id) {
        throw new NotImplementedException();
    }
}

/**
 * A Strategy concreta deverá implementar o algoritmo estabelecido na interface/classe porém obedecendo as regras da estratégia.
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

    read(hero) {
        this._databaseStrategy.read(hero);
    }

    update(id, hero) {
        this._databaseStrategy.update(id, hero);
    }

    delete(id) {
        this._databaseStrategy.update(id);
    }
}

const postgresContext = new Context(new Postgres());
postgresContext.create();

const mongoContext = new Context(new MongoDb());
mongoContext.create();