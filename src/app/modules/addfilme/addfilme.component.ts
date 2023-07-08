import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

import { FilmesService } from 'src/app/core/services/filmes.service';
import { filme } from 'src/app/core/models/filme.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-addfilme',
  templateUrl: './addfilme.component.html',
  styleUrls: ['./addfilme.component.scss']
})
export class AddfilmeComponent implements OnInit{

  addfilmeSubscription: Subscription [] = []

  urlImage!: String;

  form!: FormGroup;

  postFilme!: filme;

  constructor(private service: FilmesService, private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.newForm();
  }

  adicImage(): void{
    let image = <HTMLInputElement> document.querySelector(".box__add__form__img__input");
    this.urlImage = image.value;
  }

  newForm(): void{
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      sinopse: ['', [Validators.required, Validators.minLength(30), Validators.maxLength(265)]],
      duration: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
      genre: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      saga: [undefined, [Validators.required]],
      date: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]],
      avaliationCommunity: [undefined, [Validators.required]],
      urlImage: ['', [Validators.required]]
    })
  }

  sendFilme(): void{

    if(this.form.status === "VALID"){
      this.postFilme =  {
        id: Math.floor(Date.now() * Math.random()),
        community: true,
        favorites: false,
        watched: false,
        title: String(this.form.get('title')?.value),
        sinopse: String(this.form.get('sinopse')?.value),
        duration: String(this.form.get('duration')?.value),
        genre: String(this.form.get('genre')?.value),
        saga: Boolean(this.form.get('saga')?.value),
        date: String(this.form.get('date')?.value),
        avaliationCommunity: Number(this.form.get('avaliationCommunity')?.value),
        avaliationPersonal: 0,
        urlImage: String(this.form.get('urlImage')?.value),
        enableEdit: false
      }
  
      this.addfilmeSubscription.push(this.service.add(this.postFilme).subscribe({
          next: () => {
            swal({
              text: 'O filme ' + this.postFilme.title + ' foi adicionado com sucesso!',
              icon: 'success'
            })
          },
          error: (e) => {
            swal({
              text: e.status + ' ' + e.statusText + ', Ocorreu um erro ao adicionar o filme ' + this.postFilme.title,
              icon: 'error'
            })
          }
        }
      ))
  
      this.form.reset()
    }
    else{
      swal({
        text: 'O formulário não é valido, por favor, insira as informações corretamente!',
        icon: 'error'
      })
    }
  
  }

  get title(){
    return this.form.get('title')
  }

  get sinopse(){
    return this.form.get('sinopse')
  }

  get duration(){
    return this.form.get('duration')
  }

  get genre(){
    return this.form.get('genre')
  }

  get saga(){
    return this.form.get('saga')
  }

  get date(){
    return this.form.get('date')
  }

  get avaliationCommunity(){
    return this.form.get('avaliationCommunity')
  }

  get url(){
    return this.form.get('urlImage')
  }

  ngOnDestroy():void{
    this.addfilmeSubscription.forEach(s => s.unsubscribe())
  }

}
