import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BOTOES } from '../../consts/botoes.const';

@Component({
  selector: 'app-genius',
  templateUrl: './genius.component.html',
  styleUrls: ['./genius.component.css'],
  standalone: false
})
export class GeniusComponent implements OnInit {
  public jogadasDaMaquina: number[] = [];
  public jogadosDoUsuario: number[] = [];
  public bloqueaBotao = true;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  private botaoAcionado: HTMLElement | undefined;
  private acertos = 0;

  @ViewChild('botaoIniciar', { static: false }) botaoIniciar!: ElementRef;
  @ViewChild('genius', { static: false }) genius!: ElementRef;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  abrirAlerta(): void {
    this._snackBar.open('Cannonball!!', 'Splash', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  iniciar(): void {
    this.mudarTextoBotao('Aguarde...');
    this.desabilitarBotaoIniciar();
    this.iniciarContagem();
  }

  exibirMensagemVezUsuario(): void {
    this.mudarTextoBotao('Sua vez!');
  }

  iniciarContagem(): void {
    let contagemParaIniciarOJogo = 4;
    const timer = setInterval(() => {
      contagemParaIniciarOJogo--;
      this.verificarParadaDeContagem(contagemParaIniciarOJogo, timer);
    }, 1000);
  }

  mudarTextoBotao(texto: string): void {
    this.botaoIniciar.nativeElement.children[1].innerText = texto;
  }

  verificarParadaDeContagem(contagemParaIniciarOJogo: number, timer: any): void {
    if (contagemParaIniciarOJogo === 0) {
      this.mudarTextoBotao('Valendo!');
      this.maquinaRealizarUmaJogada();
      clearInterval(timer);
    } else {
      this.mudarTextoBotao(`Aguarde... ${contagemParaIniciarOJogo}`);
    }
  }

  maquinaRealizarUmaJogada(): void {
    setTimeout(() => {
      this.mudarTextoBotao('');
      this.adicionarJogadaParaMaquina();
    }, 600);

    setTimeout(() => {
      this.desbloquearBotao();
      this.exibirMensagemVezUsuario();
    }, 1600);
  }

  adicionarJogadaParaMaquina(): void {
    const valorAleatorio = Math.floor(Math.random() * 4 + 1);
    this.jogadasDaMaquina.push(valorAleatorio);
    if (this.jogadasDaMaquina.length === 1) {
      this.acionarLegenda(valorAleatorio);
    }
    this.limparJogadasUsuario();
  }

  limparJogadasUsuario(): void {
    this.jogadosDoUsuario = [];
  }

  adicionarJogadaParaUsuario(event: MouseEvent): void {
    const cor = (event.target as HTMLElement).id;
    this.alterarCorBorda(cor);
    this.limparBorda();
    this.jogadosDoUsuario.push(BOTOES.find(a => a.color === cor)!.id);
    this.verificarSeJogadorPerdeu();
    this.jogarAutomatico();
    this.acrescentarAcertos(cor);
  }

  private acrescentarAcertos(cor: string): void {
    const idBotaoSelecionado = BOTOES.find(x => x.color === cor)!.id;
    const idUltimaJogadaDaMaquina = this.jogadasDaMaquina[this.jogadasDaMaquina.length - 1];

    if (idBotaoSelecionado === idUltimaJogadaDaMaquina) {
      this.acertos++;
    }
  }

  verificarSeJogadorPerdeu(): void {
    for (let i = 0; i < this.jogadosDoUsuario.length; i++) {
      if (this.jogadosDoUsuario[i] !== this.jogadasDaMaquina[i]) {
        alert(`Você perdeu! Você teve ${this.acertos} acertos.`);
        window.location.reload();
      }
    }
  }

  limparBorda(): void {
    setTimeout(() => {
      this.alterarCorBorda('black');
    }, 280);
  }

  bloquearBotao(): void {
    this.bloqueaBotao = true;
  }

  jogarAutomatico(): void {
    if (this.jogadosDoUsuario.length === this.jogadasDaMaquina.length) {
      this.bloquearBotao();
      setTimeout(() => {
        this.adicionarJogadaParaMaquina();
        this.percorrerTodasAsSequenciasRegistradas();
      }, 300);
    }
  }

  alterarCorBorda(cor: string): void {
    this.genius.nativeElement.style.borderColor = cor;
  }

  percorrerTodasAsSequenciasRegistradas(): void {
    let quantidadePercorrida = 0;
    const percorrer = setInterval(() => {
      if (quantidadePercorrida > this.jogadasDaMaquina.length - 1) {
        this.desbloquearBotao();
        this.exibirMensagemVezUsuario();
        clearInterval(percorrer);
      } else {
        this.acionarLegenda(this.jogadasDaMaquina[quantidadePercorrida]);
        quantidadePercorrida++;
      }
    }, 1000);
  }

  desbloquearBotao(): void {
    this.bloqueaBotao = false;
  }

  acionarLegenda(valorAleatorio: number): void {
    const botao = BOTOES.find(a => a.id === valorAleatorio)!;
    this.mudarTextoBotao(botao.traducao);
    this.alterarCorBorda(botao.color);
    this.habilitarBotao(botao.color);

    setTimeout(() => {
      this.mudarTextoBotao('');
      this.alterarCorBorda('black');
      this.desabilitar(botao.color);
    }, 500);
  }

  private habilitarBotao(id: string): void {
    let arr = Array.prototype.slice.call(this.genius.nativeElement.children);
    const element = arr.find(x => x.id === id);
    this.botaoAcionado = element as HTMLElement;
    this.botaoAcionado.classList.remove(`${id}-disabled`);
    this.botaoAcionado.classList.add(id);
  }

  private desabilitar(id: string): void {
    this.botaoAcionado?.classList.remove(id);
    this.botaoAcionado?.classList.add(`${id}-disabled`);
  }

  desabilitarBotaoIniciar(): void {
    this.botaoIniciar.nativeElement.children[0].setAttribute('class', 'disabled');
  }
}
