## Regras de Formatação
- Não deixar linhas em branco extras no código.
- Não usar mais de **uma linha em branco** consecutiva.
- Linhas em branco só devem ser usadas para separar blocos lógicos de código (ex: entre métodos de uma classe).

❌ Errado:
export class GeniusComponent implements OnInit {
  private acertos = 0;

  
  @ViewChild('botaoIniciar') botaoIniciar!: ElementRef;
}

✅ Correto:
export class GeniusComponent implements OnInit {
  private acertos = 0;

  @ViewChild('botaoIniciar') botaoIniciar!: ElementRef;
}
