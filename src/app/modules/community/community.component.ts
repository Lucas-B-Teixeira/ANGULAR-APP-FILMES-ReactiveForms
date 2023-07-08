import { Component, OnInit } from '@angular/core';
import{ Subscription } from 'rxjs';

import { filme } from 'src/app/core/models/filme.model';
import { FilmesService } from 'src/app/core/services/filmes.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss']
})
export class CommunityComponent implements OnInit{

  filmesSubscription: Subscription[] = [];

  filmes: filme[] = [];

  confirmation: boolean = false

  constructor(private service: FilmesService){}

  ngOnInit(): void {
    this.getFilmes()
  }

  getFilmes(){
    this.filmesSubscription.push(this.service.getAll().subscribe({
          next: (f) => {
            this.filmes = f;
            this.filmes.sort((a, b) => {return b.avaliationCommunity - a.avaliationCommunity})
          },
          error: (e) => {
            swal({
              text: e.status + ' ' + e.statusText + ', Não foi possivel consultar todos os filmes da base de dados!',
              icon: 'error'
            })
          }
        }
      )
    )
  }

  del(filme: filme, i: number): void{
    swal({
      title: 'Deletar',
      text: 'Deseja realmente excluir o filme ' + filme.title + '?',
      icon: 'info',
      buttons: ['Cancelar', 'Deletar']
    }).then( r => {
      if( r == true){
        this.filmesSubscription.push(this.service.delete(filme.id).subscribe({
          next: () => {
            this.filmes.splice(i, 1)
            swal({
              text: 'O filme ' + filme.title + 'foi excluído com sucesso!',
              icon: 'success' 
            })
          },
          error: (e) => {
            swal({
              text: e.status + ' ' + e.statusText + ', Não foi possivel excluir o filme ' + filme.title,
              icon: 'error' 
            })
          }
        })
      )}
    })
  }

  addFavortites(filme: filme, id: number): void{

    if(filme.favorites == false){
      swal({
        title: 'Adicionar aos Favoritos!',
        text: 'Deseja Adicionar o filme ' + filme.title + ' ao seus filmes favoritos?',
        icon: 'info',
        buttons: ["Cancelar", "Adicionar"]
      }).then( r => {
        if(r == true){
          filme.favorites = !filme.favorites;
          this.filmesSubscription.push(this.service.update(filme, id).subscribe({
              next: () => {
                if(filme.favorites == true){
                  swal({
                    text: 'O filme ' + filme.title + ", foi adicionado ao seus filmes favoritos",
                    icon: 'success'
                  })
                }
              },
              error: (e) => {
                swal({
                  text: e.status + ' ' + e.statusText + ', Não foi possivel Adicionar o filme  ' + filme.title + ", no seus filmes favoritos",
                  icon: 'error'
                })
              }
            }
          ))
        }
      })
    }
    else{
      swal({
        title: 'Remover dos Favoritos!',
        text: 'Deseja Remover o filme ' + filme.title + ' do seus filmes favoritos?',
        icon: 'info',
        buttons: ["Cancelar", "Remover"]
      }).then( r => {
        if(r == true){
          filme.favorites = !filme.favorites;
          this.filmesSubscription.push(this.service.update(filme, id).subscribe({
              next: () => {
                if(filme.favorites == false){
                  swal({
                    text: 'O filme ' + filme.title + ", foi removido ao seus filmes favoritos",
                    icon: 'success'
                  })
                }
              },
              error: (e) => {
                  swal({
                    text: e.status + ' ' + e.statusText + ', Não foi possivel Remover o filme  ' + filme.title + ", do seus filmes favoritos",
                    icon: 'error'
                  })
              }
            }
          ))
        }
      })
    }

  }

  addWatched(filme: filme, id:number):void{

    if(filme.watched == false){
      swal({
        title: 'Adicionar aos Assistidos!',
        icon: 'info',
        text: 'Deseja adicionar o filme ' + filme.title + ' ao seus filmes assistidos?',
        buttons: ["Cancelar", "Adicionar"]
      }).then(r => {
        if(r == true){
          filme.watched = !filme.watched;
          this.filmesSubscription.push(this.service.update(filme, id).subscribe(
            {
              next: () => {
                if(filme.watched == true){
                  swal({
                    text: 'O filme ' + filme.title + ", foi ADICIONADO ao seus filmes assistidos",
                    icon: 'success'
                  })
                }
              },
              error: (e) => {
                swal({
                  text: e.status + ' ' + e.statusText + ',  Não foi possivel Adicionar o filme  ' + filme.title + ", no seus filmes assistidos",
                  icon: 'error'
                })
              }
            }) 
          )}
        })    
    }
    else{
      swal({
        title: 'Remover aos Assistidos!',
        icon: 'info',
        text: 'Deseja REMOVER o filme ' + filme.title + ', do seus filmes assistidos',
        buttons: ["Cancelar", "Remover"]
      }).then(r => {
        if(r == true){
          filme.watched = !filme.watched;
          this.filmesSubscription.push(this.service.update(filme, id).subscribe({
              next: () => {
                if(filme.watched == false){
                  swal({
                    text: 'O filme ' + filme.title + ", foi REMOVIDO ao seus filmes assistidos",
                    icon: 'success'
                  })
                }
              },
              error: (e) => {
                swal({
                  text: e.status + ' ' + e.statusText + ', Não foi possivel Remover o filme  ' + filme.title + ", do seus filmes assistidos",
                  icon: 'error'
                })
              }
            }
          ))
        }
      })
    }
  }

  edit(filme: filme, id: number){
    filme.enableEdit = !filme.enableEdit;
    if(filme.enableEdit == false){
      swal({
        title: 'Editar o filme ' + filme.title + '!',
        text: 'Deseja salvar as alterações feita no filme ' + filme.title,
        icon: 'info',
        buttons: ['Cancelar', 'Salvar']
      }).then( r => {
        if(r == true){
          this.filmesSubscription.push(this.service.update(filme, id).subscribe({
              next: () => {
                swal({
                  text: 'O filme ' + filme.title + ', foi alterado com sucesso',
                  icon: 'success'
                })
              },
              error: (e) => {
                swal({
                  text: e.status + ' ' + e.statusText + ', Não foi possivel alterar o filme ' + filme.title,
                  icon: 'error'
                })
              }
            })
          )
        }
      })
    }
  }

  
  ngOnDestroy():void{
    this.filmesSubscription.forEach(s => s.unsubscribe())
  }
}
