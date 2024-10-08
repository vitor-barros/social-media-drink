export default class Drink {

    constructor(nomeDrink, descricao, tipo) {
      this.setNomeDrink(nomeDrink);
      this.setDescricao(descricao);
      this.setTipo(tipo);
    }
  
    getNomeDrink() {
      return this.nomeDrink;
    }
  
    setNomeDrink(nomeDrink) {
      if (!Drink.validarNomeDrink(nomeDrink))
        throw new Error("Nome do Drink Inválido: " + nomeDrink);
      this.nomeDrink = nomeDrink;
    }
  
    getDescricao() {
      return this.descricao;
    }
  
    setDescricao(descricao) {
      if (!Drink.validarDescricao(descricao))
        throw new Error("Descrição Inválida: " + descricao);
      this.descricao = descricao;
    }
  
    getTipo() {
      return this.tipo;
    }
  
    setTipo(tipo) {
      if (!Drink.validarTipo(tipo))
        throw new Error("Tipo de Drink Inválido: " + tipo);
      this.tipo = tipo;
    }
  
    static validarNomeDrink(nomeDrink) {
      return nomeDrink && nomeDrink.trim() !== "";
    }
  
    static validarDescricao(descricao) {
      return descricao && descricao.trim() !== "";
    }
  
    static validarTipo(tipo) {
      return tipo && tipo.trim() !== "";
    }
  }
  