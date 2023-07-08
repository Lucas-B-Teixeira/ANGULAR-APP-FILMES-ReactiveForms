import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs'

import { filme } from 'src/app/core/models/filme.model';
import { FilmesService } from 'src/app/core/services/filmes.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.component.html',
  styleUrls: ['./watched.component.scss']
})
export class WatchedComponent implements OnInit{

  watched: filme[] = [];

  watchedSubscription: Subscription[] = []

  constructor(private service: FilmesService){}

  ngOnInit(): void {
    this.getWatched();
  }

  getWatched(): void{
    this.watchedSubscription.push(this.service.getAll().subscribe({
      next: (f) => {
        f.forEach(i => {
          if(i.watched == true){
            this.watched.push(i);
            this.watched.sort((a,b) => b.avaliationPersonal - a.avaliationPersonal)
          }
        })
      },
      error: (e) => {
        swal({
          text: e.status + ' ' + e.statusText + ', Não foi poivel encontrar seu filmes assistidos!',
          icon: 'error'
        })
      }
    }
    ))
  }

  addFavortites(filme: filme){
    if(filme.favorites == false){
      swal({
        title: 'Adicionar aos Favoritos!',
        icon: 'info',
        text: 'Deseja adicionar o filme ' + filme.title + ' ao seus filmes Favoritos?',
        buttons: ["Cancelar", "Adicionar"]
      }).then(r => {
        if(r == true){
          filme.favorites = !filme.favorites;
          this.watchedSubscription.push(this.service.update(filme, filme.id).subscribe(
            {
              next: () => {
                if(filme.favorites == true){
                  swal({
                    text: 'O filme ' + filme.title + ", foi ADICIONADO ao seus filmes Favoritos",
                    icon: 'success'
                  })
                }
              },
              error: (e) => {
                swal({
                  text: e.status + ' ' + e.statusText + ',  Não foi possivel Adicionar o filme  ' + filme.title + ", no seus filmes Favoritos",
                  icon: 'error'
                })
              }
            }) 
          )}
        })    
    }
    else{
      swal({
        title: 'Remover aos Favoritos!',
        icon: 'info',
        text: 'Deseja REMOVER o filme ' + filme.title + ', do seus filmes Favoritos',
        buttons: ["Cancelar", "Remover"]
      }).then(r => {
        if(r == true){
          filme.favorites = !filme.favorites;
          this.watchedSubscription.push(this.service.update(filme, filme.id).subscribe({
              next: () => {
                if(filme.favorites == false){
                  swal({
                    text: 'O filme ' + filme.title + ", foi REMOVIDO ao seus filmes Favoritos",
                    icon: 'success'
                  })
                }
              },
              error: (e) => {
                swal({
                  text: e.status + ' ' + e.statusText + ', Não foi possivel Remover o filme  ' + filme.title + ", do seus filmes Favoritos",
                  icon: 'error'
                  })
                }
              }
            ))
          }
        })
      }
  }

  del(filme: filme, i: number){
    swal({
      title: 'Remover dos assistidos',
      text: 'Deseja remover o filme ' + filme.title + ' do seus filmes assistidos?',
      icon: 'info',
      buttons: ['Cancelar', 'Remover']
    }).then(r => {
      if(r == true){
        filme.watched = !filme.watched;
        this.watchedSubscription.push(this.service.update(filme, filme.id).subscribe({
          next: () => {
            this.watched.splice(i, 1);
            swal({
              text: 'O filme ' + filme.title + ", foi removido do seus filmes assistidos",
              icon: 'success'
            })
          },
          error: (e) => {
            swal({
              text: e.status + ' ' + e.statusText + ', Não foi possivel remover o filme  ' + filme.title + ', do seus filmes assistidos',
              icon: 'error'
            })
          }
        }
      ))
      }
    })
  }

  avaliation(filme: filme, stars: number, i: number): void{
    filme.avaliationPersonal = stars;

    this.watched[i].avaliationPersonal = stars;

    this.watchedSubscription.push(this.service.update(filme, filme.id).subscribe({
        next: () => {
          swal({
            text: 'Sua avaliação pessoal para o filme,  ' + filme.title + ", foi aceita",
            icon: 'success'
          })
          this.watched.sort((a,b) => b.avaliationPersonal - a.avaliationPersonal)
        },
        error: (e) => {
          swal({
            text: e.status + ' ' + e.statusText + ', Não foi possivel avaliar o filme  ' + filme.title,
            icon: 'error'
          })
        }
      }
    ))
  }

  ngOnDestroy():void{
    this.watchedSubscription.forEach(s => s.unsubscribe())
  }

}
