class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savanna', tamanhoTotal: 10, animais: { MACACO: 3 } },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: {} },
            { numero: 3, bioma: 'savanna e rio', tamanhoTotal: 7, animais: { GAZELA: 1 } },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: {} },
            { numero: 5, bioma: 'savanna', tamanhoTotal: 9, animais: { LEAO: 1 } }
        ];
        this.animais = {
            LEAO: { tamanho: 3, bioma: 'savanna' },
            LEOPARDO: { tamanho: 2, bioma: 'savanna' },
            CROCODILO: { tamanho: 3, bioma: 'rio' },
            MACACO: { tamanho: 1, bioma: ['savanna', 'floresta'] },
            GAZELA: { tamanho: 2, bioma: 'savanna' },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savanna', 'rio'] }
        };
    }

    analisaRecintos(tipoAnimal, quantidade) {
        // Verificar se o tipo de animal é válido
        if (!this.animais[tipoAnimal]) {
            return { erro: 'Animal inválido', recintosViaveis: null };
        }

        // Verificar se a quantidade é válida
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: 'Quantidade inválida', recintosViaveis: null };
        }

        // Encontrar recintos viáveis
        const recintosViaveis = this.recintos.filter(recinto => 
            this.isRecintoViavel(recinto, tipoAnimal, quantidade)
        );

        // Se não houver recintos viáveis
        if (recintosViaveis.length === 0) {
            return { erro: 'Não há recinto viável', recintosViaveis: null };
        }

        // Ordenar recintos por número
        recintosViaveis.sort((a, b) => a.numero - b.numero);

        // Formatando a saída
        return {
            recintosViaveis: recintosViaveis.map(recinto => 
                `Recinto ${recinto.numero} (espaço livre: ${this.calcularEspacoLivre(recinto, tipoAnimal, quantidade)} total: ${recinto.tamanhoTotal})`
            )
        };
    }

    isRecintoViavel(recinto, tipoAnimal, quantidade) {
        const animal = this.animais[tipoAnimal];
        if (!animal) return false;

        // Verificar se o bioma é adequado
        if (Array.isArray(animal.bioma)) {
            if (!animal.bioma.includes(recinto.bioma) && !recinto.bioma.includes(animal.bioma)) {
                return false;
            }
        } else if (animal.bioma !== recinto.bioma && !recinto.bioma.includes(animal.bioma)) {
            return false;
        }

        // Calcular espaço ocupado
        const espacoOcupado = this.calcularEspacoOcupado(recinto);
        const espacoNecessario = quantidade * animal.tamanho + (this.countSpeciesInRecinto(recinto) > 0 ? 1 : 0);
        const espacoLivre = recinto.tamanhoTotal - espacoOcupado;

        return espacoLivre >= espacoNecessario;
    }

    calcularEspacoLivre(recinto, tipoAnimal, quantidade) {
        const espacoOcupado = this.calcularEspacoOcupado(recinto);
        const animal = this.animais[tipoAnimal];
        const espacoNecessario = quantidade * animal.tamanho + (this.countSpeciesInRecinto(recinto) > 0 ? 1 : 0);
        return recinto.tamanhoTotal - (espacoOcupado + espacoNecessario);
    }

    calcularEspacoOcupado(recinto) {
        return Object.entries(recinto.animais).reduce((acc, [animal, qtd]) => {
            const animalData = this.animais[animal];
            if (animalData) {
                return acc + (qtd * animalData.tamanho);
            }
            return acc;
        }, 0);
    }

    countSpeciesInRecinto(recinto) {
        return Object.keys(recinto.animais).length;
    }
}

export { RecintosZoo };
