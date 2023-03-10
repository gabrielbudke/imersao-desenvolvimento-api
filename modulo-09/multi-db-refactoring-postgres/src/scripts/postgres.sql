-- Remove a tabela 'heroes' se ela já existir
DROP TABLE IF EXISTS tb_heroes;

-- Criar a tabela 'heroes'
CREATE TABLE tb_heroes (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOTNULL,
    name TEXT NOTNULL,
    power TEXT NOTNULL
);

-- Inserindo registros na tabela 'heroes' - create
INSERT INTO tb_heroes (name, power) VALUES ('Batman', 'Dinheiro'), ('Flash', 'Velocidade'), ('Aquaman', 'Falar com os peixes');

-- Recuperando registros da tabela 'heroes' - read
SELECT * FROM tb_heroes;

-- Atualizar registros da tabela 'heroes' - update
UPDATE tb_heroes SET name = 'Goku', power = 'Ki' WHERE id = 1;

-- Remover registro da tabela 'heroes' - delete
DELETE FROM tb_heroes;